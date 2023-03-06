import Container from '@/components/container'
import Image from 'next/image'
import { DefaultButton } from './utils/buttons'
import { ArrowLeft } from './utils/svg'

export default function Header({ background = 'bg-transparent' }) {
  return (
    <nav
      className={`${background} fixed top-0 left-0 right-0 w-full z-10 border-b-2 border-black`}
    >
      <Container>
        <div className="flex justify-between items-center h-header">
          <DefaultButton className="flex items-center text-nav font-maisonMono">
            <ArrowLeft className="mb-1 mr-4" />
            Back to Website
          </DefaultButton>
          <DefaultButton destination="/" className="relative">
            <Image
              src="/herbana.png"
              width={180}
              height={35}
              style={{
                objectFit: 'contain',
              }}
            />
          </DefaultButton>
          <DefaultButton className="text-nav font-maisonMono">
            Herbana Questionnaire
          </DefaultButton>
        </div>
      </Container>
    </nav>
  )
}
