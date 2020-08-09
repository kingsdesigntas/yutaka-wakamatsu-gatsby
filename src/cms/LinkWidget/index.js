import controlComponent from "./LinkWidgetControl"
import previewComponent from "./LinkWidgetPreview"
import schema from "./schema"

const Widget = (opts = {}) => ({
  name: "link",
  controlComponent,
  previewComponent,
  schema,
  ...opts,
})

export const NetlifyCmsWidgetRelation = {
  Widget,
  controlComponent,
  previewComponent,
}
export default NetlifyCmsWidgetRelation
