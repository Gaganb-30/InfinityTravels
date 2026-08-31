// src/components/ui/SEO.jsx — per-route title / meta / canonical / OG tags
import { useEffect } from "react";
import { BRAND } from "../../utils/siteConfig";

const SITE = "https://infinitymilesholiday.com";

function upsert(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attrs.tag || "meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => {
    if (k !== "tag" && v != null) el.setAttribute(k, v);
  });
  return el;
}

export default function SEO({ title, description, image, path, noIndex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`;
    const desc = description || `${BRAND.name} plans unhurried, honestly priced holidays across India and abroad. Get a free quote from a real travel planner.`;
    const url = path ? `${SITE}${path}` : SITE;

    document.title = fullTitle;

    upsert('meta[name="description"]', { tag: "meta", name: "description", content: desc });
    upsert('link[rel="canonical"]', { tag: "link", rel: "canonical", href: url });
    upsert('meta[name="robots"]', { tag: "meta", name: "robots", content: noIndex ? "noindex,nofollow" : "index,follow" });

    upsert('meta[property="og:title"]', { tag: "meta", property: "og:title", content: fullTitle });
    upsert('meta[property="og:description"]', { tag: "meta", property: "og:description", content: desc });
    upsert('meta[property="og:type"]', { tag: "meta", property: "og:type", content: "website" });
    upsert('meta[property="og:url"]', { tag: "meta", property: "og:url", content: url });
    upsert('meta[property="og:site_name"]', { tag: "meta", property: "og:site_name", content: BRAND.name });
    if (image) upsert('meta[property="og:image"]', { tag: "meta", property: "og:image", content: image });

    upsert('meta[name="twitter:card"]', { tag: "meta", name: "twitter:card", content: image ? "summary_large_image" : "summary" });
    upsert('meta[name="twitter:title"]', { tag: "meta", name: "twitter:title", content: fullTitle });
    upsert('meta[name="twitter:description"]', { tag: "meta", name: "twitter:description", content: desc });
    if (image) upsert('meta[name="twitter:image"]', { tag: "meta", name: "twitter:image", content: image });
  }, [title, description, image, path, noIndex]);

  return null;
}
