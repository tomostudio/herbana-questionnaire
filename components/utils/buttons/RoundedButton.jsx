import DefaultButton from './DefaultButton'

const RoundedButton = ({ children, className, heightFit = false, ...others }) => {
  return (
    <DefaultButton
      hover={false}
      className={`${heightFit ? 'h-fit' : 'h-auto'} py-3 md:py-4 px-6 md:px-4 w-[135px] md:w-[206px] hover:border-orange transition-all duration-300 flex justify-center items-center text-center rounded-xl bg-white border md:border-default border-black text-mButton md:text-[1.25rem] text-black ${className}`}
      {...others}
    >
      <span>{children}</span>
    </DefaultButton>
  )
}

export default RoundedButton
