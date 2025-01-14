export function hexToRGB(hex, alpha, byArray = false) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    if (byArray) return [r, g, b]
    const rgb_color = `${r}, ${g}, ${b}`
    return alpha ? `rgba(${rgb_color}, ${alpha})` : `rgb(${rgb_color})`
}

/**
 * Проверяем контрастность по формуле
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
 * bgColor -
 * */
export function checkContrastColor(colorName, bgColor) {
    const RED = 0.2126
    const GREEN = 0.7152
    const BLUE = 0.0722
    const GAMMA = 2.4

    function luminance(r, g, b) {
        const a = [r, g, b].map(v => {
            v /= 255
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA)
        })
        return a[0] * RED + a[1] * GREEN + a[2] * BLUE
    }

    function contrast(rgb1, rgb2) {
        const lum1 = luminance(...rgb2)
        const lum2 = luminance(...rgb1)
        const brightest = Math.max(lum1, lum2)
        const darkest = Math.min(lum1, lum2)
        return (brightest + 0.05) / (darkest + 0.05)
    }
    const color = getComputedStyle(document.querySelector(':root')).getPropertyValue(`--color-${colorName}`)
    return contrast(hexToRGB(color, null, true), bgColor) < 3
}
