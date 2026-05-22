import type {
  ClinicRatingQuestion,
  RatingValue,
} from "@/lib/clinic-types";

type Props = {
  question: ClinicRatingQuestion;
  value: RatingValue | undefined;
  onChange: (value: RatingValue) => void;
};

const isRecommendationQuestion = (id: string) => id === "recommend";

const SATISFACTION_CHOICES: { value: RatingValue; label: string }[] = [
  { value: "very_satisfied", label: "とても満足" },
  { value: "satisfied", label: "満足" },
  { value: "neutral", label: "どちらともいえない" },
  { value: "dissatisfied", label: "不満" },
  { value: "very_dissatisfied", label: "とても不満" },
];

const RECOMMEND_CHOICES: { value: RatingValue; label: string }[] = [
  { value: "very_satisfied", label: "とても薦めたい" },
  { value: "satisfied", label: "薦めたい" },
  { value: "neutral", label: "どちらともいえない" },
  { value: "dissatisfied", label: "あまり薦めたくない" },
  { value: "very_dissatisfied", label: "薦めたくない" },
];

export default function RatingQuestion({ question, value, onChange }: Props) {
  const choices = isRecommendationQuestion(question.id)
    ? RECOMMEND_CHOICES
    : SATISFACTION_CHOICES;
  const groupName = `rating-${question.id}`;

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      role="group"
      aria-labelledby={`${groupName}-label`}
    >
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h2
          id={`${groupName}-label`}
          className="text-sm font-semibold text-gray-700 leading-snug"
        >
          {question.label}
        </h2>
      </div>
      <ul className="divide-y divide-gray-100">
        {choices.map((choice) => {
          const inputId = `${groupName}-${choice.value}`;
          const isChecked = value === choice.value;
          return (
            <li key={choice.value}>
              <label
                htmlFor={inputId}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none active:bg-gray-50 min-h-[44px]"
              >
                <input
                  id={inputId}
                  type="radio"
                  name={groupName}
                  value={choice.value}
                  checked={isChecked}
                  onChange={() => onChange(choice.value)}
                  className="w-5 h-5 border-gray-300 accent-[#2F6B5F] flex-shrink-0"
                />
                <span className="text-sm text-gray-700 leading-snug">
                  {choice.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
