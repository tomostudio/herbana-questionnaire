import Container from '../container'
import { BorderButton, ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'

const IconComponent = () => {
  const subTitle = 'When it comes to herbal supplements, \n you are...'
  return (
    <Container className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title="About You"
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs"
        />
        <div className="w-full flex flex-wrap justify-center gap-6">
          <ImageButton
            destination="/"
            src="/icons/informed1.png"
            fill={false}
            width={70}
            height={70}
          >
            Informed
          </ImageButton>
          <ImageButton
            destination="/"
            src="/icons/informed1.png"
            fill={false}
            width={70}
            height={70}
          >
            Nausea, Bloating and or Indigestion
          </ImageButton>
          <ImageButton
            destination="/"
            src="/icons/informed1.png"
            fill={false}
            width={70}
            height={70}
          >
            Informed
          </ImageButton>
        </div>
      </div>
    </Container>
  )
}

export default IconComponent
