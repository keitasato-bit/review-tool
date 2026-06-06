"use client";

import { useState } from "react";
import type {
  ClinicSurveyData,
  RatingValue,
} from "@/lib/clinic-types";
import { generateClinicReview } from "@/lib/clinic-review-generator";
import RatingQuestion from "./RatingQuestion";
import FreeTextSection from "./FreeTextSection";
import ReviewResult from "./ReviewResult";

type Props = {
  clinic: ClinicSurveyData;
};

export default function ClinicSurveyForm({ clinic }: Props) {
  const [ratings, setRatings] = useState<Record<string, RatingValue>>({});
  const [freeText, setFreeText] = useState("");
  const [reviewText, setReviewText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleRatingChange(questionId: string, value: RatingValue) {
    setRatings((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleGenerate() {
    const text = generateClinicReview({
      clinic,
      ratings,
      freeText,
    });
    setReviewText(text);
    setCopied(false);
  }

  function handleReset() {
    setRatings({});
    setFreeText("");
    setReviewText(null);
    setCopied(false);
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
    <main
      className="min-h-screen"
      style={{ backgroundColor: clinic.brand.secondaryColor }}
    >
      <header
        className="py-6 px-4 text-white"
        style={{ backgroundColor: clinic.brand.primaryColor }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-medium opacity-80 mb-1">
            アンケート連動型 口コミ支援ツール
          </p>
          <h1 className="text-xl font-bold">{clinic.brand.logoText}</h1>
          <p className="text-sm mt-2 opacity-90 leading-relaxed">
            アンケートにお答えいただくと、口コミ文の下書きが作成されます。
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {clinic.ratingQuestions.map((question) => (
          <RatingQuestion
            key={question.id}
            question={question}
            value={ratings[question.id]}
            onChange={(value) => handleRatingChange(question.id, value)}
          />
        ))}

        <FreeTextSection
          clinic={clinic}
          ratings={ratings}
          value={freeText}
          onChange={setFreeText}
        />

        <p className="text-xs text-gray-500 leading-relaxed px-1">
          ご投稿は任意です。実際のご体験に合わせて内容をご確認のうえ、必要に応じて編集してご投稿ください。
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200"
          >
            内容をリセット
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            className="flex-[2] py-3 px-4 rounded-xl text-sm font-medium text-white"
            style={{ backgroundColor: clinic.brand.primaryColor }}
          >
            口コミ文を作成する
          </button>
        </div>

        {reviewText !== null && (
          <ReviewResult
            reviewText={reviewText}
            reviewUrl={clinic.reviewUrl}
            onCopy={handleCopy}
            copied={copied}
          />
        )}

        <div className="h-6" />
      </div>
    </main>
  );
}
