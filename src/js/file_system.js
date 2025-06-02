const path = window.__TAURI__.path;
const fs = window.__TAURI__.fs;
const baseDirectory = window.__TAURI__.baseDirectory;

var configFilePath = ""

async function checkConfig() {
    let configPath = ""
    await path.configDir().then(
        async (promise) => {
        configPath = promise + "/yarnboard"
        await fs.exists(configPath).then( async (r) => {
            if (!r) {
                fs.mkdir(configPath).then(
                    console.log("Config folder created") 
                )
            } else {
                return 
            }
        }).then(
            console.log("Checking app configuration file...")
        )
    })
}


checkConfig()
