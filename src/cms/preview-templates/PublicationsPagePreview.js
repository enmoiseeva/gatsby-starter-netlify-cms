import React from "react";
import PropTypes from "prop-types";
import { PublicationsPageTemplate } from "../../templates/publications-page";

const PublicationsPagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();
  if (data) {
    return (
      <PublicationsPageTemplate content={widgetFor('body')} title={data.title} />
    );
  } else {
    return <div>Loading...</div>;
  }
};

PublicationsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
  widgetFor: PropTypes.func,
};

export default PublicationsPagePreview;
