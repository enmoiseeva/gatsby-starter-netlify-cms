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
