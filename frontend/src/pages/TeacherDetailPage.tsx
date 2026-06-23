import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { claimApi, activityApi } from "../api/client";
import type { StreetClaim, Activity } from "../types";
import MapView from "../components/common/MapView";

type Tab = "about" | "gallery" | "activities";

export default function TeacherDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [claim, setClaim] = useState<StreetClaim | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    if (!id) return;
    try {
      // ⚠ 开发阶段：从附近列表获取
      const res: any = await claimApi.nearby(23.12, 113.324);
      const claims: StreetClaim[] = res?.data || res || [];
      const found = claims.find((c) => c.teacher?.user.id === id);
      setClaim(found || claims[0] || null);

      const actRes: any = await activityApi.listByTeacher(id);
      setActivities(actRes?.data || actRes || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-4 animate-pulse">
        <div className="h-48 bg-gray-100 rounded-xl mb-4" />
        <div className="space-y-3">
          <div className="h-6 bg-gray-100 rounded w-1/3" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-20 text-center text-gray-400">
        <p className="text-lg mb-1">😕</p>
        <p className="text-sm">未找到该老师的信息</p>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "about", label: "关于我" },
    { key: "gallery", label: "作品集" },
    { key: "activities", label: "近期活动" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* 头部：封面 + 头像 + 基本信息 */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-400" />
        <div className="px-4 pb-4">
          <div className="-mt-10 flex items-end gap-4 mb-3">
            <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
              <div className="w-full h-full rounded-full bg-primary-100 flex items-center justify-center text-2xl">
                {claim.teacher?.user.avatar ? (
                  <img src={claim.teacher.user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  "🎵"
                )}
              </div>
            </div>
            <div className="pb-1">
              <h1 className="text-xl font-bold text-gray-900">
                {claim.teacher?.user.nickname || "音乐主理人"}
              </h1>
              <p className="text-sm text-primary-600">
                {claim.instrument.name} · {claim.streetName}
              </p>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <button className="btn-primary flex-1 text-sm py-2.5">
              预约咨询
            </button>
            <button className="btn-outline text-sm py-2.5 px-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="border-b border-gray-100 px-4">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "text-primary-700 border-primary-700"
                  : "text-gray-400 border-transparent hover:text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 内容 */}
      <div className="px-4 py-6">
        {activeTab === "about" && (
          <div className="space-y-4">
            <section>
              <h3 className="font-medium text-gray-900 mb-2">介绍</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                我是{claim.streetName}的音乐主理人，擅长{claim.instrument.name}。
                期待与街坊邻居一起分享音乐的美好。
              </p>
            </section>
            <section>
              <h3 className="font-medium text-gray-900 mb-2">位置</h3>
              <div className="h-32 rounded-xl overflow-hidden">
                <MapView className="w-full h-full" />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {claim.district} · {claim.streetName}
              </p>
            </section>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-sm">
                🖼️
              </div>
            ))}
          </div>
        )}

        {activeTab === "activities" && (
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                暂无活动，敬请期待
              </p>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="card p-4">
                  <div className="flex gap-4">
                    {act.coverImage && (
                      <div className="w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        <img src={act.coverImage} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">{act.title}</h4>
                      {act.eventTime && (
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(act.eventTime).toLocaleString("zh-CN")}
                        </p>
                      )}
                      {act.price !== null && (
                        <p className="text-sm text-primary-600 font-medium mt-1">
                          ¥{(act.price / 100).toFixed(2)}
                        </p>
                      )}
                      {act.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {act.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
