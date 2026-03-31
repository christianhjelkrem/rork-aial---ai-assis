const MONTHS_NO: string[] = [
  "jan", "feb", "mar", "apr", "mai", "jun",
  "jul", "aug", "sep", "okt", "nov", "des",
];

const DAYS_NO: string[] = [
  "søndag", "mandag", "tirsdag", "onsdag",
  "torsdag", "fredag", "lørdag",
];

export function formatEventDate(dateStr: string | null): string {
  if (!dateStr) return "Dato ikke oppgitt";
  try {
    const d = new Date(dateStr);
    const day = DAYS_NO[d.getUTCDay()];
    const date = d.getUTCDate();
    const month = MONTHS_NO[d.getUTCMonth()];
    return `${day} ${date}. ${month}`;
  } catch {
    return "Dato ikke oppgitt";
  }
}

function isUtcMidnight(dateStr: string): boolean {
  const d = new Date(dateStr);
  return d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0;
}

export function formatEventTime(
  startStr: string | null,
  endStr: string | null
): string | null {
  if (!startStr) return null;
  try {
    if (isUtcMidnight(startStr)) return null;

    const start = new Date(startStr);
    const startTime = `${String(start.getUTCHours()).padStart(2, "0")}:${String(start.getUTCMinutes()).padStart(2, "0")}`;

    if (endStr && !isUtcMidnight(endStr)) {
      const end = new Date(endStr);
      const endTime = `${String(end.getUTCHours()).padStart(2, "0")}:${String(end.getUTCMinutes()).padStart(2, "0")}`;
      return `${startTime} – ${endTime}`;
    }

    return startTime;
  } catch {
    return null;
  }
}

export function formatFullDate(dateStr: string | null): string {
  if (!dateStr) return "Dato ikke oppgitt";
  try {
    const d = new Date(dateStr);
    const day = DAYS_NO[d.getUTCDay()];
    const date = d.getUTCDate();
    const month = MONTHS_NO[d.getUTCMonth()];
    const year = d.getUTCFullYear();
    return `${day.charAt(0).toUpperCase() + day.slice(1)} ${date}. ${month} ${year}`;
  } catch {
    return "Dato ikke oppgitt";
  }
}

export function getRelativeDateLabel(dateStr: string | null): string | null {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const eventDay = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    const diffDays = Math.floor((eventDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "I dag";
    if (diffDays === 1) return "I morgen";
    if (diffDays < 7) return DAYS_NO[d.getUTCDay()].charAt(0).toUpperCase() + DAYS_NO[d.getUTCDay()].slice(1);
    return null;
  } catch {
    return null;
  }
}
