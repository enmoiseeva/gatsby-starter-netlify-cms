import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import { HTMLContent } from "../components/Content";

export const PeoplePageTemplate = ({
  title,
  subtitle,
  image,
  header,
  header2,
  text2,
  content,
}) => {
  return (
    <section>
      <div className="header-section mb-5 ml-mobile-5">
        <div className="container">
          <h2 className="title is-size-1 has-text-weight-bold is-bold-light">
            {title}
          </h2>
          <HTMLContent content={subtitle} className="header-section-text" />
        </div>
      </div>
      <div className="container">
        <div className="padding-section">
          <div className="people-main">
            <h2 className="title is-size-4">{header}</h2>
            <div className="is-flex">
              <div className="people-main-image">
                <PreviewCompatibleImage imageInfo={image} />
              </div>
              <HTMLContent content={content} className="people-main-text" />
            </div>
          </div>

          <h2 className="title is-size-4 mt-5 pt-3">{header2}</h2>
          <HTMLContent
            content={text2}
            className="people-other-text mb-5 pb-5"
          />
        </div>
      </div>
    </section>
  );
};

PeoplePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  header: PropTypes.string,
  header2: PropTypes.string,
  text2: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.node,
};

const PeoplePage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <PeoplePageTemplate
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        header={post.frontmatter.header}
        header2={post.frontmatter.header2}
        text2={post.frontmatter.text2}
        image={post.frontmatter.image}
        content={post.html}
      />
    </Layout>
  );
};

PeoplePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default PeoplePage;

export const peoplePageQuery = graphql`
  query PeoplePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        subtitle
        image {
          childImageSharp {
            fluid(maxWidth: 180, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        header
        header2
        text2
      }
    }
  }
`;
