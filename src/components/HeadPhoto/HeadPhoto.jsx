import React from 'react'
import PropTypes from 'prop-types'
const DEFAULT_PHOTO = "头像1";

function HeadPhoto({ photoName = DEFAULT_PHOTO}) {
  return (
    <img
      src={require(`../../assets/heads/${photoName}.png`).default}
      className="spe am-icon am-icon-md"
      alt="headPhoto"
      style={{ width: 60, height: 60 }}
    />
  )
}

HeadPhoto.propTypes = {
  photoName: PropTypes.string,
}

export default HeadPhoto
