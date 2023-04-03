import DefaultButton from './DefaultButton'

const BorderButton = ({ children, className, ...others }) => {
  return (
    <DefaultButton
      className={`w-fit text-center tracking-default bg-transparent border-b-4 border-orange md:font-bold text-[1.25rem] text-black ${className}`}
      {...others}
    >
      {children}
    </DefaultButton>
  )
}

export default BorderButton
