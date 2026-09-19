import { useEffect } from "react";

const SEO = ({
  title,
  description,
  canonical,
  image = "/images/ssd-logo.png",
}) => {
  useEffect(() => {
    document.title = title;

    const updateMeta = (attribute, key, content) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const updateCanonical = (url) => {
      let element = document.head.querySelector(
        'link[rel="canonical"]'
      );

      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", "canonical");
        
        document.head.appendChild(element);
      }

      element.setAttribute("href", url);
    };

    updateMeta("name", "description", description);

    updateMeta("property", "og:title", title);
    updateMeta("property", "og:description", description);
    updateMeta("property", "og:url", canonical);
    updateMeta("property", "og:image", image);

    updateMeta("name", "twitter:title", title);
    updateMeta("name", "twitter:description", description);
    updateMeta("name", "twitter:image", image);

    updateCanonical(canonical);
  }, [title, description, canonical, image]);

  return null;
};

export default SEO;