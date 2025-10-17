/* Kanvas 1.0.0 */
document.addEventListener("click", async () => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;
  canvas.toBlob(async b => {
    if (!b) return;
    await navigator.clipboard.write([
      new ClipboardItem({ [b.type]: b })
    ]);
  });
});
