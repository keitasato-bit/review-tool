import type { ReviewCategory } from "@/lib/types";

type Props = {
  category: ReviewCategory;
  selectedOptionIds: string[];
  onToggle: (optionId: string) => void;
};

export default function CategorySection({
  category,
  selectedOptionIds,
  onToggle,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-700">{category.label}</h2>
      </div>
      <ul className="divide-y divide-gray-100">
        {category.options.map((option) => {
          const isChecked = selectedOptionIds.includes(option.id);
          return (
            <li key={option.id}>
              <label
                htmlFor={option.id}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none active:bg-gray-50"
              >
                <input
                  id={option.id}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggle(option.id)}
                  className="w-5 h-5 rounded border-gray-300 accent-[#2F6B5F] flex-shrink-0"
                />
                <span className="text-sm text-gray-700 leading-snug">
                  {option.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
