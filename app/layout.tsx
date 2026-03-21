import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "口コミ作成補助ツール",
  description: "Google口コミ下書き作成ツール",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-800 antialiased">{children}</body>
    </html>
  );
}
