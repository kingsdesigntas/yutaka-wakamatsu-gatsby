import CMS from "netlify-cms-app"

import withEmotion from "./with-emotion"

import LinkWidgetControl from "./LinkWidget/LinkWidgetControl"
import LinkWidgetPreview from "./LinkWidget/LinkWidgetPreview"
import linkWidgetSchema from "./LinkWidget/schema"

import IndexPagePreview from "./preview-templates/IndexPagePreview"
import PagePreview from "./preview-templates/PagePreview"

//CMS.registerPreviewTemplate("index", withEmotion(IndexPagePreview))
CMS.registerPreviewTemplate("pages", withEmotion(PagePreview))

CMS.registerWidget(
  "link",
  LinkWidgetControl,
  LinkWidgetPreview,
  linkWidgetSchema
)
//CMS.registerWidget(LinkWidget)
