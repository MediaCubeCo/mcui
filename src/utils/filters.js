import numeral from "numeral"

export const number = (value, decimals = 2) => {
  if (value == null) return null

  let deciamlsString = "".padStart(decimals, "0")

  return numeral(value)
    .format("0,0." + deciamlsString)
    .replace(/,/g, " ")
}
