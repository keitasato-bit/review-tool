"use client";

import { useState } from "react";
import type { ShopData } from "@/lib/types";
import CategorySection from "./CategorySection";
import ReviewResult from "./ReviewResult";

type Props = {
  shop: ShopData;
};

export default function ShopReviewForm({ shop }: Props) {
  const [selectedOptionsByCategory, setSelectedOptionsByCategory] = useState<
    Record<string, string[]>
  >({});
  const [freeText, setFreeText] = useState("");
  const [reviewText, setReviewText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggleOption(categoryId: string, optionId: string) {
    setSelectedOptionsByCategory((prev) => {
      const current = prev[categoryId] ?? [];
      const isSelected = current.includes(optionId);
      return {
        ...prev,
        [categoryId]: isSelected
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  }

  async function handleGenerate() {
    setIsLoading(true);
    setErrorMessage(null);
    setCopied(false);
    try {
      const res = await fetch("/api/generate-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: shop.id,
          selectedOptionsByCategory,
          freeText,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error ?? "エラーが発生しました。");
        return;
      }
      setReviewText(data.reviewText);
    } catch {
      setErrorMessage("通信エラーが発生しました。再度お試しください。");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setSelectedOptionsByCategory({});
    setFreeText("");
    setReviewText(null);
    setCopied(false);
    setErrorMessage(null);
  }

  async function handleCopy() {
    if (!reviewText) return;
    try {
      await navigator.clipboard.writeText(reviewText);
      setCopied(true);
    } catch {
      // clipboard API が使えない場合は何もしない
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: shop.brand.secondaryColor }}>
      {/* ヘッダー */}
      <header
        className="py-6 px-4 text-white"
        style={{ backgroundColor: shop.brand.primaryColor }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-medium opacity-80 mb-1">口コミ作成補助</p>
          <h1 className="text-xl font-bold">{shop.brand.logoText}</h1>
          <p className="text-sm mt-2 opacity-90 leading-relaxed">
            当てはまる項目を選ぶと、口コミ文の下書きが作成されます。
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* カテゴリ一覧 */}
        {shop.categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            selectedOptionIds={selectedOptionsByCategory[category.id] ?? []}
            onToggle={(optionId) => toggleOption(category.id, optionId)}
          />
        ))}

        {/* 自由記述欄 */}
        {shop.settings.allowFreeText && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-semibold text-gray-700">
                その他・自由記述（任意）
              </h2>
            </div>
            <div className="p-4">
              <textarea
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder="気になったことや印象に残ったことなど、自由にご記入ください。"
                rows={4}
                className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#2F6B5F] focus:border-transparent placeholder:text-gray-400"
              />
            </div>
          </div>
        )}

        {/* 注意文 */}
        <p className="text-xs text-gray-500 leading-relaxed px-1">
          ご投稿は任意です。実際のご体験に合わせて内容をご確認のうえ、必要に応じて編集してご投稿ください。
        </p>

        {/* CTAエリア */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 disabled:opacity-50"
          >
            内容をリセット
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex-[2] py-3 px-4 rounded-xl text-sm font-medium text-white disabled:opacity-70"
            style={{ backgroundColor: shop.brand.primaryColor }}
          >
            {isLoading ? "作成中…" : "口コミ文を作成する"}
          </button>
        </div>

        {/* エラー表示 */}
        {errorMessage && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {errorMessage}
          </p>
        )}

        {/* 結果表示エリア */}
        {reviewText !== null && (
          <ReviewResult
            reviewText={reviewText}
            reviewUrl={shop.reviewUrl}
            onCopy={handleCopy}
            copied={copied}
          />
        )}

        <div className="h-6" />
      </div>
    </main>
  );
}
