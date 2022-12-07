import React from 'react'
import PropTypes from 'prop-types'
import Img from './Img';

function HeadPhoto({ photoName }) {
  const DEFAULT_PHOTO = "头像1";
  photoName = photoName? photoName : DEFAULT_PHOTO;
  return (
    <Img
      src={require(`../../assets/heads/${photoName}.png`).default}
      className="spe am-icon am-icon-md"
      alt="headPhoto"
    />
  )
}

HeadPhoto.propTypes = {
  photoName: PropTypes.string,
}

export default HeadPhoto
