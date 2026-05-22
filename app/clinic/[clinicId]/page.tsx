import { getClinicById } from "@/lib/clinics";
import ClinicSurveyForm from "@/components/ClinicSurveyForm";

type Props = {
  params: { clinicId: string };
};

export default function ClinicPage({ params }: Props) {
  const clinic = getClinicById(params.clinicId);

  if (!clinic) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-sm w-full text-center">
          <p className="text-gray-600">クリニックが見つかりません。</p>
        </div>
      </main>
    );
  }

  return <ClinicSurveyForm clinic={clinic} />;
}
