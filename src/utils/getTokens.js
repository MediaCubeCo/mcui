import tokens from '../assets/tokens/tokens.json'

const getTokenValue = name => {
    const tokenData = tokens.variables.find(v => v.name === name)
    return tokenData.value
}

const getTokensByType = type => {
    const filteredTokens = tokens.variables.filter(v => {
        const regExp = new RegExp(`^\\$${type}-`)
        return regExp.test(v.name)
    })
    const tokenList = {}
    filteredTokens.forEach(t => {
        const key = t.name.replace(`$${type}-`, '')
        tokenList[key] = key
    })
    return tokenList
}

const getTokenGroup = name => {
    const dataTokens = tokens.variables.find(v => v.name === `$token-${name}`)
    let tokenList = {}
    if (!dataTokens) return tokenList

    if ('mapValue' in dataTokens) {
        dataTokens.mapValue.forEach(t => (tokenList[t.name] = t.name))
        return tokenList
    }

    const valueArr = dataTokens.value.replace(/\/\*.+\*\/\s/, '').split(' ')
    valueArr.forEach(i => {
        if (i.match(/.+:$/)) {
            const key = i.slice(0, i.length - 1)
            tokenList[key] = key
        }
    })
    return tokenList
}

export { getTokensByType, getTokenGroup, getTokenValue }
