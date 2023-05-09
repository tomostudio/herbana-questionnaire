'use client'

import { useState } from 'react'
import Container from '../container'
import { BorderButton, ImageButton, RoundedButton } from '../utils/buttons'
import Heading from '../utils/heading'
import quizUpdate from '../utils/quizUpdate'
import Image from 'next/image'
import InputTextComponent from './inputTextComponent'

const QuestionComponent = ({
  sections,
  subTitle = '',
  placeholder = '',
  answers,
  image,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  questionId,
  setStatus,
  type,
  answerType,
  answerLimit,
  nextSection,
  nextQuestion,
}) => {
  const title = sections[currentSection].title.en
  const [getAnswer, setAnswer] = useState([])

  if (type === 'text') {
    return (
      <InputTextComponent
        sections={sections}
        questionId={questionId}
        nextSection={nextSection}
        nextQuestion={nextQuestion}
        subTitle={subTitle}
        placeholder={placeholder}
        currentSection={currentSection}
        currentQuestion={currentQuestion}
        setCurrentSection={setCurrentSection}
        setCurrentQuestion={setCurrentQuestion}
        setStatus={setStatus}
      />
    )
  }

  return image ? (
    <div className="w-full flex flex-col-reverse lg:flex-row self-stretch">
      <Container className="w-full h-full flex flex-col lg:flex-row items-end lg:items-center">
        <div className="lg:hidden w-full h-[345px] md:h-[400px]" />
        <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col justify-center items-center md:items-start pt-10 pb-28 lg:pt-20 lg:pb-20 lg:pr-12">
          <Heading
            title={title}
            subTitle={subTitle}
            position="text-center lg:text-left"
            subTitleSizeMobile="text-mheading1"
            marginSubtitle={type !== 'multiple' ? true : false}
          />
          {type === 'multiple' && (
            <span className="mb-8 text-greyPickup md:text-mqHeadingb font-bold">
              {`(PICK ${answerLimit.min} - ${answerLimit.max})`}
            </span>
          )}
          <div className="w-full flex flex-wrap justify-center lg:justify-start gap-6">
            {answers?.map((data, id) =>
              answerType === 'text' ? (
                <RoundedButton
                  key={id}
                  data-target={id}
                  heightFit={answers.length > 4 ? true : false}
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
                        if (getAnswer.length < parseInt(answerLimit.max)) {
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
              ) : (
                <ImageButton
                  key={id}
                  data-target={id}
                  src={answerType === 'icon' ? data.icon : data.image}
                  src2={
                    answerType === 'icon'
                      ? data.iconHover
                        ? data.iconHover
                        : data.icon
                      : null
                  }
                  heightFit={answers.length > 4 ? true : false}
                  width={answerType === 'icon' && 70}
                  height={answerType === 'icon' && 70}
                  icon={answerType === 'icon' ? true : false}
                  pickup={type === 'multiple' ? true : false}
                  onClick={(e) => {
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
                        if (getAnswer.length < parseInt(answerLimit.max)) {
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
              ),
            )}
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
  ) : (
    <Container className="w-full h-full flex justify-center items-center py-24 md:py-10">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
          marginSubtitle={type !== 'multiple' ? true : false}
        />
        {type === 'multiple' && (
          <span className="mb-8 text-greyPickup md:text-mqHeadingb font-bold">
            {`(PICK ${answerLimit.min} - ${answerLimit.max})`}
          </span>
        )}
        <div className="w-full max-w-4xl flex flex-wrap justify-center gap-6">
          {answers?.map((data, id) =>
            answerType === 'text' ? (
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
                      if (getAnswer.length < parseInt(answerLimit.max)) {
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
            ) : (
              <ImageButton
                key={id}
                data-target={id}
                src={answerType === 'icon' ? data.icon : data.image}
                src2={
                  answerType === 'icon'
                    ? data.iconHover
                      ? data.iconHover
                      : data.icon
                    : null
                }
                heightFit={answers.length > 4 ? true : false}
                width={answerType === 'icon' && 70}
                height={answerType === 'icon' && 70}
                icon={answerType === 'icon' ? true : false}
                pickup={type === 'multiple' ? true : false}
                onClick={(e) => {
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
                      if (getAnswer.length < parseInt(answerLimit.max)) {
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
            ),
          )}
        </div>
        {type === 'multiple' && (
          <BorderButton
            className="mt-6 md:mt-8"
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

export default QuestionComponent
