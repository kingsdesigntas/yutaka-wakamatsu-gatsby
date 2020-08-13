/**
 * Take the return value from a link widget in CMS and output linkProps object either {a: "..."} or {to: "..."} with as="a" or {Link}
 */
import { Link } from "gatsby"

export default function mapLink(link) {
  const linkProps = {
    as: Link,
    to: "/",
  }
  let url
  if (link.url) {
    url = link.url
  } else if (link.collection && link.slug) {
    if (link.collection === "pages" || link.collection === "template_pages")
      url = `/${link.slug}`
    else url = `${link.collection}/${link.slug}`
  }

  if (link.collection === "template_pages" && link.slug === "index") {
    url = "/"
  }

  if (url) {
    if (url.charAt(0) === "#") {
      linkProps.as = "a"
    }
    if (
      url.substr(0, "http://".length) === "http://" ||
      url.substr(0, "https://".length) === "https://"
    ) {
      linkProps.as = "a"
    }
  }

  if (linkProps.as === "a") {
    linkProps.href = url
  } else {
    linkProps.to = url
  }
  return linkProps
}
