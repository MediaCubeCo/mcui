import { getTokensByType } from '../utils/getTokens'


export function setVariationsByColor(keys = []) {
    let variations = {}
    const colors = getTokensByType('color')
    Object.keys(colors).forEach(c => {
        const colorVariations = {
            [c]: c,
        }
        keys.forEach(key => {
            colorVariations[`${c}-${key}`] = `${c}-${key}`
        })
        variations = {
            ...variations,
            ...colorVariations,
        }
    })
    return variations
}
