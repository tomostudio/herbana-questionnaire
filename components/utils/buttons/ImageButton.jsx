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
      className={`w-fit text-center bg-white rounded-lg border border-black text-black ${className}`}
      {...others}
    >
      <div className="relative flex flex-col w-full">
        <div
          className={`relative overflow-hidden ${
            icon ? 'h-[125px]' : 'h-[180px] border-b border-black'
          } rounded-t-lg flex justify-center items-center h-[125px]`}
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
        <div className={`pb-3 ${icon ? 'px-7' : 'px-14 pt-3'} w-full text-center`}>{children}</div>
      </div>
    </DefaultButton>
  )
}

export default ImageButton
