import PropTypes from 'prop-types';
import React from 'react';
import ExploreCard from './ExploreCard';

export const ExploreList = ({ userLists }) => {
  const renderExploreLists = userLists.map(
    ({ _id, username, headPhoto, description, company, salary, position }) => {
      return (
        <ExploreCard
          key={username}
          _id={_id}
          username={username}
          headPhoto={headPhoto}
          description={description}
          company={company}
          salary={salary}
          position={position}
        />
      );
    },
  );
  return <>{renderExploreLists}</>;
};

ExploreList.propTypes = {
  userLists: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        headPhoto: PropTypes.string,
        description: PropTypes.string,
        company: PropTypes.string,
        salary: PropTypes.string,
        position: PropTypes.string,
      }),
    ).isRequired,
  ]),
};

export default ExploreList;
