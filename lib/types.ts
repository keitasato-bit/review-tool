export type ReviewOption = {
  id: string;
  label: string;
};

export type ReviewCategory = {
  id: string;
  label: string;
  options: ReviewOption[];
};

export type ShopBrand = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoText: string;
};

export type ShopSettings = {
  tone: "polite";
  minLength: number;
  maxLength: number;
  allowFreeText: boolean;
};

export type ShopBusinessType = "seitai" | "houkan";

// 口コミを書く人の視点。未指定（undefined）は患者・利用者本人/家族の目線。
// "referral-partner" は連携先の医療機関スタッフ（ケアマネ・退院支援担当など）の目線。
export type ShopAudience = "referral-partner";

export type ShopData = {
  id: string;
  name: string;
  businessType: ShopBusinessType;
  audience?: ShopAudience;
  reviewUrl: string;
  brand: ShopBrand;
  settings: ShopSettings;
  categories: ReviewCategory[];
};
