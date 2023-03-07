import Container from '../container'
import { BorderButton } from '../utils/buttons'
import Heading from '../utils/heading'

const NameComponent = () => {
  return (
    <Container className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <Heading title="LET'S GET TO KNOW YOU" subTitle="What's your name?" />
        <input
          type="text"
          placeholder="TYPE YOUR NAME HERE"
          className="w-full mb-12 placeholder:text-black placeholder:opacity-50 text-center border py-4 border-black rounded-lg"
        />
        <BorderButton destination="/">CONTINUE</BorderButton>
      </div>
    </Container>
  )
}

export default NameComponent
