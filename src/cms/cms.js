import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import NewsPostPreview from "./preview-templates/NewsPostPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import ContactsPagePreview from "./preview-templates/ContactsPagePreview";
import PublicationsPagePreview from "./preview-templates/PublicationsPagePreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("research", AboutPagePreview);
CMS.registerPreviewTemplate("news", NewsPostPreview);
CMS.registerPreviewTemplate("contacts", ContactsPagePreview);
CMS.registerPreviewTemplate("publications", PublicationsPagePreview);
