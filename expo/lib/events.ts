import { supabase } from "./supabase";
import { EventData } from "@/types/event";

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\/\//g, " ")
    .replace(/[^a-zæøå0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function fuzzyTitleMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;
  const wordsA = a.split(" ").filter(w => w.length > 2);
  const wordsB = b.split(" ").filter(w => w.length > 2);
  if (wordsA.length === 0 || wordsB.length === 0) return false;
  const common = wordsA.filter(w => wordsB.includes(w));
  const ratio = common.length / Math.max(wordsA.length, wordsB.length);
  return ratio >= 0.7;
}

function getDateKey(dateStr: string | null): string {
  if (!dateStr) return "no-date";
  return dateStr.substring(0, 10);
}

function hasRealTime(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return !(d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0);
}

function mergeDuplicate(existing: EventData, incoming: EventData): EventData {
  const merged = { ...existing };

  if (!merged.image_url && incoming.image_url) {
    merged.image_url = incoming.image_url;
  }

  if (!hasRealTime(merged.start_at) && hasRealTime(incoming.start_at)) {
    merged.start_at = incoming.start_at;
  }
  if (!hasRealTime(merged.end_at) && hasRealTime(incoming.end_at)) {
    merged.end_at = incoming.end_at;
  }

  if (!merged.description && incoming.description) {
    merged.description = incoming.description;
  } else if (incoming.description && merged.description && incoming.description.length > merged.description.length) {
    merged.description = incoming.description;
  }

  if (!merged.location_name && incoming.location_name) {
    merged.location_name = incoming.location_name;
  }
  if (!merged.address && incoming.address) {
    merged.address = incoming.address;
  }
  if (!merged.url && incoming.url) {
    merged.url = incoming.url;
  }
  if (!merged.price_text && incoming.price_text) {
    merged.price_text = incoming.price_text;
  }
  if (merged.is_free === null && incoming.is_free !== null) {
    merged.is_free = incoming.is_free;
  }
  if (!merged.organizer && incoming.organizer) {
    merged.organizer = incoming.organizer;
  }
  if (merged.latitude === null && incoming.latitude !== null) {
    merged.latitude = incoming.latitude;
    merged.longitude = incoming.longitude;
  }
  if ((!merged.tags || merged.tags.length === 0) && incoming.tags?.length > 0) {
    merged.tags = incoming.tags;
  } else if (merged.tags && incoming.tags) {
    const tagSet = new Set([...merged.tags, ...incoming.tags]);
    merged.tags = [...tagSet];
  }

  return merged;
}

function areDatesClose(a: string | null, b: string | null): boolean {
  if (!a || !b) return !a && !b;
  const dA = new Date(a).getTime();
  const dB = new Date(b).getTime();
  const diffHours = Math.abs(dA - dB) / (1000 * 60 * 60);
  return diffHours < 24;
}

function deduplicateEvents(events: EventData[]): EventData[] {
  const exactSeen = new Map<string, EventData>();

  for (const event of events) {
    const normTitle = normalizeTitle(event.title);
    const dateKey = getDateKey(event.start_at);
    const dedupeKey = `${normTitle}__${dateKey}`;

    const existing = exactSeen.get(dedupeKey);
    if (!existing) {
      exactSeen.set(dedupeKey, event);
    } else {
      exactSeen.set(dedupeKey, mergeDuplicate(existing, event));
    }
  }

  const afterExact = [...exactSeen.values()];
  console.log(`[events][dedup] Exact pass: ${events.length} -> ${afterExact.length} (removed ${events.length - afterExact.length})`);

  const result: EventData[] = [];
  const used = new Set<number>();

  for (let i = 0; i < afterExact.length; i++) {
    if (used.has(i)) continue;
    let merged = afterExact[i];
    const normA = normalizeTitle(merged.title);

    for (let j = i + 1; j < afterExact.length; j++) {
      if (used.has(j)) continue;
      const other = afterExact[j];
      const normB = normalizeTitle(other.title);

      if (fuzzyTitleMatch(normA, normB) && areDatesClose(merged.start_at, other.start_at)) {
        console.log(`[events][dedup] Fuzzy match: "${merged.title}" <-> "${other.title}"`);
        merged = mergeDuplicate(merged, other);
        used.add(j);
      }
    }

    result.push(merged);
  }

  console.log(`[events][dedup] Fuzzy pass: ${afterExact.length} -> ${result.length} (removed ${afterExact.length - result.length})`);
  return result;
}

async function fetchEventsViaClient(): Promise<EventData[]> {
  if (!supabase) {
    console.error("[events] Supabase client not initialized");
    throw new Error("Supabase-konfigurasjon mangler");
  }

  console.log("[events] Fetching events via Supabase client...");

  const pageSize = 1000;
  let allData: EventData[] = [];
  let from = 0;
  let hasMore = true;

  while (hasMore) {
    const { data, error, status } = await supabase
      .from("events")
      .select("*")
      .order("start_at", { ascending: true, nullsFirst: false })
      .range(from, from + pageSize - 1);

    console.log(`[events] Page from=${from}, status=${status}, rows=${data?.length ?? 0}`);

    if (error) {
      console.error("[events] Client error:", JSON.stringify(error));
      throw new Error(error.message);
    }

    const rows = (data ?? []) as EventData[];
    allData = allData.concat(rows);

    if (rows.length < pageSize) {
      hasMore = false;
    } else {
      from += pageSize;
    }
  }

  console.log(`[events] Total fetched: ${allData.length}`);
  return allData;
}

export async function fetchEvents(): Promise<EventData[]> {
  console.log("[events] Starting fetchEvents...");
  console.log("[events] IAAL URL present:", !!process.env.EXPO_PUBLIC_IAAL_SUPABASE_URL);
  console.log("[events] IAAL Key present:", !!process.env.EXPO_PUBLIC_IAAL_SUPABASE_KEY);
  console.log("[events] System URL present:", !!process.env.EXPO_PUBLIC_SUPABASE_URL);
  console.log("[events] System Key present:", !!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

  let allData: EventData[] = [];

  try {
    allData = await fetchEventsViaClient();
  } catch (err) {
    console.error("[events] Fetch failed:", err);
    throw err;
  }

  console.log(`[events] Total rows from DB: ${allData.length}`);

  const sourceCounts: Record<string, number> = {};
  allData.forEach((e) => {
    const src = e.source || "(unknown)";
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;
  });
  console.log("[events] Sources in DB:", JSON.stringify(sourceCounts));

  if (allData.length === 0) {
    console.warn("[events] DATABASE RETURNED 0 ROWS. Possible causes: RLS blocking reads, empty table, or wrong table name.");
    return [];
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const upcoming = allData.filter((e) => {
    if (!e.start_at) return true;
    const startDate = new Date(e.start_at);
    if (startDate >= now) return true;
    if (e.end_at) {
      const endDate = new Date(e.end_at);
      return endDate >= now;
    }
    return false;
  });

  console.log(`[events] After date filter: ${upcoming.length} upcoming (of ${allData.length} total)`);

  const deduped = deduplicateEvents(upcoming);
  console.log(`[events] After deduplication: ${deduped.length} unique (removed ${upcoming.length - deduped.length} duplicates)`);
  return deduped;
}

export async function fetchAllTags(): Promise<string[]> {
  if (!supabase) {
    console.warn("[events] Supabase client not initialized, returning empty tags");
    return [];
  }

  console.log("[events] Fetching tags...");

  try {
    const pageSize = 1000;
    let allRows: { tags: string[] }[] = [];
    let from = 0;
    let hasMore = true;

    while (hasMore) {
      const { data, error } = await supabase
        .from("events")
        .select("tags")
        .range(from, from + pageSize - 1);

      if (error) {
        console.error("[events] Error fetching tags:", JSON.stringify(error));
        return [];
      }

      const rows = (data ?? []) as { tags: string[] }[];
      allRows = allRows.concat(rows);

      if (rows.length < pageSize) {
        hasMore = false;
      } else {
        from += pageSize;
      }
    }

    console.log(`[events] Tags query returned ${allRows.length} rows`);

    const allTags = allRows.flatMap((row) => row.tags ?? []);
    const unique = [...new Set(allTags)].sort();
    console.log(`[events] Found ${unique.length} unique tags:`, unique);
    return unique;
  } catch (err) {
    console.error("[events] Exception fetching tags:", err);
    return [];
  }
}
