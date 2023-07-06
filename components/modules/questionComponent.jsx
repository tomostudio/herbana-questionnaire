'use client'

import { useState } from 'react'
import Container from '../container'
import { BorderButton, ImageButton, RoundedButton } from '../utils/buttons'
import Heading from '../utils/heading'
import quizUpdate from '../utils/quizUpdate'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

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
  controls,
}) => {
  const getPath = usePathname()
  const title =
    getPath === '/en'
      ? sections[currentSection].title.en
      : sections[currentSection].title.id
  const [getAnswer, setAnswer] = useState([])

  if (image) {
    if (type === 'text') {
      return (
        <div className="w-full flex flex-col-reverse lg:flex-row self-stretch">
          <Container className="w-full h-full flex flex-col lg:flex-row items-end lg:items-center">
            <div className="lg:hidden w-full h-[345px] md:h-[400px]" />
            <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col justify-center items-center lg:items-start pt-10 pb-28 lg:pt-20 lg:pb-20 lg:pr-12">
              <Heading
                title={title}
                subTitle={subTitle}
                position="text-center lg:text-left"
                subTitleSizeMobile="text-mheading1"
                marginSubtitle={type !== 'multiple' ? true : false}
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  controls.start('hidden')
                  setTimeout(() => {
                    controls.start('visible')
                    quizUpdate(
                      [e.target[0].value],
                      questionId,
                      sections,
                      currentSection,
                      currentQuestion,
                      setCurrentSection,
                      setCurrentQuestion,
                      setStatus,
                    )
                  }, 500)
                }}
                className="w-full flex flex-col items-center lg:items-start justify-center lg:justify-start gap-6"
              >
                <input
                  type="text"
                  placeholder={placeholder}
                  className="w-full max-w-md md:max-w-xl mb-12 px-8 uppercase text-mInput md:text-body outline-none placeholder:text-black tracking-wider placeholder:opacity-50 text-center border py-4 border-black rounded-xl"
                  required
                />
                <BorderButton>CONTINUE</BorderButton>
              </form>
            </div>
          </Container>
          <div className="hidden lg:block absolute top-0 right-0 w-full lg:w-1/2 h-[50vh] lg:h-full bg-white">
            <Image
              src={image}
              fill
              style={{
                objectFit: 'cover',
              }}
              loading="eager"
              priority={true}
            />
          </div>
          <div className="lg:hidden absolute top-0 right-0 w-full h-[345px] md:h-[400px] bg-white">
            <Image
              src={image}
              fill
              style={{
                objectFit: 'cover',
              }}
              loading="eager"
              priority={true}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="w-full flex flex-col-reverse lg:flex-row self-stretch">
          <Container className="w-full h-full flex flex-col lg:flex-row items-end lg:items-center">
            <div className="lg:hidden w-full h-[345px] md:h-[400px]" />
            <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col justify-center items-center lg:items-start pt-10 pb-28 lg:pt-20 lg:pb-20 lg:pr-12">
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
                              (e) => e !== data.value,
                            )
                            setAnswer(filterAnswer)
                            pickupButton.classList.remove('pickupActive')
                          } else {
                            if (getAnswer.length < parseInt(answerLimit.max)) {
                              setAnswer([...getAnswer, data.value])
                              pickupButton.classList.add('pickupActive')
                            }
                          }
                        } else {
                          controls.start('hidden')
                          setTimeout(() => {
                            controls.start('visible')
                            quizUpdate(
                              [data.value],
                              questionId,
                              sections,
                              currentSection,
                              currentQuestion,
                              setCurrentSection,
                              setCurrentQuestion,
                              setStatus,
                            )
                          }, 500)
                        }
                      }}
                    >
                      {getPath === '/en' ? data.label.en : data.label.id}
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
                              (e) => e !== data.value,
                            )
                            setAnswer(filterAnswer)
                            pickupButton.classList.remove('pickupActive')
                          } else {
                            if (getAnswer.length < parseInt(answerLimit.max)) {
                              setAnswer([...getAnswer, data.value])
                              pickupButton.classList.add('pickupActive')
                            }
                          }
                        } else {
                          controls.start('hidden')
                          setTimeout(() => {
                            controls.start('visible')
                            quizUpdate(
                              [data.value],
                              questionId,
                              sections,
                              currentSection,
                              currentQuestion,
                              setCurrentSection,
                              setCurrentQuestion,
                              setStatus,
                            )
                          }, 500)
                        }
                      }}
                    >
                      {getPath === '/en' ? data.label.en : data.label.id}
                    </ImageButton>
                  ),
                )}
              </div>
              {type === 'multiple' && (
                <BorderButton
                  className="mt-6 md:mt-7"
                  onClick={() => {
                    if (getAnswer.length > 0) {
                      controls.start('hidden')
                      setTimeout(() => {
                        controls.start('visible')
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
                      }, 500)
                    }
                  }}
                >
                  CONTINUE
                </BorderButton>
              )}
            </div>
          </Container>
          <div className="hidden lg:block absolute top-0 right-0 w-full lg:w-1/2 h-[50vh] lg:h-full bg-white">
            <Image
              src={image}
              fill
              style={{
                objectFit: 'cover',
              }}
              loading="eager"
              priority={true}
            />
          </div>
          <div className="lg:hidden absolute top-0 right-0 w-full h-[345px] md:h-[400px] bg-white">
            <Image
              src={image}
              fill
              style={{
                objectFit: 'cover',
              }}
              loading="eager"
              priority={true}
            />
          </div>
        </div>
      )
    }
  } else {
    if (type === 'text') {
      return (
        <Container className="w-full h-full flex justify-center items-center py-24 md:py-10">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              controls.start('hidden')
              setTimeout(() => {
                controls.start('visible')
                quizUpdate(
                  [e.target[0].value],
                  questionId,
                  sections,
                  currentSection,
                  currentQuestion,
                  setCurrentSection,
                  setCurrentQuestion,
                  setStatus,
                )
              }, 500)
            }}
            className="w-full max-w-5xl flex flex-col items-center"
          >
            <Heading
              title={title}
              subTitle={subTitle}
              subTitleSizeMobile="text-mheading1"
              classNameSubTitle="max-w-xs md:max-w-none"
              marginSubtitle={type !== 'multiple' ? true : false}
            />
            <input
              type="text"
              placeholder={placeholder}
              className="w-full max-w-md md:max-w-xl mb-12 px-8 uppercase text-mInput md:text-body outline-none placeholder:text-black tracking-wider placeholder:opacity-50 text-center border py-4 border-black rounded-xl"
              required
            />
            <BorderButton>CONTINUE</BorderButton>
          </form>
        </Container>
      )
    } else {
      return (
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
            <div
              className={`w-full ${
                answerType === 'text' ? 'max-w-3xl' : 'max-w-4xl'
              } flex flex-wrap justify-center gap-[15px] md:gap-6`}
            >
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
                            (e) => e !== data.value,
                          )
                          setAnswer(filterAnswer)
                          pickupButton.classList.remove('pickupActive')
                        } else {
                          if (getAnswer.length < parseInt(answerLimit.max)) {
                            setAnswer([...getAnswer, data.value])
                            pickupButton.classList.add('pickupActive')
                          }
                        }
                      } else {
                        controls.start('hidden')
                        setTimeout(() => {
                          controls.start('visible')
                          quizUpdate(
                            [data.value],
                            questionId,
                            sections,
                            currentSection,
                            currentQuestion,
                            setCurrentSection,
                            setCurrentQuestion,
                            setStatus,
                          )
                        }, 500)
                      }
                    }}
                  >
                    {getPath === '/en' ? data.label.en : data.label.id}
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
                            (e) => e !== data.value,
                          )
                          setAnswer(filterAnswer)
                          pickupButton.classList.remove('pickupActive')
                        } else {
                          if (getAnswer.length < parseInt(answerLimit.max)) {
                            setAnswer([...getAnswer, data.value])
                            pickupButton.classList.add('pickupActive')
                          }
                        }
                      } else {
                        controls.start('hidden')
                        setTimeout(() => {
                          controls.start('visible')
                          quizUpdate(
                            [data.value],
                            questionId,
                            sections,
                            currentSection,
                            currentQuestion,
                            setCurrentSection,
                            setCurrentQuestion,
                            setStatus,
                          )
                        }, 500)
                      }
                    }}
                  >
                    {getPath === '/en' ? data.label.en : data.label.id}
                  </ImageButton>
                ),
              )}
            </div>
            {type === 'multiple' && (
              <BorderButton
                className="mt-6 md:mt-8"
                onClick={() => {
                  if (getAnswer.length > 0) {
                    controls.start('hidden')
                    setTimeout(() => {
                      controls.start('visible')
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
                      setAnswer([])
                    }, 500)
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
  }
}

export default QuestionComponent
