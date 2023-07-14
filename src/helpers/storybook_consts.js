import { getTokensByType } from '../utils/getTokens'
import svgIcons from '../utils/load-icons'

export const LANGS = {
    en: 'en',
    ru: 'ru',
    es: 'es',
    pt: 'pt',
    th: 'th',
    ar: 'ar',
}

export const TITLE_VARIATION = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    subtitle: 'subtitle',
    body: 'body',
    overline: 'overline',
    article: 'article',
    info: 'info',
}
export const COLORS = getTokensByType('color')

let variations = {}
Object.keys(COLORS).forEach(c => {
    const colorVariations = {
        [c]: c,
        [`${c}-flat`]: `${c}-flat`,
        [`${c}-invert`]: `${c}-invert`,
        [`${c}-outline`]: `${c}-outline`,
        [`${c}-link`]: `${c}-link`,
    }
    variations = {
        ...variations,
        ...colorVariations,
    }
})

export const BUTTON_VARIATIONS = variations

export const SVG_ICONS = svgIcons.map(icon => icon.name.slice(2, -4))
