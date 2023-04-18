'use client'

import Image from 'next/image'
import Container from '../container'
import { BorderButton, RoundedButton } from '../utils/buttons'
import Heading from '../utils/heading'
import quizUpdate from '../utils/quizUpdate'
import { useState } from 'react'

const TextImageComponent = ({
  sections,
  subTitle = '',
  answers,
  image,
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
    <div className="w-full flex flex-col-reverse lg:flex-row self-stretch">
      <Container className="w-full h-full flex flex-col lg:flex-row items-end lg:items-center">
        <div className="lg:hidden w-full h-[345px] md:h-[400px]" />
        <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col justify-center pt-10 pb-28 lg:pt-0 lg:pb-0 lg:pr-8">
          <Heading
            title={title}
            subTitle={subTitle}
            position="text-center lg:text-left"
            subTitleSizeMobile="text-mheading1"
          />
          <div className="w-full flex justify-center lg:justify-start gap-6">
            {answers?.map((data, id) => (
              <RoundedButton
                key={id}
                data-target={id}
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
              </RoundedButton>
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
      <div className="hidden lg:block absolute top-0 right-0 w-full lg:w-1/2 h-[50vh] lg:h-full">
        <Image
          src={image}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="lg:hidden absolute top-0 right-0 w-full h-[345px] md:h-[400px]">
        <Image
          src={image}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  )
}

export default TextImageComponent
