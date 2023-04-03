import Container from '@/components/container'
import Image from 'next/image'
import { DefaultButton } from './utils/buttons'
import { ArrowLeft, Herbana } from './utils/svg'

export default function Header({
  background = '#FFF7E9',
  header,
  setCheckStorage,
  setStatus,
  setColor,
  setCurrentSection,
  setCurrentQuestion,
}) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-20 border-b-2 border-black`}
      style={{
        backgroundColor: background,
      }}
    >
      <Container>
        <div className="flex justify-between items-center h-mHeader md:h-header">
          <DefaultButton
            destination="https://herbana.id"
            className="hidden md:flex items-center text-nav font-maisonMono"
          >
            <ArrowLeft className="mr-4" />
            {header.backButton.en}
          </DefaultButton>
          <DefaultButton
            destination="/"
            className="relative flex items-center w-fit h-fit"
          >
            <ArrowLeft className="md:hidden mr-3" />
            <div className="relative w-[120px] h-[22px] md:w-[180px] md:h-[35px]">
              <Herbana />
            </div>
          </DefaultButton>
          <DefaultButton
            className="text-mNav md:text-nav w-28 md:w-fit font-maisonMono text-right tracking-tight"
            onClick={() => {
              localStorage.removeItem('questionnaire')
              setCurrentSection(0)
              setCurrentQuestion(0)
              setCheckStorage(false)
              setStatus('progress')
              setColor({
                header: '#FFF7E9',
                bg: '#DFF2F7',
              })
            }}
          >
            {header.title.en}
          </DefaultButton>
        </div>
      </Container>
    </nav>
  )
}
