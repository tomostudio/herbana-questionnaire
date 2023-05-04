import Image from 'next/image'
import DefaultButton from './DefaultButton'

const ImageButton = ({
  children,
  className,
  src,
  src2,
  fill = true,
  style = {
    objectFit: 'contain',
  },
  pickup = false,
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
      } overflow-hidden text-center bg-white rounded-lg hover:border-orange transition-all duration-300 border-default border-black text-black text-mButton md:text-body ${className}`}
      {...others}
    >
      <div className="relative flex flex-col w-full h-full">
        <div
          className={`relative ${
            icon
              ? 'h-[125px]'
              : 'h-[125px] md:h-[180px] hover:border-orange transition-all duration-300 border-b-default border-black'
          } flex justify-center items-center imgContainer`}
        >
          {fill ? (
            <Image src={src} fill={fill} style={style} />
          ) : pickup ? (
            <>
              <Image
                src={src}
                fill={fill}
                height={height}
                width={width}
                style={style}
              />
              <Image
                src={src2}
                fill={fill}
                height={height}
                width={width}
                style={style}
                className="hidden"
              />
            </>
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
