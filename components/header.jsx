import Container from '@/components/container'
import Image from 'next/image'
import { DefaultButton } from './utils/buttons'
import { ArrowLeft } from './utils/svg'

export default function Header({ background = 'bg-transparent' }) {
  return (
    <nav
      className={`${background} fixed top-0 left-0 right-0 w-full z-20 border-b-2 border-black`}
    >
      <Container>
        <div className="flex justify-between items-center h-mHeader md:h-header">
          <DefaultButton className="hidden md:flex items-center text-nav font-maisonMono">
            <ArrowLeft className="mb-1 mr-4" />
            Back to Website
          </DefaultButton>
          <DefaultButton destination="/" className="relative flex items-center w-fit h-fit">
            <ArrowLeft className="md:hidden mr-3" />
            <div className="relative w-[120px] h-[22px] md:w-[180px] md:h-[35px]">
              <Image
                src="/herbana.png"
                width={180}
                height={35}
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          </DefaultButton>
          <DefaultButton className="text-mNav md:text-nav w-28 md:w-fit font-maisonMono text-right tracking-tight" destination="/">
            Herbana Questionnaire
          </DefaultButton>
        </div>
      </Container>
    </nav>
  )
}
