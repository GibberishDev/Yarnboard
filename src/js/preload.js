const {webFrame} = require('electron')
const PATH = require('path')
const FM = require(PATH.join(__dirname, 'preloaded_scripts/file_management.js')) /*Load file manager script*/

webFrame.setVisualZoomLevelLimits(1,1)