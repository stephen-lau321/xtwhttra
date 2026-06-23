import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MapView from "../components/common/MapView";
import TeacherCard from "../components/common/TeacherCard";
import { claimApi } from "../api/client";
import type { StreetClaim } from "../types";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<StreetClaim[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      doSearch(q);
    }
  }, [searchParams]);

  async function doSearch(q: string) {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res: any = await claimApi.search(q);
      setResults(res?.data || res || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-4 pb-8">
      {/* 搜索框 */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索街道、乐器或主理人…"
            className="input-field pl-12"
            autoFocus
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </form>

      {/* 地图 */}
      <div className="h-48 mb-4 rounded-xl overflow-hidden">
        <MapView className="w-full h-full" />
      </div>

      {/* 搜索结果 */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-3">
          <p className="text-xs text-gray-400">
            找到 {results.length} 个结果
          </p>
          {results.map((claim) => (
            <TeacherCard key={claim.id} claim={claim} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-1">🔍</p>
          <p className="text-sm">没有找到匹配的结果</p>
          <p className="text-xs mt-1">试试其他关键词</p>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">输入街道名或乐器名开始搜索</p>
        </div>
      )}
    </div>
  );
}
