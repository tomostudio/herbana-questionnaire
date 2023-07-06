'use client'

import Image from 'next/image'
import Container from '../container'
import { RoundedFullButton } from '../utils/buttons'
import Heading from '../utils/heading'
import quizUpdate from '../utils/quizUpdate'
import { usePathname } from 'next/navigation'

const TitleComponent = ({
  sections,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  setStatus,
  controls,
}) => {
  const getPath = usePathname()

  return (
    <Container className="relative w-full h-full flex justify-center items-center">
      <div className="relative max-w-xl z-10 w-fit flex flex-col items-center">
        <Heading
          title={
            getPath === '/en'
              ? sections[currentSection].title.en
              : sections[currentSection].title.id
          }
          subTitle={
            getPath === '/en'
              ? sections[currentSection].cover.title.en
              : sections[currentSection].cover.title.id
          }
          letterSpacing={true}
          subTitleSizeMobile="text-mheading"
        />
        <RoundedFullButton
          className="uppercase tracking-default"
          onClick={() => {
            controls.start('hidden')
            setTimeout(() => {
              controls.start('visible')
              quizUpdate(
                null,
                null,
                sections,
                currentSection,
                currentQuestion,
                setCurrentSection,
                setCurrentQuestion,
                setStatus,
              )
            }, 500)
          }}
        >
          {getPath === '/en'
            ? sections[currentSection].cover.button.en
            : sections[currentSection].cover.button.id}
        </RoundedFullButton>
      </div>
      <div className="px-6 max-w-screen-xl absolute mx-auto h-[50vh] min-h-[500px] max-h-[800px] md:h-auto w-full top-1/2 -translate-y-1/2 flex flex-row items-center justify-between">
        <div className="absolute -left-5 md:left-auto bottom-0 md:bottom-auto md:translate-y-0 md:relative w-44 h-44  md:w-60 md:h-60 lg:w-72 lg:h-72 rotate-[-60deg] md:rotate-0 ">
          <Image
            src={sections[currentSection].cover.image.left}
            fill
            style={{
              objectFit: 'contain',
            }}
            loading="eager"
            priority={true}
          />
        </div>
        <div className="absolute -right-5 md:right-auto top-0 md:top-auto md:translate-y-0 md:relative w-44 h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 rotate-[-30deg] md:rotate-0 ">
          <Image
            src={sections[currentSection].cover.image.right}
            fill
            style={{
              objectFit: 'contain',
            }}
            loading="eager"
            priority={true}
          />
        </div>
      </div>
    </Container>
  )
}

export default TitleComponent
