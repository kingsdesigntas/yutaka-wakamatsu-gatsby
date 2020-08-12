export const customEvent = (el, name, data) => {
  if (window.CustomEvent && typeof window.CustomEvent === "function") {
    var event = new CustomEvent(name, { detail: data })
  } else {
    var event = document.createEvent("CustomEvent")
    event.initCustomEvent(name, true, true, data)
  }

  el.dispatchEvent(event)
}
