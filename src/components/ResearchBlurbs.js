import React from "react";
import PropTypes from "prop-types";

const ResearchBlurb = ({ gridItems, className }) => (
  <div className={`columns is-multiline research-blurbs ${className}`}>
    {gridItems.map((item) => (
      <div key={item.text} className="column is-4 mt-5">
        <section>
          <p className="research-blurb-header">
            <b>{item.title}</b>
          </p>
          <p className="research-blurb-text">{item.text}</p>
        </section>
      </div>
    ))}
  </div>
);

ResearchBlurb.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

export default ResearchBlurb;
