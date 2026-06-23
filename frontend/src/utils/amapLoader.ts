const AMAP_CDN_URL = "https://webapi.amap.com/maps";
const AMAP_VERSION = "2.0";
export const AMAP_API_KEY = "f1392fa410619aad5a6b18ee6da3c168";
const AMAP_SECURITY_JS_CODE = "";
let loadPromise: any = null;
export function loadAMap(): Promise<any> {
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve: any, reject: any) => {
    const W = window as any;
    if (typeof W.AMap !== "undefined") { resolve(W.AMap); return; }
    if (AMAP_SECURITY_JS_CODE) { W._AMapSecurityConfig = { securityJsCode: AMAP_SECURITY_JS_CODE }; }
    const script = document.createElement("script");
    script.src = AMAP_CDN_URL + "?v=" + AMAP_VERSION + "&key=" + AMAP_API_KEY;
    script.async = true; script.defer = true;
    script.onload = () => { if (typeof (window as any).AMap !== "undefined") { resolve((window as any).AMap); } else { reject(new Error("加载失败")); } };
    script.onerror = () => { loadPromise = null; reject(new Error("网络错误")); };
    document.head.appendChild(script);
  });
  return loadPromise;
}