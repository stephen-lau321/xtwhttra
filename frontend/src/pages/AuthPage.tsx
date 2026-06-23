import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"wechat" | "phone">("wechat");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  function handleSendCode() {
    if (!/^1\d{10}$/.test(phone)) {
      alert("请输入正确的手机号");
      return;
    }
    setCodeSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    alert("验证码已发送（开发阶段 mock）");
  }

  function handleLogin() {
    // ⚠ 开发阶段：mock 登录
    localStorage.setItem("access_token", "mock-token");
    localStorage.setItem("user", JSON.stringify({ nickname: "测试老师", role: "TEACHER" }));
    navigate("/");
  }

  return (
    <div className="max-w-sm mx-auto px-4 pt-16">
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">🎵</div>
        <h1 className="text-xl font-bold text-gray-900">一街一师一乐器</h1>
        <p className="text-sm text-gray-400 mt-1">
          登录后认领你的音乐据点
        </p>
      </div>

      {/* Tab 切换 */}
      <div className="flex bg-gray-100 rounded-full p-1 mb-6">
        <button
          onClick={() => setTab("wechat")}
          className={`flex-1 py-2 text-sm rounded-full transition-all ${
            tab === "wechat" ? "bg-white shadow-sm font-medium text-gray-900" : "text-gray-500"
          }`}
        >
          微信登录
        </button>
        <button
          onClick={() => setTab("phone")}
          className={`flex-1 py-2 text-sm rounded-full transition-all ${
            tab === "phone" ? "bg-white shadow-sm font-medium text-gray-900" : "text-gray-500"
          }`}
        >
          手机号登录
        </button>
      </div>

      {tab === "wechat" ? (
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white rounded-full py-3 font-medium text-sm
                     hover:bg-green-600 active:bg-green-700 transition-colors"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">💬</span>
            <span>微信一键登录</span>
          </div>
        </button>
      ) : (
        <div className="space-y-4">
          <div>
            <input
              type="tel"
              placeholder="手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
              maxLength={11}
            />
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="验证码"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input-field flex-1"
              maxLength={6}
            />
            <button
              onClick={handleSendCode}
              disabled={countdown > 0}
              className={`px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                countdown > 0
                  ? "bg-gray-100 text-gray-400"
                  : "bg-primary-50 text-primary-700 hover:bg-primary-100"
              }`}
            >
              {countdown > 0 ? `${countdown}s` : "获取验证码"}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="btn-primary w-full text-sm"
          >
            登录
          </button>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mt-6">
        登录即表示同意《用户协议》和《隐私政策》
      </p>
    </div>
  );
}
