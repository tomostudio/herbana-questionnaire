const Heading = ({ title, subTitle, position = 'text-center' }) => {
  return (
    <>
      <span
        className={`text-subHeading text-orange font-bold uppercase mb-9 ${position}`}
      >
        {title}
      </span>
      <h1
        className={`text-heading font-maisonMono font-bold leading-tight mb-7 whitespace-pre-wrap ${position}`}
      >
        {subTitle}
      </h1>
    </>
  )
}

export default Heading
