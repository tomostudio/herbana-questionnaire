import Container from '../container'
import { RoundedButton } from '../utils/buttons'
import Heading from '../utils/heading'

const TextButtonComponent = () => {
  const subTitle = 'How many supplements do you take regularly?'
  return (
    <Container className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading title="About You" subTitle={subTitle} />
        <div className="w-full flex justify-center space-x-6">
          <RoundedButton destination="/">None</RoundedButton>
          <RoundedButton destination="/">1 to 3</RoundedButton>
          <RoundedButton destination="/">More than 3</RoundedButton>
        </div>
      </div>
    </Container>
  )
}

export default TextButtonComponent
