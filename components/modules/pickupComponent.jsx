'use client'

import { useState } from 'react'
import Container from '../container'
import { BorderButton, ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'
import quizUpdate from '../utils/quizUpdate'

const PickupComponent = ({
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
  const [getAnswer, setAnswer] = useState([])

  return (
    <Container className="w-full h-full flex justify-center items-center py-24 md:py-10">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
          marginSubtitle={false}
        />
        <span className="mb-8 text-greyPickup md:text-mqHeadingb font-bold">
          (PICK UP TO 3)
        </span>
        <div className="w-full max-w-4xl flex flex-wrap justify-center gap-6">
          {answers?.map((data, id) => (
            <ImageButton
              key={id}
              src="/icons/energy_black.png"
              src2="/icons/energy_white.png"
              fill={false}
              width={70}
              height={70}
              data-target={id}
              pickup={true}
              onClick={(e) => {
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
                    if(getAnswer.length < 3) {
                      setAnswer([...getAnswer, data.label.en])
                      pickupButton.classList.add('pickupActive')
                    }
                  }
              }}
            >
              {data.label.en}
            </ImageButton>
          ))}
        </div>
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
      </div>
    </Container>
  )
}

export default PickupComponent
