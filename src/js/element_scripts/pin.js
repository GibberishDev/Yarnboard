Array.prototype.slice.call(document.getElementsByClassName('pin')).forEach(element => {
    element.addEventListener('click', () => {

    })
});
var pinHueSlider = document.getElementById('pin-hue-slider')
pinHueSlider.addEventListener('input', (ev) => {
    updateColor()
})
var pinSaturationSlider = document.getElementById('pin-saturation-slider')
pinSaturationSlider.addEventListener('input', (ev) => {
    updateSaturation()
})
var pinLightnessSlider = document.getElementById('pin-lightness-slider')
pinLightnessSlider.addEventListener('input', (ev) => {
    updateLightness()
})

function updateColor() {
    document.querySelector(':root').style.setProperty('--var-hue-rotate', String(pinHueSlider.value) + "deg")
}
function updateSaturation() {
    document.querySelector(':root').style.setProperty('--var-saturation-rotate', String(pinSaturationSlider.value) + "%")
}
function updateLightness() {
    document.querySelector(':root').style.setProperty('--var-lightness-rotate', String(pinLightnessSlider.value) + "%")
}