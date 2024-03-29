import parse from 'html-react-parser';

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
        className={`text-subHeading text-orange font-bold uppercase mb-6 md:mb-9 tracking-default select-none ${position}`}
      >
        {title}
      </span>
      <h1
        className={`${subTitleSizeMobile} ${classNameSubTitle} md:text-heading select-none ${
          letterSpacing ? 'md:tracking-wider' : ''
        } font-maison font-bold leading-tight ${
          marginSubtitle ? 'mb-8' : 'mb-2'
        } ${position}`}
      >
        {parse(subTitle)}
      </h1>
    </>
  )
}

export default Heading
