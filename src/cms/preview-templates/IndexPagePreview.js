import React, { useEffect, useState, useCallback } from "react"
import PropTypes from "prop-types"
import IndexPageTemplate from "../../templates/IndexPageTemplate"
import parseMarkdown from "../../lib/parseMarkdown"

const IndexPagePreview = ({ entry, getAsset }) => {
  const getEntry = useCallback(() => entry.getIn(["data"]).toJS(), [entry])
  const [data, setData] = useState(getEntry())

  console.log({ data })

  const parseMarkdownFields = useCallback(async () => {
    if (data?.main?.content) {
      const content = await parseMarkdown(data.main.content)
      setData(_data => {
        _data.main.content = content
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
    const hero = data?.hero
      ? {
          ...data.hero,
          image: getAsset(data.hero.image),
        }
      : {}

    const main = data?.main
      ? { ...data.main, image: getAsset(data.main.image) }
      : {}

    const sections = data?.sections
      ? data.sections.map(section => {
          const _section = { ...section }
          _section.image = section.image ? getAsset(section.image) : null
          return _section
        })
      : []

    return (
      <IndexPageTemplate
        hero={hero}
        title={data.title}
        description={data.description}
        main={main}
        sections={sections}
        isPreview={true}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
