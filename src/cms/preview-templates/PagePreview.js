import React, { useEffect, useState, useCallback } from "react"
import PropTypes from "prop-types"
import PageTemplate from "../../templates/PageTemplate"
import parseMarkdown from "../../lib/parseMarkdown"

const PagePreview = ({ entry, getAsset }) => {
  const getEntry = useCallback(() => entry.getIn(["data"]).toJS(), [entry])
  const [data, setData] = useState(getEntry())

  const parseMarkdownFields = useCallback(async () => {
    if (data?.content) {
      const content = await parseMarkdown(data.content)
      setData(_data => {
        _data.content = content
        return _data
      })
    }
  }, [data])

  const loadData = useCallback(() => {
    setData(getEntry())
    parseMarkdownFields()
  }, [getEntry, parseMarkdownFields])

  useEffect(() => {
    loadData()
  }, [])

  //image={getAsset(data.image)}
  if (data) {
    return (
      <PageTemplate
        title={data.title}
        description={data.description}
        content={data.content}
        isPreview={true}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

PagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default PagePreview
