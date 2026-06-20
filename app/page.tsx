"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import shops from "@/lib/shops";
import clinics from "@/lib/clinics";
import type { ShopBusinessType } from "@/lib/types";

const PASSWORD = "310keita-lfu0813";
const AUTH_KEY = "review-tool-admin-auth";

type StoreEntry = {
  id: string;
  name: string;
  reviewUrl: string;
  href: string;
};

type Group = {
  key: string;
  label: string;
  stores: StoreEntry[];
};

const SHOP_GROUP_LABELS: Record<ShopBusinessType, string> = {
  seitai: "整体院",
  houkan: "訪問看護",
};

// データに店舗を追加するだけで自動で各グループに振り分けられる。
function buildGroups(): Group[] {
  const seitai: StoreEntry[] = [];
  const houkan: StoreEntry[] = [];

  for (const shop of shops) {
    const entry: StoreEntry = {
      id: shop.id,
      name: shop.name,
      reviewUrl: shop.reviewUrl,
      href: `/shop/${shop.id}`,
    };
    if (shop.businessType === "houkan") {
      houkan.push(entry);
    } else {
      seitai.push(entry);
    }
  }

  const clinic: StoreEntry[] = clinics.map((c) => ({
    id: c.id,
    name: c.name,
    reviewUrl: c.reviewUrl,
    href: `/clinic/${c.id}`,
  }));

  return [
    { key: "seitai", label: SHOP_GROUP_LABELS.seitai, stores: seitai },
    { key: "houkan", label: SHOP_GROUP_LABELS.houkan, stores: houkan },
    { key: "clinic", label: "クリニック", stores: clinic },
  ].filter((g) => g.stores.length > 0);
}

function StoreCard({ store }: { store: StoreEntry }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(store.reviewUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      alert("コピーに失敗しました。手動でコピーしてください。");
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <p className="font-medium text-gray-800 mb-3 break-words">{store.name}</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Link
          href={store.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center px-4 py-2 rounded-lg text-white text-sm font-medium"
          style={{ backgroundColor: "#2F6B5F" }}
        >
          口コミ作成ページを開く
        </Link>
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          {copied ? "コピーしました" : "Google口コミURLをコピー"}
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY) === "true") {
      setAuthed(true);
    }
    setReady(true);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (input === PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setAuthed(true);
      setError(false);
      setInput("");
    } else {
      setError(true);
    }
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setInput("");
  }

  // localStorage 読み込み前のちらつき防止
  if (!ready) {
    return <main className="min-h-screen" />;
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            店舗管理ページ
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed text-sm">
            パスワードを入力してください。
          </p>
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="パスワード"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-[#2F6B5F]"
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-600 mb-3">
              パスワードが正しくありません。
            </p>
          )}
          <button
            type="submit"
            className="block w-full text-center px-6 py-3 rounded-xl text-white font-medium"
            style={{ backgroundColor: "#2F6B5F" }}
          >
            ログイン
          </button>
        </form>
      </main>
    );
  }

  const groups = buildGroups();

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">店舗管理ページ</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition-colors"
          >
            ログアウト
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {groups.map((group) => (
            <section key={group.key}>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                {group.label}（{group.stores.length}店舗）
              </h2>
              <div className="flex flex-col gap-3">
                {group.stores.map((store) => (
                  <StoreCard key={store.id} store={store} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
