export function generateStructuredData(data: any) {
  return {
    '@context': 'https://schema.org',
    ...data,
  };
}

export function generateOpenGraphTags(title: string, description: string, image?: string) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export function generateMetaTags(title: string, description: string, keywords?: string[]) {
  return {
    title,
    description,
    keywords: keywords?.join(', '),
    robots: 'index, follow',
    googlebot: 'index, follow',
  };
}
