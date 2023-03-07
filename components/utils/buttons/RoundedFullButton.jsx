import { ArrowRight } from '../svg'
import DefaultButton from './DefaultButton'

const RoundedFullButton = ({
  children,
  className,
  icon = false,
  color= "text-black",
  bg= "bg-white",
  borderColor="border-black",
  ...others
}) => {
  return (
    <DefaultButton
      className={`py-3 px-6 min-w-[8rem] flex justify-center items-center text-center rounded-full ${bg} ${color} border ${borderColor} font-bold text-button ${className}`}
      {...others}
    >
      {children}
      {icon && <ArrowRight color={color} className="ml-3 pb-0.5 h-3.5" />}
    </DefaultButton>
  )
}

export default RoundedFullButton
