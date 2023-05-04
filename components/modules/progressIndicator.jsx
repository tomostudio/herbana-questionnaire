'use client'

import Container from '../container'
import { DefaultButton } from '../utils/buttons'
import { ArrowLeft } from '../utils/svg'

const ProgressIndicator = ({
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  sections,
  totalQuestion,
  setStatus,
}) => {
  const updateQuestionnaire = (updateSection, updateQuestion) => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (sections[currentSection].questions[updateQuestion]) {
      dataQuestionnaire.questionnaireRespond.pop()
    }
    localStorage.setItem(
      'questionnaire',
      JSON.stringify({
        currentSection: currentSection,
        currentQuestion: updateQuestion,
        questionnaireRespond: dataQuestionnaire.questionnaireRespond,
        status: 'progress',
        expired: dataQuestionnaire.expired,
      }),
    )

    setCurrentSection(updateSection)
    setCurrentQuestion(updateQuestion)
    setStatus('progress')
  }

  let newQuestion = currentQuestion

  const skipQuestion = () => {
    const skipQuiz = sections[currentSection].questions[newQuestion - 2]
    if (skipQuiz) {
      newQuestion = newQuestion - 2
      updateQuestionnaire(currentSection, newQuestion)
    } else {
      newQuestion = null
      updateQuestionnaire(currentSection, null)
    }
  }

  const loopSkip = () => {
    const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
    if (sections[currentSection].questions[newQuestion - 1]) {
      const showQuiz = sections[currentSection].questions[
        newQuestion - 1
      ].display.condition.find((i) =>
        i.answer.find(
          (j) =>
            j ===
            dataQuestionnaire.questionnaireRespond
              .find((h) => h.questionID === i.questionID)
              ?.answer.find((k) => k === j),
        ),
      )

      if (!showQuiz) {
        skipQuestion()
        return true
      } else {
        updateQuestionnaire(currentSection, null)
        return false
      }
    } else {
      updateQuestionnaire(currentSection, null)
      return false
    }
  }

  const handleBackClick = () => {
    if (currentQuestion > 0) {
      if (
        sections[currentSection].questions[currentQuestion - 1]
          ? parseInt(
              sections[currentSection].questions[currentQuestion - 1].display
                .state,
            ) === 0
          : false
      ) {
        while (true) {
          if (loopSkip() === false) {
            break
          }
        }
      } else {
        updateQuestionnaire(currentSection, currentQuestion - 1)
      }
    } else {
      updateQuestionnaire(currentSection, null)
    }
  }

  return (
    <div className="relative flex flex-col w-full">
      <Container className="absolute -top-5 left-1/2 -translate-x-1/2 -translate-y-full">
        <DefaultButton
          className="w-fit flex items-center text-footer md:text-nav font-maisonMono uppercase"
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-3 md:mr-4 w-[23px] md:w-auto" />
          <span className="leading-none pt-[2px]">Back</span>
        </DefaultButton>
      </Container>
      <div className=" relative w-full ">
        <div
          className={`hidden relative md:grid`}
          style={{
            gridTemplateColumns: `repeat(${
              sections.filter((data) => data.type !== 'fundamental').length > 5
                ? 5
                : sections.filter((data) => data.type !== 'fundamental').length
            }, minmax(0, 1fr))`,
          }}
        >
          {sections.map(
            (data, id) =>
              data.type !== 'fundamental' && (
                <div
                  key={id}
                  className="relative md:border-l-0 md:border-r-default  z-10 border-default border-black text-center text-footer md:text-nav font-maisonMono py-3 last:border-r-0"
                >
                  <span className="relative uppercase">{data.title.en}</span>
                </div>
              ),
          )}
        </div>
        <div
          className={`absolute top-0 left-0 h-full bg-yellow transition-all duration-300`}
          style={{
            width: `${
              (sections[currentSection].questions[currentQuestion].current /
                totalQuestion) *
              100
            }%`,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressIndicator
