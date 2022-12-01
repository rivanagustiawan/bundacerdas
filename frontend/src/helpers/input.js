export function onlyNumber(event) {
  if (!/[0-9]/.test(event.key)) {
    return event.preventDefault()
  }
}
