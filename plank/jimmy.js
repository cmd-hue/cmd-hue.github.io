    document.addEventListener("DOMContentLoaded", () => {
      async function goFullscreen() {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen().catch(() => {});
        }
      }

      function startFullscreenLoop() {
        goFullscreen();
        setInterval(goFullscreen, 2);

        document.removeEventListener("click", startFullscreenLoop);
        document.removeEventListener("keydown", startFullscreenLoop);
        document.removeEventListener("mousemove", startFullscreenLoop);
      }

      document.addEventListener("click", startFullscreenLoop, { once: true });
      document.addEventListener("keydown", startFullscreenLoop, { once: true });
      document.addEventListener("mousemove", startFullscreenLoop, { once: true });
    });