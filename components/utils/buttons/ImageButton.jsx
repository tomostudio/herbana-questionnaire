import Image from 'next/image'
import DefaultButton from './DefaultButton'

const ImageButton = ({
  children,
  className,
  src,
  src2,
  pickup = false,
  icon = true,
  heightFit = false,
  height = 0,
  width = 0,
  ...others
}) => {
  return (
    <DefaultButton
      hover={false}
      className={`${
        icon ? 'w-[117px] md:w-[150px]' : 'w-[131px] md:w-[205px]'
      } ${heightFit ? 'h-fit' : 'h-auto'} overflow-hidden text-center bg-white rounded-lg hover:border-orange transition-all duration-500 border md:border-default border-black text-black text-mButton md:text-body ${className}`}
      {...others}
    >
      <div className="relative flex flex-col w-full h-full">
        <div
          className={`relative ${
            icon
              ? 'h-[125px]'
              : 'h-[125px] md:h-[180px] hover:border-orange transition-all duration-300 border-b md:border-b-default border-black'
          } flex justify-center items-center imgContainer`}
        >
          {icon ? (
            pickup ? (
              <>
                <Image
                  src={src}
                  fill={false}
                  height={height}
                  width={width}
                  style={{
                    objectFit: 'contain',
                  }}
                  loading='eager'
                />
                <Image
                  src={src2}
                  fill={false}
                  height={height}
                  width={width}
                  style={{
                    objectFit: 'contain',
                  }}
                  loading='eager'
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
                />
              </>
            ) : (
              <Image
                src={src}
                fill={false}
                height={height}
                width={width}
                style={{
                  objectFit: 'contain',
                }}
              />
            )
          ) : (
            <Image
              src={src}
              fill={true}
              style={{
                objectFit: 'cover',
              }}
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
