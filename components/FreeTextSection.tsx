import type {
  ClinicSurveyData,
  RatingValue,
} from "@/lib/clinic-types";

type Props = {
  clinic: ClinicSurveyData;
  ratings: Record<string, RatingValue>;
  value: string;
  onChange: (value: string) => void;
};

function shortenLabel(label: string): string {
  return label.replace(/について$/, "").replace(/。$/, "").trim();
}

export default function FreeTextSection({
  clinic,
  ratings,
  value,
  onChange,
}: Props) {
  const positiveLabels = clinic.ratingQuestions
    .filter((q) => {
      const v = ratings[q.id];
      return v === "very_satisfied" || v === "satisfied";
    })
    .filter((q) => q.id !== "recommend")
    .map((q) => shortenLabel(q.label));

  const hintLabels = positiveLabels.slice(0, 3);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        <h2 className="text-sm font-semibold text-gray-700">
          {clinic.freeTextLabel}
        </h2>
        <span className="text-[10px] font-medium text-gray-500 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 flex-shrink-0">
          任意
        </span>
      </div>
      <div className="p-4 space-y-3">
        {hintLabels.length > 0 && (
          <p className="text-xs text-gray-600 bg-[#F3F7F5] border border-[#D7E7E1] rounded-lg px-3 py-2 leading-relaxed">
            {hintLabels.map((label) => `「${label}」`).join("")}
            に満足とご回答いただきました。よろしければ具体的なエピソードを教えてください。
          </p>
        )}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=""
          rows={5}
          className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#2F6B5F] focus:border-transparent placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
