
const toISO = (timeStamp = Date.now()) => {
  return new Date(timeStamp - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString().slice(0, -5).split('T')
}
export default toISO
