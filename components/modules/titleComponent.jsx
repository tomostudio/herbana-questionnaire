'use client'

import Image from 'next/image'
import Container from '../container'
import { RoundedFullButton } from '../utils/buttons'
import Heading from '../utils/heading'
import quizUpdate from '../utils/quizUpdate'

const TitleComponent = ({
  sections,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  setStatus,
}) => {
  const title = sections[currentSection].title.en
  const subTitle = sections[currentSection].cover.title.en
  const button = sections[currentSection].cover.button.en
  const imageLeft = sections[currentSection].cover.image.left
  const imageRight = sections[currentSection].cover.image.right

  return (
    <Container
      className="w-full h-full flex justify-center items-center"
      maxWidth="max-w-2xl"
    >
      <div className="relative w-fit flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          letterSpacing={true}
          subTitleSizeMobile="text-mheading"
        />
        <RoundedFullButton
          className="uppercase tracking-default"
          onClick={() => {
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
          }}
        >
          {button}
        </RoundedFullButton>
        <div className="absolute left-1/2 -translate-x-[138%] rotate-[-60deg] md:translate-x-0 md:rotate-0 md:left-auto md:right-full top-full -translate-y-[25%] md:top-1/2 md:-translate-y-1/2">
          <div className="relative w-44 h-44 md:w-72 md:h-72">
            <Image
              src={imageLeft}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
        <div className="absolute left-1/2 translate-x-[24%] rotate-[120deg] md:rotate-0 md:translate-x-0 md:right-auto md:left-full bottom-full md:bottom-auto translate-y-[12%] md:top-1/2 md:-translate-y-1/2">
          <div className="relative w-44 h-44 md:w-72 md:h-72">
            <Image
              src={imageRight}
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
