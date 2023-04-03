'use client'

import Image from 'next/image'
import Container from '../container'
import { RoundedButton } from '../utils/buttons'
import Heading from '../utils/heading'

const TextImageComponent = ({
  section,
  subTitle = '',
  answers,
  nextSection,
  nextQuestion,
  image,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  questionId,
  setStatus
}) => {
  const title = section.title.en
  const sectionId = section.ID

  const updateQuestionnaire = (data) => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    const sectionExists = dataQuestionnaire.questionnaireRespond.find(
      (f) => f.sectionid === sectionId,
    )
    const sectionFilter = dataQuestionnaire.questionnaireRespond.filter(
      (f) => f.sectionid !== sectionId,
    )

    const newRespond = {
      questionID: questionId,
      answer: [data.label.en],
      type: 'option', // SELECT, MULTIPLE, STRING
    }

    const newSection = {
      sectionid: sectionId,
      responds: [newRespond],
    }

    const updatedResponds = sectionExists
      ? [
          ...sectionFilter,
          {
            sectionid: sectionExists.sectionid,
            responds: [
              ...sectionExists.responds,
              // RESPOND OBJECT
              newRespond,
            ],
          },
        ]
      : [...dataQuestionnaire.questionnaireRespond, newSection]

    localStorage.setItem(
      'questionnaire',
      JSON.stringify({
        currentSection: nextQuestion
          ? currentSection
          : nextSection
          ? currentSection + 1
          : null,
        currentQuestion: nextQuestion
          ? currentQuestion + 1
          : nextSection?.type === 'fundamental'
          ? 0
          : null,
        questionnaireRespond: updatedResponds,
        status: nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish',
        expired: dataQuestionnaire.expired,
      }),
    )
  }

  const skipQuestion = (data) => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))

    const sectionExists = dataQuestionnaire.questionnaireRespond.find(
      (f) => f.sectionid === sectionId,
    )
    const sectionFilter = dataQuestionnaire.questionnaireRespond.filter(
      (f) => f.sectionid !== sectionId,
    )

    const newRespond = {
      questionID: questionId,
      answer: [data.label.en],
      type: 'option', // SELECT, MULTIPLE, STRING
    }

    const newSection = {
      sectionid: sectionId,
      responds: [newRespond],
    }

    const updatedResponds = sectionExists
      ? [
          ...sectionFilter,
          {
            sectionid: sectionExists.sectionid,
            responds: [
              ...sectionExists.responds,
              // RESPOND OBJECT
              newRespond,
            ],
          },
        ]
      : [...dataQuestionnaire.questionnaireRespond, newSection]

    const skip = section.questions[currentQuestion + 2]
    if (skip) {
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: currentSection,
          currentQuestion: currentQuestion + 2,
          questionnaireRespond: updatedResponds,
          status: nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish',
          expired: dataQuestionnaire.expired,
        }),
      )

      setCurrentSection(currentSection)
      setCurrentQuestion(currentQuestion + 2)
      setStatus(nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish')
    } else {
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: currentSection + 1,
          currentQuestion: nextSection?.type === 'fundamental' ? 0 : null,
          questionnaireRespond: updatedResponds,
          status: nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish',
          expired: dataQuestionnaire.expired,
        }),
      )

      setCurrentSection(
        nextQuestion ? currentSection : nextSection ? currentSection + 1 : null,
      )
      setCurrentQuestion(
        nextQuestion
          ? currentQuestion + 1
          : nextSection?.type === 'fundamental'
          ? 0
          : null,
      )
      setStatus(nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish')
    }
  }

  const handleOnClick = (data) => {
    if (nextQuestion?.display.state === 0) {
      const dataQuestionnaire = JSON.parse(
        localStorage.getItem('questionnaire'),
      )
      const checkSkip = nextQuestion.display.condition.find((i) =>
        i.answer.find(
          (j) =>
            j ===
            dataQuestionnaire.questionnaireRespond
              .find((f) =>
                f.responds.find((g) => g.questionID === i.questionID),
              )
              ?.responds.find((h) => h.questionID === i.questionID)
              .answer.find((k) => k === j),
        ),
      )

      if (checkSkip) {
        skipQuestion(data)
      } else {
        updateQuestionnaire(data)
        setCurrentSection(
          nextQuestion
            ? currentSection
            : nextSection
            ? currentSection + 1
            : null,
        )
        setCurrentQuestion(
          nextQuestion
            ? currentQuestion + 1
            : nextSection?.type === 'fundamental'
            ? 0
            : null,
        )
        setStatus(nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish')
      }
    } else {
      updateQuestionnaire(data)
      setCurrentSection(
        nextQuestion ? currentSection : nextSection ? currentSection + 1 : null,
      )
      setCurrentQuestion(
        nextQuestion
          ? currentQuestion + 1
          : nextSection?.type === 'fundamental'
          ? 0
          : null,
      )
      setStatus(nextQuestion !== undefined || nextSection !== undefined ? 'progress' : 'finish')
    }
  }

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
          <div className="w-full flex justify-center lg:justify-start space-x-6">
            {answers?.map((data, id) => (
              <RoundedButton key={id} onClick={() => handleOnClick(data)}>
                {data.label.en}
              </RoundedButton>
            ))}
          </div>
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
