import Image from 'next/image'
import Container from '../container'
import { RoundedButton } from '../utils/buttons'
import Heading from '../utils/heading'

const TextImageComponent = () => {
  const subTitle = 'Have you taken herbal \nsupplements in the past?'
  return (
    <div className="w-full flex self-stretch">
      <div className="w-1/2 flex flex-col justify-center">
        <Heading title="About You" subTitle={subTitle} position="text-left" />
        <div className="w-full flex justify-start space-x-6">
          <RoundedButton destination="/">Yes</RoundedButton>
          <RoundedButton destination="/">No</RoundedButton>
        </div>
      </div>
      <div className="relative w-1/2">
        <Image
          src="/image1.png"
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  )
}

export default TextImageComponent
