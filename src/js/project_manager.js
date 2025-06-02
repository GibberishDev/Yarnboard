var projectData = {
    settings: {
        name: "new project",
        author: "",
        timeOfCreation: 0
    },
    elements: {},
    connections: {}
}

var saveState = {
    saved: false,
    lastSaveTime: 0,
    autoSaved: false,
    lastAutosaveTime: 0,
}
const dialog = window.__TAURI__.dialog
const fs = window.__TAURI__.fs

async function saveProjectAs() {
    let path = await dialog.open({multiple: false, directory: true})
    if (path===null) {
        console.info("directory selection cancelled")
        return
    }
    const directoryContents = await fs.readDir(path)
    if (directoryContents != []) {
        const confirmation = await dialog.confirm("Chosen directory already contains files.\nProceed?")
        if (!confirmation) {
            console.log("project save aborted")
            return
        }
    }
    try {
        await fs.mkdir(path + "/assets", {BaseDirectory: path})
    } catch (err) {
        if (err.search("(os error 17)") !== -1) {
            console.warn("Directory already exists: " + path + "/assets")
        } else {
            console.err(err);
            return
        }
    }
    const file = await fs.create(path + "/manifest.yrn",{dir: path})
    await file.write(new TextEncoder().encode(JSON.stringify(projectData)))
    await file.close()
}