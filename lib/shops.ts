import type { ShopData } from "./types";

const rootsMedicalSeitaiin: ShopData = {
  id: "roots-medical-seitaiin",
  name: "R∞tsメディカル整体院",
  reviewUrl: "https://g.page/r/CXLOP3Yg9ynSEAE/review",
  brand: {
    primaryColor: "#2F6B5F",
    secondaryColor: "#F3F7F5",
    accentColor: "#D7E7E1",
    logoText: "R∞tsメディカル整体院",
  },
  settings: {
    tone: "polite",
    minLength: 120,
    maxLength: 220,
    allowFreeText: true,
  },
  categories: [
    {
      id: "visit-reason",
      label: "来店理由",
      options: [
        { id: "visit-reason-1", label: "肩こりが気になっていた" },
        { id: "visit-reason-2", label: "腰まわりの不調が気になっていた" },
        { id: "visit-reason-3", label: "姿勢を整えたかった" },
        { id: "visit-reason-4", label: "体のメンテナンスをしたかった" },
        { id: "visit-reason-5", label: "慢性的な不調を相談したかった" },
      ],
    },
    {
      id: "accessibility",
      label: "予約・来店しやすさ",
      options: [
        { id: "accessibility-1", label: "予約が取りやすかった" },
        { id: "accessibility-2", label: "案内がスムーズだった" },
        { id: "accessibility-3", label: "待ち時間が少なかった" },
        { id: "accessibility-4", label: "通いやすいと感じた" },
        { id: "accessibility-5", label: "初めてでも利用しやすかった" },
      ],
    },
    {
      id: "hospitality",
      label: "接客対応",
      options: [
        { id: "hospitality-1", label: "丁寧に対応してもらえた" },
        { id: "hospitality-2", label: "話しやすい雰囲気だった" },
        { id: "hospitality-3", label: "親身に話を聞いてもらえた" },
        { id: "hospitality-4", label: "安心感があった" },
        { id: "hospitality-5", label: "無理な勧誘がなかった" },
      ],
    },
    {
      id: "counseling",
      label: "カウンセリング・説明",
      options: [
        { id: "counseling-1", label: "悩みをしっかり聞いてもらえた" },
        { id: "counseling-2", label: "体の状態をわかりやすく説明してもらえた" },
        { id: "counseling-3", label: "原因について丁寧に教えてもらえた" },
        { id: "counseling-4", label: "自分に合った提案だと感じた" },
        { id: "counseling-5", label: "納得して施術を受けられた" },
      ],
    },
    {
      id: "treatment",
      label: "施術の印象",
      options: [
        { id: "treatment-1", label: "施術が丁寧だった" },
        { id: "treatment-2", label: "力加減がちょうどよかった" },
        { id: "treatment-3", label: "安心して受けられた" },
        { id: "treatment-4", label: "的確だと感じた" },
        { id: "treatment-5", label: "無理のない施術だった" },
      ],
    },
    {
      id: "after-treatment",
      label: "施術後の感想",
      options: [
        { id: "after-treatment-1", label: "体が軽くなった感じがした" },
        { id: "after-treatment-2", label: "動きやすくなった感じがした" },
        { id: "after-treatment-3", label: "すっきりした感じがした" },
        { id: "after-treatment-4", label: "姿勢を意識しやすくなった" },
        { id: "after-treatment-5", label: "また通いたいと思った" },
      ],
    },
    {
      id: "atmosphere",
      label: "院内の雰囲気",
      options: [
        { id: "atmosphere-1", label: "清潔感があった" },
        { id: "atmosphere-2", label: "落ち着ける空間だった" },
        { id: "atmosphere-3", label: "居心地がよかった" },
        { id: "atmosphere-4", label: "リラックスできた" },
        { id: "atmosphere-5", label: "明るく入りやすかった" },
      ],
    },
    {
      id: "recommend",
      label: "おすすめしたい相手",
      options: [
        { id: "recommend-1", label: "初めて整体を受ける人" },
        { id: "recommend-2", label: "丁寧な説明を受けたい人" },
        { id: "recommend-3", label: "慢性的な不調に悩んでいる人" },
        { id: "recommend-4", label: "体を整えたい人" },
        { id: "recommend-5", label: "安心して通える整体院を探している人" },
      ],
    },
  ],
};

const shops: ShopData[] = [rootsMedicalSeitaiin];

export function getShopById(shopId: string): ShopData | undefined {
  return shops.find((shop) => shop.id === shopId);
}
