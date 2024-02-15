import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, withPrefix } from "gatsby";

import Layout from "../components/Layout";
import NewsRoll from "../components/NewsRoll";

export const IndexPageTemplate = ({ image, title, subheading }) => (
  <div className="main-intro">
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
      }}
    >
      <div className="is-flex-tablet container">
        <div className="main-intro-logo mr-5 pr-5">
          <img src={`${withPrefix("/")}img/pitt-logo.png`} width="153" alt="" />
          <img
            src={`${withPrefix("/")}img/taltech-logo.png`}
            width="153"
            alt=""
          />
        </div>
        <div className="is-flex is-justify-content-center is-align-items-flex-start is-flex-direction-column">
          <h1 className="has-text-weight-bold is-size-5-mobile is-size-4-tablet is-size-3-widescreen mb-5">
            {title}
          </h1>
          <h3 className="has-text-weight-bold is-size-7-mobile is-size-6-tablet is-size-5-widescreen">
            {subheading}
          </h3>
        </div>
      </div>
    </div>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="index-news column">
            <h1>News.</h1>
            <NewsRoll />
          </div>
          <div className="index-twitter column is-one-quarter">
            <a
              className="twitter-timeline"
              href="https://twitter.com/Tat1anaMoiseeva?ref_src=twsrc%5Etfw"
            >
              Tweets by Tat1anaMoiseeva
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
      }
    }
  }
`;
