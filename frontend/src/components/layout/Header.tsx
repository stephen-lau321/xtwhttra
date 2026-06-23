import { Link } from "react-router-dom";

export default function Header() {
  const token = localStorage.getItem("access_token");

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl">🎵</span>
          <span className="font-semibold text-primary-700 text-lg tracking-tight">
            街乐
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            to="/shop"
            className="text-gray-500 hover:text-primary-700 transition-colors"
            title="乐器商城"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </Link>
          <Link
            to="/search"
            className="text-gray-500 hover:text-primary-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          {token ? (
            <Link to="/dashboard" className="btn-primary text-xs px-4 py-2">
              我的
            </Link>
          ) : (
            <Link to="/auth" className="btn-outline text-xs px-4 py-2">
              登录
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}