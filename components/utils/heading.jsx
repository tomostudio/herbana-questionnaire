const Heading = ({
  title,
  subTitle,
  position = 'text-center',
  subTitleSizeMobile = 'text-mheading1',
  marginSubtitle = true,
  classNameSubTitle = '',
  letterSpacing = false,
}) => {
  return (
    <>
      <span
        className={`text-subHeading text-orange font-bold uppercase mb-6 md:mb-9 tracking-default ${position}`}
      >
        {title}
      </span>
      <h1
        className={`${subTitleSizeMobile} ${classNameSubTitle} md:text-heading ${
          letterSpacing ? 'md:tracking-wider' : ''
        } font-maison font-bold leading-tight ${
          marginSubtitle ? 'mb-8' : 'm-0'
        }  whitespace-pre-wrap ${position}`}
      >
        {subTitle}
      </h1>
    </>
  )
}

export default Heading
