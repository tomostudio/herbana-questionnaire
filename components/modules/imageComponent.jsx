'use client'

import Container from '../container'
import { ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'
import quizUpdate from '../utils/quizUpdate'

const ImageComponent = ({
  section,
  subTitle = '',
  nextQuestion,
  nextSection,
  answers,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  questionId,
  setStatus,
}) => {
  const title = section.title.en

  return (
    <Container className="w-full h-full flex justify-center items-center py-24 md:py-10">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
        />
        <div className="w-full flex flex-wrap justify-center gap-6">
          {answers?.map((data, id) => (
            <ImageButton
              key={id}
              src={data.image}
              icon={false}
              fill={true}
              style={{
                objectFit: 'cover',
              }}
              onClick={() =>
                quizUpdate(
                  [data.label.en],
                  questionId,
                  section,
                  nextSection,
                  nextQuestion,
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

export default ImageComponent
