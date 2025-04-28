const MODULE = module.exports = {}

const PATH = require('path')
const OS = require('os')
const FS = require('fs')
const PROMISIFY = require('util').promisify
const READ_FILE = PROMISIFY(FS.readFile)
const WRITE_FILE = PROMISIFY(FS.writeFile)


const HOME_DIR = OS.homedir()
const LOCAL_DIR = PATH.join(HOME_DIR, 'AppData/Local/yarnboard')

function getAppFolder() {
    if (!FS.existsSync(LOCAL_DIR)) {
        FS.mkdirSync(LOCAL_DIR)
    }
    return(LOCAL_DIR)
}

getAppFolder() 

MODULE.getLocalDir = getAppFolder()

MODULE.create_folder = (path) => {
    FS.mkdirSync(path)
}

MODULE.read_json_file = (path) => {
    return READ_FILE(path).then((file) => {
        try {
            return JSON.parse(file)
        } catch(error) {
            return Promise.reject(error)
        }
    })
}

MODULE.write_json_file = (path, object) => {
    console.log("path recieved: ", path, "; object recieved: ", object)
    WRITE_FILE(path, JSON.stringify(object))
}

