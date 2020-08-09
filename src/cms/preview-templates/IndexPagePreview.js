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
    return <IndexPageTemplate hero={hero} title={data.title} isPreview={true} />
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
