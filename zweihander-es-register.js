Hooks.once('init', () => {
        document.getElementById("logo").src = "/modules/fvtt-module-zweihander-es/images/fvtt-zweihander-es.webp";
});

Hooks.once('ready', async function () {
    setTimeout(() => {
      game.settings.set(
        "babele",
        "directory",
        "/modules/fvtt-module-zweihander-es/babele"
      );
    }, 2000);
});
