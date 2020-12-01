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
    <section className="section">
      <div className="container content">
        <h1>{title}</h1>
        <div className="contacts">
          <HTMLContent content={content} />
          <Social />
          <Map />
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
