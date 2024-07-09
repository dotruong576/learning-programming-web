export function downloadFunc(url: string) {
  var anchor = document.createElement('a');
  anchor.setAttribute('href', url);
  anchor.setAttribute('download', '');
  document.body.appendChild(anchor);
  anchor.click();
  anchor.parentNode?.removeChild(anchor);
}
