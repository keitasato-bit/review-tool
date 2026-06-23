// lib/shops.ts

import { ShopData } from "./types";

const seitaiCategories: ShopData["categories"] = [
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
    id: "after",
    label: "施術後の感想",
    options: [
      { id: "after-1", label: "体が軽くなった感じがした" },
      { id: "after-2", label: "動きやすくなった感じがした" },
      { id: "after-3", label: "すっきりした感じがした" },
      { id: "after-4", label: "姿勢を意識しやすくなった" },
      { id: "after-5", label: "また通いたいと思った" },
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
];

const seitaiBrand: ShopData["brand"] = {
  primaryColor: "#2F6B5F",
  secondaryColor: "#F3F7F5",
  accentColor: "#D7E7E1",
  logoText: "R∞tsメディカル整体院",
};

const seitaiSettings: ShopData["settings"] = {
  tone: "polite",
  minLength: 120,
  maxLength: 220,
  allowFreeText: true,
};

const shops: ShopData[] = [
  {
    id: "roots-azabu-honten",
    name: "R∞tsメディカル整体院 麻布本店",
    businessType: "seitai",
    reviewUrl: "https://g.page/r/CXLOP3Yg9ynSEBM/review",
    brand: { ...seitaiBrand, logoText: "R∞tsメディカル整体院 麻布本店" },
    settings: { ...seitaiSettings },
    categories: seitaiCategories,
  },
  {
    id: "roots-azabujuban",
    name: "R∞tsメディカル整体院 麻布十番店",
    businessType: "seitai",
    reviewUrl: "https://g.page/r/CfzmElDVe9BSEBM/review",
    brand: { ...seitaiBrand, logoText: "R∞tsメディカル整体院 麻布十番店" },
    settings: { ...seitaiSettings },
    categories: seitaiCategories,
  },
  {
    id: "roots-shimbashi",
    name: "R∞tsメディカル整体院 新橋店",
    businessType: "seitai",
    reviewUrl: "https://g.page/r/CSiNvE3Gt2LzEBM/review",
    brand: { ...seitaiBrand, logoText: "R∞tsメディカル整体院 新橋店" },
    settings: { ...seitaiSettings },
    categories: seitaiCategories,
  },
  {
    id: "roots-musashikosugi",
    name: "R∞tsメディカル整体院 武蔵小杉店",
    businessType: "seitai",
    reviewUrl: "https://g.page/r/CRdSv05vHUaNEBM/review",
    brand: { ...seitaiBrand, logoText: "R∞tsメディカル整体院 武蔵小杉店" },
    settings: { ...seitaiSettings },
    categories: seitaiCategories,
  },
  {
    id: "sakulabo-houkan",
    name: "サクラボ訪問看護ステーション",
    businessType: "houkan",
    reviewUrl: "https://g.page/r/CWwREoDiWlJOEAE/review",
    brand: {
      primaryColor: "#2F6B5F",
      secondaryColor: "#F3F7F5",
      accentColor: "#D7E7E1",
      logoText: "サクラボ訪問看護ステーション",
    },
    settings: {
      tone: "polite",
      minLength: 120,
      maxLength: 220,
      allowFreeText: true,
    },
    categories: [
      {
        id: "reason",
        label: "利用したきっかけ",
        options: [
          { id: "reason-1", label: "退院後のケアが必要だった" },
          { id: "reason-2", label: "在宅での療養を続けたかった" },
          { id: "reason-3", label: "家族だけでの介護に不安があった" },
          { id: "reason-4", label: "主治医や病院から紹介された" },
          { id: "reason-5", label: "体調管理をしっかりしてほしかった" },
        ],
      },
      {
        id: "contact",
        label: "問い合わせ・手続きのしやすさ",
        options: [
          { id: "contact-1", label: "問い合わせへの対応が早かった" },
          { id: "contact-2", label: "説明がわかりやすかった" },
          { id: "contact-3", label: "手続きを丁寧にサポートしてもらえた" },
          { id: "contact-4", label: "不安な点をしっかり聞いてもらえた" },
          { id: "contact-5", label: "初めてでも安心して相談できた" },
        ],
      },
      {
        id: "nurse",
        label: "看護師の対応",
        options: [
          { id: "nurse-1", label: "丁寧に接してもらえた" },
          { id: "nurse-2", label: "話しやすい雰囲気だった" },
          { id: "nurse-3", label: "本人の気持ちを尊重してもらえた" },
          { id: "nurse-4", label: "家族にもわかりやすく説明してもらえた" },
          { id: "nurse-5", label: "安心感のある対応だった" },
        ],
      },
      {
        id: "care",
        label: "ケアの内容",
        options: [
          { id: "care-1", label: "体の状態をしっかり確認してもらえた" },
          { id: "care-2", label: "必要なケアを的確に行ってもらえた" },
          { id: "care-3", label: "痛みや不調に配慮してもらえた" },
          { id: "care-4", label: "処置が丁寧だった" },
          { id: "care-5", label: "無理のないペースで対応してもらえた" },
        ],
      },
      {
        id: "communication",
        label: "説明・コミュニケーション",
        options: [
          { id: "communication-1", label: "病状や経過をわかりやすく説明してもらえた" },
          { id: "communication-2", label: "気になることを何でも相談できた" },
          { id: "communication-3", label: "家族の疑問にも丁寧に答えてもらえた" },
          { id: "communication-4", label: "今後の見通しを教えてもらえた" },
          { id: "communication-5", label: "連絡・報告がしっかりしていた" },
        ],
      },
      {
        id: "reliability",
        label: "信頼感・安心感",
        options: [
          { id: "reliability-1", label: "プロとして信頼できると感じた" },
          { id: "reliability-2", label: "本人が安心して受け入れていた" },
          { id: "reliability-3", label: "家族として任せられると思えた" },
          { id: "reliability-4", label: "急な相談にも対応してもらえた" },
          { id: "reliability-5", label: "継続してお願いしたいと感じた" },
        ],
      },
      {
        id: "result",
        label: "利用後の変化・感想",
        options: [
          { id: "result-1", label: "本人の体調が安定してきた" },
          { id: "result-2", label: "家族の介護負担が軽くなった" },
          { id: "result-3", label: "在宅生活を続けられる安心感が増した" },
          { id: "result-4", label: "生活リズムが整ってきた" },
          { id: "result-5", label: "本人の気持ちが前向きになった" },
        ],
      },
      {
        id: "recommend",
        label: "おすすめしたい方",
        options: [
          { id: "recommend-1", label: "退院後の在宅ケアを検討している方" },
          { id: "recommend-2", label: "家族だけの介護に限界を感じている方" },
          { id: "recommend-3", label: "信頼できる看護師に関わってほしい方" },
          { id: "recommend-4", label: "本人のペースを大切にしたい方" },
          { id: "recommend-5", label: "安心して在宅療養を続けたい方" },
        ],
      },
    ],
  },
  {
    id: "sakulabo-houkan-renkei",
    name: "サクラボ訪問看護ステーション（医療機関連携用）",
    businessType: "houkan",
    audience: "referral-partner",
    reviewUrl: "https://g.page/r/CWwREoDiWlJOEAE/review",
    brand: {
      primaryColor: "#2F6B5F",
      secondaryColor: "#F3F7F5",
      accentColor: "#D7E7E1",
      logoText: "サクラボ訪問看護ステーション",
    },
    settings: {
      tone: "polite",
      minLength: 120,
      maxLength: 220,
      allowFreeText: true,
    },
    categories: [
      {
        id: "communication",
        label: "報告・連絡・相談",
        options: [
          { id: "communication-1", label: "報告がこまめで状況を把握しやすかった" },
          { id: "communication-2", label: "連絡のレスポンスが早かった" },
          { id: "communication-3", label: "相談しやすい雰囲気だった" },
          { id: "communication-4", label: "必要な情報を的確に共有してくれた" },
          { id: "communication-5", label: "緊急時の連絡体制が整っていた" },
        ],
      },
      {
        id: "teamwork",
        label: "多職種連携の姿勢",
        options: [
          { id: "teamwork-1", label: "担当者会議に積極的に参加してくれた" },
          { id: "teamwork-2", label: "チームとして動きやすかった" },
          { id: "teamwork-3", label: "役割分担が明確だった" },
          { id: "teamwork-4", label: "他職種の意見を尊重してくれた" },
          { id: "teamwork-5", label: "連携の調整に協力的だった" },
        ],
      },
      {
        id: "expertise",
        label: "専門性・対応力",
        options: [
          { id: "expertise-1", label: "専門的な視点が頼りになった" },
          { id: "expertise-2", label: "利用者の状態を的確に把握していた" },
          { id: "expertise-3", label: "状況に応じた柔軟な対応だった" },
          { id: "expertise-4", label: "医療的な判断が信頼できた" },
          { id: "expertise-5", label: "質の高いケアを提供していた" },
        ],
      },
      {
        id: "trust",
        label: "連携先としての信頼感",
        options: [
          { id: "trust-1", label: "また一緒に支援したいと思える" },
          { id: "trust-2", label: "安心して紹介できる" },
          { id: "trust-3", label: "対応が誠実だった" },
          { id: "trust-4", label: "利用者・家族からの信頼が厚かった" },
          { id: "trust-5", label: "パートナーとして信頼できた" },
        ],
      },
    ],
  },
];

export function getShopById(shopId: string): ShopData | undefined {
  return shops.find((shop) => shop.id === shopId);
}

export default shops;
