import tokens from "../assets/tokens/tokens.json"

export default name => {
  const dataTokens = tokens.variables.find(v => v.name === `$token-${name}`)
  return dataTokens ? dataTokens.mapValue : []
}
