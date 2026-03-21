import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          口コミ作成補助ツール
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          店舗ごとの口コミ下書き作成ページへ移動できます。
        </p>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-3">サンプル店舗</p>
          <Link
            href="/shop/roots-medical-seitaiin"
            className="block w-full text-center px-6 py-4 rounded-xl text-white font-medium"
            style={{ backgroundColor: "#2F6B5F" }}
          >
            R∞tsメディカル整体院
          </Link>
        </div>
      </div>
    </main>
  );
}
