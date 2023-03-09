import Image from 'next/image'
import Container from '../container'
import { RoundedFullButton } from '../utils/buttons'
import Heading from '../utils/heading'

const TitleComponent = () => {
  const subTitle = "LET'S TALK MORE \n ABOUT YOU"
  return (
    <Container className="w-full h-full flex justify-center items-center">
      <div className="relative w-fit flex flex-col items-center">
        <Heading title="ABOUT YOU" subTitle={subTitle} />
        <RoundedFullButton destination="/">LET'S GO</RoundedFullButton>
        <div className="absolute -left-[18%] md:left-auto md:right-full top-32 md:top-1/2 md:-translate-y-1/2">
          <div className="relative w-44 h-44 md:w-72 md:h-72">
            <Image
              src="/kunyit.png"
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
        <div className="absolute -right-[18%] md:right-auto md:left-full -top-32 md:top-1/2 md:-translate-y-1/2 rotate-180">
          <div className="relative w-44 h-44 md:w-72 md:h-72">
            <Image
              src="/kunyit.png"
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default TitleComponent
