import React from "react";
import PropTypes from "prop-types";
import { PeoplePageTemplate } from "../../templates/people-page";

const PeoplePagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();

  if (data) {
    return (
      <PeoplePageTemplate
        title={data.title}
        subtitle={data.subtitle}
        header={data.header}
        header2={data.header2}
        image={getAsset(data.image)}
        content={getAsset("body")}
        blurbs={data.blurbs || []}
        header_block2={data.header_block2}
        image_block2={getAsset(data.image_block2)}
        text_block2={data.text_block2}
        header_block3={data.header_block3}
        image_block3={getAsset(data.image_block3)}
        text_block3={data.text_block3}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

PeoplePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default PeoplePagePreview;
