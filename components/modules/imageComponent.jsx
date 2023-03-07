import Container from '../container'
import { ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'

const ImageComponent = () => {
  const subTitle = 'Are you pregnant?'
  return (
    <Container className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading title="About You" subTitle={subTitle} />
        <div className="w-full flex justify-center space-x-6">
          <ImageButton
            destination="/"
            src="/pregnant.png"
            icon={false}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
          >
            Pregnant
          </ImageButton>{' '}
          <ImageButton
            destination="/"
            src="/pregnant.png"
            icon={false}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
          >
            Pregnant
          </ImageButton>{' '}
          <ImageButton
            destination="/"
            src="/pregnant.png"
            icon={false}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
          >
            Pregnant
          </ImageButton>
        </div>
      </div>
    </Container>
  )
}

export default ImageComponent
