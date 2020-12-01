import React from "react";
import PropTypes from "prop-types";
import { ContactsPageTemplate } from "../../templates/contacts-page";

const ContactsPagePreview = ({ entry, getAsset, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();
  if (data) {
    return (
      <ContactsPageTemplate content={widgetFor("body")} title={data.title} />
    );
  } else {
    return <div>Loading...</div>;
  }
};

ContactsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
  widgetFor: PropTypes.func,
};

export default ContactsPagePreview;
