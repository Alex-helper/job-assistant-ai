/**
 * 共享：API 厂商下拉（国内/国外）+ 可点击官方/第三方链接
 * 依赖页面已有：#cfg-region #cfg-provider #cfg-url #cfg-model #cfg-key #cfg-provider-info #cfg-third-party
 * 可选：window.API_PROVIDERS_URL 覆盖 providers 接口
 */
(function (global) {
  const DEFAULT_URL = "/api/providers-catalog";

  async function loadCatalog() {
    const url = global.API_PROVIDERS_URL || DEFAULT_URL;
    const r = await fetch(url);
    if (!r.ok) throw new Error("无法加载厂商目录");
    return r.json();
  }

  function bindApiProviderUI(opts) {
    const $ = (id) => document.getElementById(id);
    const regionEl = $("cfg-region");
    const providerEl = $("cfg-provider");
    const urlEl = $("cfg-url");
    const modelEl = $("cfg-model");
    const infoEl = $("cfg-provider-info");
    const thirdEl = $("cfg-third-party");
    if (!regionEl || !providerEl || !urlEl) return Promise.resolve(null);

    let catalog = null;

    function listByRegion(region) {
      return (catalog.providers || []).filter((p) => p.region === region);
    }

    function current() {
      return (catalog.providers || []).find((p) => p.id === providerEl.value);
    }

    function renderInfo(p) {
      if (!infoEl || !p) return;
      infoEl.innerHTML = `
        <div style="font-size:13px;line-height:1.55;color:#445">
          <div><b>${p.name}</b> — ${p.notes || ""}</div>
          <div style="margin-top:6px">官方 Base URL：
            <a href="${p.base_url}" target="_blank" rel="noreferrer">${p.base_url}</a>
            <button type="button" class="btn-fill-url" data-url="${p.base_url}" style="margin-left:6px">填入</button>
          </div>
          ${p.docs_url ? `<div>文档：<a href="${p.docs_url}" target="_blank" rel="noreferrer">${p.docs_url}</a></div>` : ""}
          ${p.console_url ? `<div>控制台：<a href="${p.console_url}" target="_blank" rel="noreferrer">${p.console_url}</a></div>` : ""}
        </div>`;
      if (!thirdEl) return;
      const thirds = p.third_party || [];
      if (!thirds.length) {
        thirdEl.innerHTML = "";
        return;
      }
      thirdEl.innerHTML =
        `<div style="margin-top:8px;font-size:12px;font-weight:700;color:#a16207">第三方网关推荐</div>` +
        thirds
          .map(
            (t) => `<div style="margin-top:6px;padding:8px;border:1px dashed #ddd;font-size:13px;line-height:1.5">
          <b>${t.name}</b> — ${t.notes || ""}<br/>
          API：<a href="${t.base_url}" target="_blank" rel="noreferrer">${t.base_url}</a>
          <button type="button" class="btn-fill-url" data-url="${t.base_url}" style="margin-left:6px">填入</button><br/>
          ${t.site_url ? `官网：<a href="${t.site_url}" target="_blank" rel="noreferrer">${t.site_url}</a><br/>` : ""}
          ${t.docs_url ? `文档：<a href="${t.docs_url}" target="_blank" rel="noreferrer">${t.docs_url}</a>` : ""}
        </div>`
          )
          .join("");
    }

    function fillFromProvider() {
      const p = current();
      if (!p) return;
      urlEl.value = p.base_url;
      if (modelEl) modelEl.value = p.default_model || (p.models || [])[0] || modelEl.value;
      renderInfo(p);
    }

    function rebuildProviders(preferId) {
      const list = listByRegion(regionEl.value);
      providerEl.innerHTML = list
        .map((p) => `<option value="${p.id}">${p.name}${p.default ? "（默认）" : ""}</option>`)
        .join("");
      const id =
        preferId && list.some((p) => p.id === preferId)
          ? preferId
          : (list.find((p) => p.default) || list[0] || {}).id;
      if (id) providerEl.value = id;
      fillFromProvider();
    }

    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-fill-url");
      if (!btn) return;
      urlEl.value = btn.getAttribute("data-url");
    });

    regionEl.addEventListener("change", () => rebuildProviders());
    providerEl.addEventListener("change", fillFromProvider);

    return loadCatalog().then((c) => {
      catalog = c;
      regionEl.innerHTML = (c.regions || [])
        .map((r) => `<option value="${r.id}">${r.label}</option>`)
        .join("");
      const prefer = opts && opts.providerId;
      const preferRegion = opts && opts.region;
      if (preferRegion) regionEl.value = preferRegion;
      else {
        const p = (c.providers || []).find((x) => x.id === prefer);
        regionEl.value = (p && p.region) || "cn";
      }
      rebuildProviders(prefer || c.default_provider_id || "deepseek");
      if (opts && opts.baseUrl) urlEl.value = opts.baseUrl;
      if (opts && opts.model && modelEl) modelEl.value = opts.model;
      return catalog;
    });
  }

  global.bindApiProviderUI = bindApiProviderUI;
  global.loadApiProvidersCatalog = loadCatalog;
})(window);
