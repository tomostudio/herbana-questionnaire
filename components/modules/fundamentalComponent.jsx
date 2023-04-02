'use client'

import Container from '../container'
import { BorderButton } from '../utils/buttons'
import Heading from '../utils/heading'

const FundamentalComponent = ({
  section,
  subTitle = '',
  nextQuestion,
  nextSection,
  placeholder,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  questionId,
  setStatus
}) => {
  const title = section.title.en
  const sectionId = section.ID

  const updateQuestionnaire = (answer) => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    const sectionExists = dataQuestionnaire.questionnaireRespond.find(
      (f) => f.sectionid === sectionId,
    )
    const sectionFilter = dataQuestionnaire.questionnaireRespond.filter(
      (f) => f.sectionid !== sectionId,
    )

    const newRespond = {
      questionID: questionId,
      answer: answer,
      type: 'text', // SELECT, MULTIPLE, STRING
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

  const skipQuestion = (answer) => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))

    const sectionExists = dataQuestionnaire.questionnaireRespond.find(
      (f) => f.sectionid === sectionId,
    )
    const sectionFilter = dataQuestionnaire.questionnaireRespond.filter(
      (f) => f.sectionid !== sectionId,
    )

    const newRespond = {
      questionID: questionId,
      answer: answer,
      type: 'text', // SELECT, MULTIPLE, STRING
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

  const handleFormSubmit = (e) => {
    e.preventDefault()
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
        skipQuestion(e.target[0].value)
      } else {
        updateQuestionnaire(e.target[0].value)
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
      updateQuestionnaire(e.target[0].value)
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
    <Container className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleFormSubmit}
        className="w-full md:max-w-lg lg:max-w-4xl flex flex-col items-center"
      >
        <Heading title={title} subTitle={subTitle} />
        <input
          type="text"
          placeholder={placeholder}
          className="w-fit md:w-full mb-12 px-8 uppercase text-mInput md:text-body outline-none placeholder:text-black tracking-wider placeholder:opacity-50 text-center border py-4 border-black rounded-xl"
          required
        />
        <BorderButton>CONTINUE</BorderButton>
      </form>
    </Container>
  )
}

export default FundamentalComponent
