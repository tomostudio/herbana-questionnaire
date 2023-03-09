const Heading = ({
  title,
  subTitle,
  position = 'text-center',
  subTitleSizeMobile = 'text-mheading',
  classNameSubTitle = '',
}) => {
  return (
    <>
      <span
        className={`text-subHeading text-orange font-bold uppercase mb-6 md:mb-9 ${position}`}
      >
        {title}
      </span>
      <h1
        className={`${subTitleSizeMobile} ${classNameSubTitle} md:text-heading tracking-tighter font-maisonMono font-bold leading-tight mb-6 md:mb-7 whitespace-pre-wrap ${position}`}
      >
        {subTitle}
      </h1>
    </>
  )
}

export default Heading
