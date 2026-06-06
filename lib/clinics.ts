import type { ClinicSurveyData } from "./clinic-types";

const clinics: ClinicSurveyData[] = [
  {
    id: "higashikoganei-kodomo",
    name: "東小金井駅前こどもクリニック",
    reviewUrl:
      "https://www.google.com/maps/place/%E6%9D%B1%E5%B0%8F%E9%87%91%E4%BA%95%E9%A7%85%E5%89%8D%E3%81%93%E3%81%A9%E3%82%82%E3%82%AF%E3%83%AA%E3%83%8B%E3%83%83%E3%82%AF/@35.7027567,139.2361473,11z/data=!4m12!1m2!2m1!1z44GZ44GT44KE44GL5q2m6JS16YeOIOWwj-WFkA!3m8!1s0x6018e58130a5cf65:0x526ce5e62cc191b!8m2!3d35.7027567!4d139.5245384!9m1!1b1!15sChzjgZnjgZPjgoTjgYvmrabolLXph44g5bCP5YWQWh8iHeOBmeOBk-OChOOBiyDmrabolLXph44g5bCP5YWQkgEObWVkaWNhbF9jbGluaWOaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMmt3ZUdWSFZrdGpibFYwVDFkbk0wOUZValZQUkdSdVZVTXhiRTFWUlJBQuABAPoBBAgAEBg!16s%2Fg%2F11c1s1k_jd?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
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
