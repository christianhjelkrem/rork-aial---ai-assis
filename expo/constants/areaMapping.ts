export interface Area {
  key: string;
  label: string;
}

export const AREAS: Area[] = [
  { key: "alesund", label: "Ålesund" },
  { key: "sula", label: "Sula" },
  { key: "giske", label: "Giske" },
  { key: "orskog", label: "Ørskog/Skodje" },
  { key: "haram", label: "Haram" },
];

const AREA_KEYWORDS: Record<string, string[]> = {
  alesund: [
    "ålesund",
    "alesund",
    "aalesund",
    "sentrum",
    "nørvøy",
    "aspøy",
    "hessa",
    "borgund",
    "spjelkavik",
    "lerstad",
    "blindheim",
    "emblem",
    "flisnes",
    "moa",
    "volsdalen",
    "nørvasund",
    "colorline",
    "color line",
    "jugendstilsenteret",
    "arbeideren",
    "parken",
    "kulturhuset",
    "kul†urhuset",
    "sukkerbiten",
    "brosundet",
    "molja",
    "aafk",
    "aksla",
    "tueneset",
    "skarbøvik",
    "ellingsøy",
    "ålesund bibliotek",
    "ålesund kirke",
    "ålesund kulturhus",
    "kammersalen",
  ],
  sula: [
    "sula",
    "langevåg",
    "fiskarstrand",
  ],
  giske: [
    "giske",
    "vigra",
    "valderøy",
    "alnes",
    "godøy",
  ],
  orskog: [
    "ørskog",
    "skodje",
    "sjøholt",
    "sjoholt",
    "tomrefjord",
    "stette",
    "idahall",
    "fagerheim",
  ],
  haram: [
    "haram",
    "harøy",
    "fjørtoft",
    "fjørtofta",
    "brattvåg",
    "vatne",
    "tennfjord",
    "søvik",
    "austnes",
    "longva",
    "haramsbiblioteka",
    "steinshamn",
  ],
};

export function getEventArea(locationName: string | null | undefined): string {
  if (!locationName) return "unknown";

  const lower = locationName.toLowerCase();

  for (const [areaKey, keywords] of Object.entries(AREA_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        return areaKey;
      }
    }
  }

  return "unknown";
}
