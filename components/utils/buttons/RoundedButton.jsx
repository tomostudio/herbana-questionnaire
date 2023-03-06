import DefaultButton from './DefaultButton'

const RoundedButton = ({ children, className, ...others }) => {
  return (
    <DefaultButton
      className={`py-3 px-6 min-w-[15rem] text-center rounded-xl bg-white border border-black text-[1.25rem] text-black ${className}`}
      {...others}
    >
      {children}
    </DefaultButton>
  )
}

export default RoundedButton