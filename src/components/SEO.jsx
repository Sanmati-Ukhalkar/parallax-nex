import React, { useEffect } from 'react';

export default function SEO() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Parallax Global",
      "url": "https://parallaxglobal.it",
      "logo": "https://parallaxglobal.it/favicon.png",
      "description": "Premium digital design, custom software development, IT services, and virtual reality experiences. Grow your startup venture with our design-driven engineering.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Chandwad",
        "addressLocality": "Nashik",
        "addressRegion": "Maharashtra",
        "postalCode": "423101",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "parallaxglobal.it@gmail.com"
      },
      "sameAs": [
        "https://github.com/Sanmati-Ukhalkar/parallax-nex"
      ]
    };

    // Remove any existing script tag just in case
    const oldScript = document.getElementById('jsonld-seo');
    if (oldScript) {
      oldScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'jsonld-seo';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('jsonld-seo');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
