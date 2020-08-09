import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import IndexPageTemplate from "../../templates/IndexPageTemplate"
import parseMarkdown from "../../lib/parseMarkdown"

const IndexPagePreview = ({ entry, getAsset }) => {
  const getEntry = () => entry.getIn(["data"]).toJS()
  const [data, setData] = useState(getEntry())

  console.log({ data })

  useEffect(() => {
    setData(getEntry())
    parseMarkdownFields()
  }, [entry])

  const parseMarkdownFields = async () => {
    if (data?.main?.content) {
      const content = await parseMarkdown(data.main.content)
      setData(_data => {
        _data.main.content = content
        return _data
      })
    }
  }

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

    const sections = (data?.sections ? data.sections : []).map(section => {
      section.image = section.image ? getAsset(section.image) : null
      return section
    })

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
