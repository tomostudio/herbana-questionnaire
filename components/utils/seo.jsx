const SEO = ({
  title = '',
  keywords = '',
  description = '',
  pageLink = '',
  image,
}) => {
  const pageTitle = `${title} | Herbana`

  const canonicalLink = `https://herbana-questionnaire.vercel.app${
    pageLink ? `${pageLink.startsWith('/') ? '' : '/'}${pageLink}` : ''
  }`
  return (
    <>
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalLink} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalLink} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </>
  )
}

export default SEO
