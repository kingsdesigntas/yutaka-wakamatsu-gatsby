import CMS from "netlify-cms-app"
//import { renderToString } from "react-dom/server"
//import { renderStylesToString } from "emotion-server"
import withEmotion from "./with-emotion"
import React, { useEffect } from "react"

// import AboutPagePreview from "./preview-templates/AboutPagePreview"
// import BlogPostPreview from "./preview-templates/BlogPostPreview"
// import ProductPagePreview from "./preview-templates/ProductPagePreview"
import IndexPagePreview from "./preview-templates/IndexPagePreview"

CMS.registerPreviewTemplate("index", withEmotion(IndexPagePreview))
