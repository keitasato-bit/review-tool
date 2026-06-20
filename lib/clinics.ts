import type { ClinicSurveyData } from "./clinic-types";

const clinics: ClinicSurveyData[] = [
  {
    id: "higashikoganei-kodomo",
    name: "東小金井駅前こどもクリニック",
    reviewUrl: "https://g.page/r/CRsZzGJeziYFEBE/review",
    brand: {
      primaryColor: "#2F6B5F",
      secondaryColor: "#F3F7F5",
      accentColor: "#D7E7E1",
      logoText: "東小金井駅前こどもクリニック",
    },
    ratingQuestions: [
      { id: "reception", label: "受付スタッフの対応（対面・電話）について" },
      { id: "nurse", label: "看護師の対応について" },
      { id: "doctor", label: "医師の説明・対応について" },
      { id: "environment", label: "院内環境について" },
      { id: "waiting", label: "待ち時間について" },
      { id: "reservation", label: "予約システムについて" },
      { id: "recommend", label: "当院を友人に薦めたいと思いますか" },
    ],
    freeTextLabel:
      "当院について良い点や改善すべき点がありましたら教えてください",
    freeTextPlaceholder:
      "例）先生が症状をじっくり聞いてくださり、説明も丁寧でした。",
  },
];

export function getClinicById(clinicId: string): ClinicSurveyData | undefined {
  return clinics.find((clinic) => clinic.id === clinicId);
}

export default clinics;
