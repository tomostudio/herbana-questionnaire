import { ArrowRight } from '../svg'
import DefaultButton from './DefaultButton'

const RoundedFullButton = ({
  children,
  className,
  icon = false,
  color = 'text-black',
  bg = 'bg-white',
  borderColor = 'border-black',
  borderHover = 'hover:border-orange',
  hoverTextIcon = '',
  ...others
}) => {
  return (
    <DefaultButton
      hover={false}
      className={`py-3 px-6 min-w-[8rem] ${borderHover} ${hoverTextIcon} transition-all duration-300 flex justify-center items-center text-center rounded-full ${bg} ${color} border md:border-default ${borderColor} font-bold text-mButton md:text-button ${className}`}
      {...others}
    >
      {children}
      {icon && <ArrowRight color={color} className="ml-3 pb-0.5 h-3.5" />}
    </DefaultButton>
  )
}

export default RoundedFullButton
