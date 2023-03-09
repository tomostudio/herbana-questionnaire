import Container from '../container'
import { RoundedButton } from '../utils/buttons'
import Heading from '../utils/heading'

const TextButtonComponent = () => {
  const subTitle = 'How many supplements do you take regularly?'
  return (
    <Container className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title="About You"
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
        />
        <div className="w-full flex flex-wrap justify-center gap-6">
          <RoundedButton destination="/">HIgh Blood Sugar</RoundedButton>
          <RoundedButton destination="/">1 to 3</RoundedButton>
          <RoundedButton destination="/">More than 3</RoundedButton>
        </div>
      </div>
    </Container>
  )
}

export default TextButtonComponent
