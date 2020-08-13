/**
 * Convert a string phone number to a tel link
 */

export default function phoneToLink(phoneString = "") {
  return `${phoneString.replace(/\s+/, "")}`
}
