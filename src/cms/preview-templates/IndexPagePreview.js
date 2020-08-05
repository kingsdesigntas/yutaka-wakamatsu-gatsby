import React from "react"
import PropTypes from "prop-types"
import IndexPageTemplate from "../../templates/IndexPageTemplate"

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS()

  console.log({ data })

  //image={getAsset(data.image)}
  if (data) {
    console.log("hero: ", getAsset(data.hero.image))
    const hero = data?.hero
      ? {
          image: getAsset(data.hero.image),
        }
      : {}
    return <IndexPageTemplate hero={hero} isPreview={true} />
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
