import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../api/client";
import type { Product } from "../types";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi.list().then((res: any) => {
      setProducts(Array.isArray(res) ? res : res?.data || []);
    }).finally(() => setLoading(false));
  }, []);

  function parseImages(images: string): string[] {
    try { return JSON.parse(images); } catch { return []; }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">乐器商城</h1>
          <p className="text-sm text-gray-500 mt-0.5">音乐主理人自营乐器</p>
        </div>
        <Link to="/" className="text-xs text-primary-600 underline">回首页</Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-xl p-3 animate-pulse">
              <div className="aspect-square bg-gray-100 rounded-lg mb-2" />
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-1" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-3xl mb-3">🎸</div>
          <p className="text-sm">商城暂无商品</p>
          <p className="text-xs mt-1">老师可以在后台发布乐器</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => {
            const imgs = parseImages(p.images);
            return (
              <Link
                key={p.id}
                to={`/shop/${p.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-50 flex items-center justify-center text-4xl overflow-hidden">
                  {imgs.length > 0 ? (
                    <img src={imgs[0]} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>🎹</span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-800 truncate">{p.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{p.instrument?.name} · {p.teacher?.user?.nickname || "未知"}</p>
                  <p className="text-primary-700 font-bold text-sm mt-1">¥{(p.price / 100).toFixed(2)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
