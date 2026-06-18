import { useEffect } from 'react';

const useSEO = ({ title, description, ogType = 'website', ogImage, schema }) => {
  useEffect(() => {
    // 1. Set document title
    const formattedTitle = title ? `${title} | ReviewHub` : 'ReviewHub - Meta Glasses Reviews';
    document.title = formattedTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (attrName, attrVal, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    // 2. Set Meta Description
    if (description) {
      updateMetaTag('name', 'description', description);
      updateMetaTag('property', 'og:description', description);
      updateMetaTag('name', 'twitter:description', description);
    }

    // 3. Set Open Graph & Twitter Tags
    updateMetaTag('property', 'og:title', formattedTitle);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('name', 'twitter:title', formattedTitle);
    updateMetaTag('name', 'twitter:card', ogImage ? 'summary_large_image' : 'summary');

    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage);
      updateMetaTag('name', 'twitter:image', ogImage);
    }

    // 4. Schema.org Structured Data
    let schemaScript = document.getElementById('seo-structured-data');
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schema) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'seo-structured-data';
      schemaScript.type = 'application/ld+json';
      schemaScript.innerHTML = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Clean up schema on unmount
      const scriptToClean = document.getElementById('seo-structured-data');
      if (scriptToClean) {
        scriptToClean.remove();
      }
    };
  }, [title, description, ogType, ogImage, schema]);
};

export default useSEO;
