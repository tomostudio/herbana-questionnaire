import Image from 'next/image'
import Container from '../container'
import { RoundedFullButton } from '../utils/buttons'
import Heading from '../utils/heading'

const TitleComponent = () => {
  const subTitle = "LET'S TALK MORE \n ABOUT YOU"
  return (
    <Container className="w-full h-full flex justify-center items-center">
      <div className="relative w-full max-w-3xl flex flex-col items-center">
        <Heading title="ABOUT YOU" subTitle={subTitle} />
        <RoundedFullButton destination="/">LET'S GO</RoundedFullButton>
        <div className="absolute right-full top-0">
          <div className="relative w-96 h-72">
            <Image
              src="/kunyit.png"
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
        <div className="absolute left-full top-0 rotate-180">
          <div className="relative w-96 h-72">
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
