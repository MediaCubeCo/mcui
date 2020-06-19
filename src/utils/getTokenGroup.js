import tokens from "../assets/tokens/tokens.json"

export default prefix => tokens.variables.filter(v => {
  const regExp = new RegExp(`^\\$${prefix}-`)
  return regExp.test(v.name)
})