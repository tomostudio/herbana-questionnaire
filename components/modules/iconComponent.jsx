'use client'

import Container from '../container'
import { ImageButton } from '../utils/buttons'
import Heading from '../utils/heading'

const IconComponent = ({
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
        status: !nextQuestion && !nextSection ? 'finish' : 'progress',
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
          status: !nextQuestion && !nextSection ? 'finish' : 'progress',
          expired: dataQuestionnaire.expired,
        }),
      )

      setCurrentSection(currentSection)
      setCurrentQuestion(currentQuestion + 2)
      setStatus(!nextQuestion && !nextSection ? 'finish' : 'progress')
    } else {
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: currentSection + 1,
          currentQuestion: nextSection?.type === 'fundamental' ? 0 : null,
          questionnaireRespond: updatedResponds,
          status: !nextQuestion && !nextSection ? 'finish' : 'progress',
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
      setStatus(!nextQuestion && !nextSection ? 'finish' : 'progress')
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
        setStatus(!nextQuestion && !nextSection ? 'finish' : 'progress')
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
      setStatus(!nextQuestion && !nextSection ? 'finish' : 'progress')
    }
  }

  return (
    <Container className="w-full h-full flex justify-center items-center py-10">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <Heading
          title={title}
          subTitle={subTitle}
          subTitleSizeMobile="text-mheading1"
          classNameSubTitle="max-w-xs md:max-w-none"
        />
        <div className="w-full max-w-4xl flex flex-wrap justify-center gap-4">
          {answers?.map((data, id) => (
            <ImageButton
              key={id}
              src="/icons/informed1.png"
              fill={false}
              width={70}
              height={70}
              onClick={() => handleOnClick(data)}
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
