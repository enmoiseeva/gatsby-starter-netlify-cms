import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import { HTMLContent } from "../components/Content";
import StudentBlurb from "../components/StudentBlurbs";

export const PeoplePageTemplate = ({
  title,
  subtitle,
  image,
  header,
  header2,
  content,
  blurbs,
  header_block2,
  image_block2,
  text_block2,
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
                <PreviewCompatibleImage imageInfo={{ image }} />
              </div>
              <HTMLContent content={content} className="people-main-text" />
            </div>
          </div>
          <div className="people-main mt-5 pb-5 pt-3">
            <h2 className="title is-size-4">{header_block2}</h2>
            <div className="is-flex">
              <div className="people-main-image">
                <PreviewCompatibleImage imageInfo={{ image: image_block2 }} />
              </div>
              <HTMLContent content={text_block2} className="people-main-text" />
            </div>
          </div>

          <h2 className="title is-size-4  pt-3">{header2}</h2>
          <StudentBlurb
            gridItems={blurbs}
            className="bigger-headers mt-3 pb-5 mb-5"
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
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.node,
  blurbs: PropTypes.array,
  header_block2: PropTypes.string,
  image_block2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  text_block2: PropTypes.string,
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
        image={post.frontmatter.image}
        blurbs={post.frontmatter.blurbs}
        content={post.html}
        header_block2={post.frontmatter.header_block2}
        image_block2={post.frontmatter.image_block2}
        text_block2={post.frontmatter.text_block2}
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
        blurbs {
          title
          text
        }
        header
        header2
        header_block2
        image_block2 {
          childImageSharp {
            fluid(maxWidth: 180, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        text_block2
      }
    }
  }
`;
