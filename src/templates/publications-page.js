import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";

export const PublicationsPageTemplate = ({ title, content }) => {
  const [publications, setPublications] = useState(null);
  const getPublications = () => {
    //From "http://www.alexhadik.com/blog/2014/6/12/create-pubmed-citations-automatically-using-pubmed-api" adapted from reply to blog post by Les Ansley

    var HTMLpublication =
      '%authors% (<b>%date%</b>) \'%title%\' <i>%journal%</i>, %volume% %issue%%pages%PMID:<a href="%data%"target="_blank"> %PMID% </a></br></br>'; //Formats output

    var publications, idStringList;
    var pubmedSearchAPI =
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?";
    var pubmedSummaryAPI =
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?";
    var database = "db=pubmed";
    var returnmode = "&retmode=json";
    var returnmax = "&retmax=100";
    var searchterm =
      "&term=Moiseeva[Author] AND (Bakkenist[Author] or Barlev[author] or konstantinova[author]))";
    var returntype = "&rettype=abstract";
    var idURL =
      pubmedSearchAPI + database + returnmode + returnmax + searchterm;

    var getPubmed = function (url) {
      //passed url
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.responseType = "json";
        xhr.onload = function () {
          var status = xhr.status;
          if (status === 200) {
            //status 200 signifies OK (http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp)
            resolve(xhr.response);
          } else {
            reject(status);
          }
        };
        xhr.send();
      });
    };
    getPubmed(idURL).then(
      function (data) {
        var idList = data.esearchresult.idlist;
        idStringList = idList.toString(); //converts the idlist to a string to be appended to the search url
        idStringList = "&id=" + idStringList;
        const summaryURL =
          pubmedSummaryAPI + database + returnmode + returntype + idStringList;
        getPubmed(summaryURL).then(
          function (summary) {
            publications = formatReferences(summary);
            console.log("publications", publications);
            setPublications(publications);
          },
          function (status) {
            publications = "Something went wrong getting the ids.";
          }
        );
      },
      function (status) {
        publications = "Something went wrong getting the ids.";
      }
    );

    function formatReferences(summary) {
      var publicationList = "";
      for (let refs in summary.result) {
        if (refs !== "uids") {
          var authors = "";
          var publication = "";
          var authorCount = summary.result[refs].authors.length;
          var i = 0;
          while (i < authorCount - 1) {
            authors += summary.result[refs].authors[i].name + ", ";
            i++;
          }
          publication = HTMLpublication.replace(
            "%data%",
            "http://www.ncbi.nlm.nih.gov/pubmed/" + refs
          );
          authors += summary.result[refs].lastauthor;
          publication = publication.replace("%authors%", authors);
          publication = publication.replace(
            "%title%",
            summary.result[refs].title
          );
          publication = publication.replace(
            "%journal%",
            summary.result[refs].source
          );
          publication = publication.replace("%PMID%", summary.result[refs].uid);
          //Alter formatting if article is In Press
          if (summary.result[refs].volume !== "") {
            publication = publication.replace(
              "%volume%",
              " " + summary.result[refs].volume
            );
            publication = publication.replace(
              "%issue%",
              "(" + summary.result[refs].issue + ")"
            );
            publication = publication.replace(
              "%pages%",
              ": " + summary.result[refs].pages + ". "
            );
            var date = summary.result[refs].pubdate.slice(0, 4);
            publication = publication.replace("%date%", date + "");
          } else {
            publication = publication.replace("%volume%", " In Press");
            publication = publication.replace("%issue%", ".");
            publication = publication.replace("%pages%", "");
            publication = publication.replace("%date%", "");
          }
          publicationList = publication + publicationList;
        }
      }
      return publicationList;
    }
  };

  useEffect(() => {
    getPublications();
  }, []);

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
      <div className="container">
        <div className="padding-section">
          <div className="title is-size-3 mb-0">
            <HTMLContent content={content} />
          </div>
          <div className="mb-4">
            <b>
              For conference publications and citations please use{" "}
              <a href="https://scholar.google.com/citations?hl=en&user=NtQe0-MAAAAJ&view_op=list_works&sortby=pubdate">
                Google Scholar
              </a>
            </b>
          </div>
          <HTMLContent content={publications} className="pb-5 mb-5" />
        </div>
      </div>
    </section>
  );
};

PublicationsPageTemplate.propTypes = {
  content: PropTypes.node,
  title: PropTypes.string.isRequired,
};

const PublicationsPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <PublicationsPageTemplate
        content={post.html}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

PublicationsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default PublicationsPage;

export const peoplePageQuery = graphql`
  query PublicationsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;
