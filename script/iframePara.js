/** @param {string} url  */
export default function iframePara(url) {
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.width = "100%";
  iframe.style.height = "99dvh";
  return iframe;
}
