import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import { Social } from "../components/Social";
import { Map } from "../components/Map";

export const ContactsPageTemplate = ({ content, title }) => {
  return (
    <section>
      <div className="header-section mb-5 ml-mobile-5">
        <div className="container">
          <h2 className="title is-size-1 has-text-weight-bold is-bold-light">
            {title}
          </h2>
          <HTMLContent content={" "} className="header-section-text" />
        </div>
      </div>
      <div className="container content">
        <div className="padding-section">
          <div className="contacts mb-5 pb-5 mt-4">
            <HTMLContent content={content} />
            <Social />
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
};

ContactsPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

const ContactsPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ContactsPageTemplate
        content={post.html}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

ContactsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ContactsPage;

export const pageQuery = graphql`
  query ContactsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;
