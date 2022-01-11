import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import ResearchBlurb from "../components/ResearchBlurbs";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import { HTMLContent } from "../components/Content";

export const AboutPageTemplate = ({
  title,
  subtitle,
  blurbs_one,
  blurbs_two,
  image,
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
        <ResearchBlurb gridItems={blurbs_one.blurbs} className="mb-5" />
        <div className="columns is-multiline is-align-items-center research-blurbs">
          <div className="column is-4">
            <p className=" mb-4 pt-3 has-text-weight-bold">Funding:</p>
            <img src="/img/funding.jpg" alt="" />
          </div>
          <div className="column is-8">
            <PreviewCompatibleImage
              imageInfo={{ ...image, style: { maxWidth: "600px" } }}
            />
          </div>
        </div>
        <ResearchBlurb
          gridItems={blurbs_two.blurbs}
          className="bigger-headers mt-3 pb-5 mb-5"
        />
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  blurbs_one: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  blurbs_two: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        blurbs_one={post.frontmatter.blurbs_one}
        blurbs_two={post.frontmatter.blurbs_two}
        image={post.frontmatter.image}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        subtitle
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        blurbs_one {
          blurbs {
            title
            text
          }
        }
        blurbs_two {
          blurbs {
            title
            text
          }
        }
      }
    }
  }
`;
