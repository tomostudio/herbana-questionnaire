import Image from 'next/image'
import Container from '../container'
import { RoundedButton } from '../utils/buttons'
import Heading from '../utils/heading'

const TextImageComponent = () => {
  const subTitle = 'Have you taken herbal \nsupplements in the past?'
  return (
    <div className="w-full flex flex-col-reverse md:flex-row self-stretch">
      <Container className="w-full h-full flex flex-col md:flex-row items-end md:items-center">
        <div className='md:hidden w-full h-[50vh]' />
        <div className="w-full md:w-1/2 min-h-[50vh] md:h-full flex flex-col justify-center pt-10 pb-28 md:pt-0 md:pb-0 md:pr-8">
          <Heading
            title="About You"
            subTitle={subTitle}
            position="text-center md:text-left"
            subTitleSizeMobile="text-mheading1"
          />
          <div className="w-full flex justify-center md:justify-start space-x-6">
            <RoundedButton destination="/">Yes</RoundedButton>
            <RoundedButton destination="/">No</RoundedButton>
          </div>
        </div>
      </Container>
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-[50vh] md:h-full">
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
