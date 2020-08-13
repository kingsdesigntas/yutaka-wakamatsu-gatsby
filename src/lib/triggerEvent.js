export const customEvent = (el, name, data) => {
  var event
  if (window.CustomEvent && typeof window.CustomEvent === "function") {
    event = new CustomEvent(name, { detail: data })
  } else {
    event = document.createEvent("CustomEvent")
    event.initCustomEvent(name, true, true, data)
  }

  el.dispatchEvent(event)
}
