import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    author?: string;
    canonicalUrl?: string; // Add canonical URL support
    type?: string;

}

const SEO = ({ title, description, keywords, author = "One Man Automation", canonicalUrl, type = "website" }: SEOProps) => {

    // Construct the full title
    const siteTitle = "OMA - One Man Automation";
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;


    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content={author} />
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}


            {/* Open Graph Metadata (for social sharing) */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}


            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default SEO;
