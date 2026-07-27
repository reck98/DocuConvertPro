export const BASE_URL = 'https://docuconvertpro.onrender.com';

export function updatePageMeta({
  title = 'DocuConvert Pro — 34-in-1 Open Source PDF Studio Suite | Merge, Convert, OCR & AI',
  description = 'DocuConvert Pro is a free and open-source 34-in-1 PDF Studio Suite for merging, splitting, compressing, converting, OCR, AI summarization, translation, PDF security, workflow automation, and more.',
  keywords = 'pdf tools, pdf converter, word to pdf, merge pdf, split pdf, compress pdf, ocr pdf, pdf to word, pdf security, ilovepdf alternative, open source pdf tools',
  slug = '',
  ogImage = `${BASE_URL}/og-image.png`
}) {
  const canonicalUrl = slug ? `${BASE_URL}/${slug}` : `${BASE_URL}/`;

  // Update Title
  document.title = title;

  // Helper to update/create meta tag
  const setMeta = (attr, attrValue, content) => {
    let element = document.querySelector(`meta[${attr}="${attrValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Helper to update/create link tag
  const setLink = (rel, href) => {
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
    }
    element.setAttribute('href', href);
  };

  setMeta('name', 'description', description);
  setMeta('name', 'keywords', keywords);
  setMeta('name', 'title', title);

  // Canonical URL
  setLink('canonical', canonicalUrl);

  // Open Graph
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:image', ogImage);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'DocuConvert Pro');

  // Twitter Cards
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', ogImage);
  setMeta('name', 'twitter:creator', '@reck98');
  setMeta('name', 'twitter:site', '@reck98');
}

export function injectSchemaJSONLD(schemaData, id = 'seo-schema') {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(schemaData);
}

export function getToolSchemas(tool) {
  const canonicalUrl = `${BASE_URL}/${tool.slug}`;

  // 1. SoftwareApplication Schema
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': `${tool.title} — DocuConvert Pro`,
    'operatingSystem': 'Any',
    'applicationCategory': 'BusinessApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'description': tool.seoDescription,
    'url': canonicalUrl,
    'author': {
      '@type': 'Organization',
      'name': 'DocuConvert Pro',
      'url': 'https://github.com/reck98/DocuConvertPro'
    }
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${BASE_URL}/`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': tool.category.toUpperCase(),
        'item': `${BASE_URL}/#${tool.category}`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': tool.title,
        'item': canonicalUrl
      }
    ]
  };

  // 3. FAQPage Schema
  const faqSchema = tool.faqs && tool.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': tool.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  } : null;

  return [appSchema, breadcrumbSchema, faqSchema].filter(Boolean);
}
