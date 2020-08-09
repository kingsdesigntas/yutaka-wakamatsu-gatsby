import React from "react"
import PropTypes from "prop-types"
import { WidgetPreviewContainer } from "netlify-cms-ui-default"

const LinkWidgetPreview = ({ value }) => (
  <WidgetPreviewContainer>
    <strong>Link</strong> - {value.title} :{" "}
    {value.object && value.object.label ? value.object.label : value.url}
  </WidgetPreviewContainer>
)

LinkWidgetPreview.propTypes = {
  value: PropTypes.node,
}

export default LinkWidgetPreview
