/* Utility functions for rendering */

export function pad(n) {
  return String(n).padStart(2, "0");
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

export function renderField(label, value) {
  if (!value) return "";

  return `
    <div class="artist-info-fact">
      <span class="artist-info-label">${escapeHtml(label)}</span>
      <p class="artist-info-value">${escapeHtml(value)}</p>
    </div>
  `;
}

export function renderListBlock(label, items) {
  if (!items.length) return "";

  return `
    <div>
      <span class="artist-info-label">${escapeHtml(label)}</span>
      <ul class="artist-info-list">${renderList(items)}</ul>
    </div>
  `;
}
