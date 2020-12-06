import React from "react";
import PropTypes from "prop-types";

const StudentBlurb = ({ gridItems, className }) => (
  <div className={`index-news student-news  ${className}`}>
    {gridItems.map((item) => (
      <div key={item.text} className="columns">
        <div className="column column-date">{item.title}</div>
        <div className="column">{item.text}</div>
      </div>
    ))}
  </div>
);

StudentBlurb.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

export default StudentBlurb;
