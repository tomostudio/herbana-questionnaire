'use client'

import { useState } from 'react'
import Container from '../container'
import { BorderButton, ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'
import quizUpdate from '../utils/quizUpdate'

const ImageComponent = ({
  sections,
  subTitle = '',
  answers,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  questionId,
  setStatus,
  type,
}) => {
  const title = sections[currentSection].title.en
  const [getAnswer, setAnswer] = useState([])

  return (
    <Container className="w-full h-full flex justify-center items-center py-24 md:py-10">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
        />
        {type === 'multiple' && (
          <span className="mb-8 text-greyPickup md:text-mqHeadingb font-bold">
            (PICK UP TO 3)
          </span>
        )}
        <div className="w-full flex flex-wrap justify-center gap-6">
          {answers?.map((data, id) => (
            <ImageButton
              key={id}
              data-target={id}
              src={data.image}
              icon={false}
              fill={true}
              style={{
                objectFit: 'cover',
              }}
              onClick={() => {
                if (type === 'multiple') {
                  const pickupButton = document.querySelector(
                    `[data-target="${id}"]`,
                  )
                  if (pickupButton.classList.contains('pickupActive')) {
                    let filterAnswer = getAnswer.filter(
                      (e) => e !== data.label.en,
                    )
                    setAnswer(filterAnswer)
                    pickupButton.classList.remove('pickupActive')
                  } else {
                    if (getAnswer.length < 3) {
                      setAnswer([...getAnswer, data.label.en])
                      pickupButton.classList.add('pickupActive')
                    }
                  }
                } else {
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
              }}
            >
              {data.label.en}
            </ImageButton>
          ))}
        </div>
        {type === 'multiple' && (
          <BorderButton
            className="mt-6 md:mt-7"
            onClick={() => {
              if (getAnswer.length > 0) {
                quizUpdate(
                  getAnswer,
                  questionId,
                  sections,
                  currentSection,
                  currentQuestion,
                  setCurrentSection,
                  setCurrentQuestion,
                  setStatus,
                )
              }
            }}
          >
            CONTINUE
          </BorderButton>
        )}
      </div>
    </Container>
  )
}

export default ImageComponent
