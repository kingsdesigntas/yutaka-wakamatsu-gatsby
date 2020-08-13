import React from "react"
import PropTypes from "prop-types"
import { WidgetPreviewContainer } from "netlify-cms-ui-default"
import { Map } from "immutable"

const LinkWidgetPreview = ({ value, entry, ...props }) => {
  if (!value) return <WidgetPreviewContainer></WidgetPreviewContainer>
  return (
    <WidgetPreviewContainer>
      {value.url ? (
        <span>
          <strong>{value.title}</strong> <em>{value.url}</em>
        </span>
      ) : (
        <span>
          {value.label === value.title ? (
            <strong>{value.title}</strong>
          ) : (
            <span>
              <strong>{value.title}</strong> <em>{value.label}</em>
            </span>
          )}
        </span>
      )}
    </WidgetPreviewContainer>
  )
}

LinkWidgetPreview.propTypes = {
  value: PropTypes.node,
}

export default LinkWidgetPreview
