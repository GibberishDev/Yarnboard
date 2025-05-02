const api = module.exports = {}

const {clipboard} = require('electron')

api.getClipboardType = () => {
    return clipboard.availableFormats()
} 

api.getTextFromClipboard = () => {
    try {
        return clipboard.readText()
    } catch(err) {
        return Promise.reject(err)
    }
}


api.getImageFromClipboard = () => {
    if (clipboard.availableFormats().includes('image/png')) {
        return clipboard.readImage().toDataURL()
    } else {
        return false
    }
}