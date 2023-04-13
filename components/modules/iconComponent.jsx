'use client'

import Container from '../container'
import { ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'
import quizUpdate from '../utils/quizUpdate'

const IconComponent = ({
  sections,
  subTitle = '',
  answers,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  questionId,
  setStatus,
}) => {
  const title = sections[currentSection].title.en

  return (
    <Container className="w-full h-full flex justify-center items-center py-24 md:py-10">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
        />
        <div className="w-full max-w-4xl flex flex-wrap justify-center gap-6">
          {answers?.map((data, id) => (
            <ImageButton
              key={id}
              src={data.image}
              fill={false}
              width={70}
              height={70}
              onClick={() =>
                quizUpdate(
                  [data.label.en],
                  questionId,
                  sections,
                  currentSection,
                  currentQuestion,
                  setCurrentSection,
                  setCurrentQuestion,
                  setStatus,
                )
              }
            >
              {data.label.en}
            </ImageButton>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default IconComponent
