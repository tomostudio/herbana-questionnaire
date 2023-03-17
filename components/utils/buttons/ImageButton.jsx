import Image from 'next/image'
import DefaultButton from './DefaultButton'

const ImageButton = ({
  children,
  className,
  src,
  fill = true,
  style = {
    objectFit: 'contain',
  },
  icon = true,
  height = 0,
  width = 0,
  ...others
}) => {
  return (
    <DefaultButton
      hover={false}
      className={`${
        icon ? 'w-[117px] md:w-[150px]' : 'w-[131px] md:w-[205px]'
      }  text-center bg-white rounded-lg hover:border-orange transition-all duration-300 border-default border-black text-black text-mButton md:text-body ${className}`}
      {...others}
    >
      <div className="relative flex flex-col w-full h-full">
        <div
          className={`relative overflow-hidden ${
            icon
              ? 'h-[125px]'
              : 'h-[125px] md:h-[180px] hover:border-orange transition-all duration-300 border-b-default border-black'
          } rounded-t-lg flex justify-center items-center`}
        >
          {fill ? (
            <Image src={src} fill={fill} style={style} />
          ) : (
            <Image
              src={src}
              fill={fill}
              height={height}
              width={width}
              style={style}
            />
          )}
        </div>
        <div
          className={`pb-4 ${
            icon ? 'px-4 md:px-3' : 'px-6 md:px-12 pt-4'
          } w-full text-center grow flex justify-center items-center`}
        >
          <span>{children}</span>
        </div>
      </div>
    </DefaultButton>
  )
}

export default ImageButton
