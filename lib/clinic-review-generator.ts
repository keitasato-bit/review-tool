import type { ClinicSurveyData, RatingValue } from "./clinic-types";

type GenerateClinicReviewArgs = {
  clinic: ClinicSurveyData;
  ratings: Record<string, RatingValue>;
  freeText: string;
};

const FORBIDDEN_PHRASES = [
  "完治",
  "必ず",
  "絶対",
  "確実に",
  "100%",
  "１００％",
  "間違いなく",
];

const SENTENCE_ENDINGS = ["。", "！", "？", "!", "?", "．", "."];

function cleanWhitespace(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/　/g, " ")
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line, idx, arr) =>
        !(line === "" && (idx === 0 || arr[idx - 1] === ""))
    )
    .join("\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function normalizeSentenceBreaks(text: string): string {
  const lines = text.split("\n");
  return lines
    .map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.length === 0) return "";
      if (idx === lines.length - 1) return trimmed;
      const last = trimmed.slice(-1);
      return SENTENCE_ENDINGS.includes(last) ? trimmed : trimmed + "。";
    })
    .filter((line) => line.length > 0)
    .join("");
}

function stripForbiddenPhrases(text: string): string {
  let result = text;
  for (const phrase of FORBIDDEN_PHRASES) {
    if (result.includes(phrase)) {
      result = result.split(phrase).join("");
    }
  }
  return result;
}

function ensureSentenceEnd(text: string): string {
  if (!text) return text;
  const trimmed = text.replace(/\s+$/, "");
  const last = trimmed.slice(-1);
  if (SENTENCE_ENDINGS.includes(last)) return trimmed;
  return trimmed + "。";
}

function countByRating(
  ratings: Record<string, RatingValue>
): {
  veryPositive: number;
  positive: number;
  negative: number;
  total: number;
} {
  let veryPositive = 0;
  let positive = 0;
  let negative = 0;
  let total = 0;
  for (const value of Object.values(ratings)) {
    if (!value) continue;
    total += 1;
    if (value === "very_satisfied") veryPositive += 1;
    else if (value === "satisfied") positive += 1;
    else if (value === "dissatisfied" || value === "very_dissatisfied")
      negative += 1;
  }
  return { veryPositive, positive, negative, total };
}

function buildIntro(ratings: Record<string, RatingValue>): string {
  const { veryPositive, positive, negative, total } = countByRating(ratings);
  if (total === 0) return "";
  const positiveTotal = veryPositive + positive;

  if (negative === 0 && positiveTotal >= 5) {
    return "丁寧に対応していただきました。";
  }
  if (negative === 0 && positiveTotal >= 3) {
    return "気持ちよく利用させていただきました。";
  }
  return "";
}

export function generateClinicReview({
  clinic: _clinic,
  ratings,
  freeText,
}: GenerateClinicReviewArgs): string {
  void _clinic;

  let body = cleanWhitespace(freeText ?? "");
  body = stripForbiddenPhrases(body);
  body = cleanWhitespace(body);
  body = normalizeSentenceBreaks(body);

  if (body.length > 0) {
    body = ensureSentenceEnd(body);
  }

  const intro = buildIntro(ratings);

  if (body.length === 0) {
    return intro || "丁寧に対応していただきました。";
  }

  if (intro && !body.startsWith(intro)) {
    return intro + body;
  }

  return body;
}
