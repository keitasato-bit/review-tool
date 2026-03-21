import { getShopById } from "@/lib/shops";
import ShopReviewForm from "@/components/ShopReviewForm";

type Props = {
  params: { shopId: string };
};

export default function ShopPage({ params }: Props) {
  const shop = getShopById(params.shopId);

  if (!shop) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-sm w-full text-center">
          <p className="text-gray-600">店舗が見つかりません。</p>
        </div>
      </main>
    );
  }

  return <ShopReviewForm shop={shop} />;
}
