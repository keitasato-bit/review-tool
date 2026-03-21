import { countCharacters } from "@/lib/utils";

type Props = {
  reviewText: string;
  reviewUrl: string;
  onCopy: () => void;
  copied: boolean;
};

export default function ReviewResult({
  reviewText,
  reviewUrl,
  onCopy,
  copied,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-700">生成された口コミ文</h2>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {reviewText}
          </p>
        </div>
        <p className="text-xs text-gray-400 text-right">
          {countCharacters(reviewText)} 文字
        </p>
        <button
          type="button"
          onClick={onCopy}
          className="w-full py-3 px-4 rounded-xl text-sm font-medium border-2 transition-colors"
          style={{
            borderColor: "#2F6B5F",
            color: copied ? "#ffffff" : "#2F6B5F",
            backgroundColor: copied ? "#2F6B5F" : "#ffffff",
          }}
        >
          {copied ? "コピーしました ✓" : "口コミ文をコピーする"}
        </button>
        <a
          href={reviewUrl}
          target="_blank"
          rel="noreferrer"
          className="block w-full py-3 px-4 rounded-xl text-sm font-medium text-white text-center"
          style={{ backgroundColor: "#2F6B5F" }}
        >
          Googleで口コミを書く →
        </a>
      </div>
    </div>
  );
}
