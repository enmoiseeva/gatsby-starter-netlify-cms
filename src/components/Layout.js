import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import useSiteMetadata from "./SiteMetadata";

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
         <script async src="/bsky-embed.js" charset="utf-8"></script>
      </Helmet>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default TemplateWrapper;
