import React from 'react';
import PropTypes from 'prop-types';
import { List, Grid } from 'antd-mobile';

export default function ProfileHeads({ iconSelected = null, setHeader }) {
  const headPhotos = [];
  for (let i = 1; i <= 20; i++) {
    let icon = require(`../../assets/heads/头像${i}.png`).default;
    headPhotos.push({
      text: '头像' + i,
      icon: icon,
    });
  }

  // reference name come from ant mobile docs, (el: Object, index: number): void
  // this is a ant mobile components' handleClick()
  const handleClick = ({ text }) => {
    setHeader(text);
  };

  const listTitle = !iconSelected ? (
    'Please select one'
  ) : (
    <div>
      Have chose this:
      <img
        src={require(`../../assets/heads/${iconSelected}.png`).default}
        alt="headPhoto"
      />
    </div>
  );

  return (
    <div>
      <List renderHeader={() => listTitle}>
        <Grid
          data={headPhotos} // Array<{icon, text}>
          columnNum={5}
          onClick={handleClick} // (el: Object, index: number): void
        ></Grid>
      </List>
    </div>
  );
}

ProfileHeads.propTypes = {
  iconSelected: PropTypes.string.isRequired,
  setHeader: PropTypes.func.isRequired,
};
