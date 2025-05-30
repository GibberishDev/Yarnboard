const { readImage, writeImage, readText, writeText } = window.__TAURI__.clipboardManager; // @tauri-apps/plugin-clipboard-manager

console.log("a")

document.addEventListener("click", async (e) => {
    const content = await readImage().then((a) => {console.log(a.rgba())})

})