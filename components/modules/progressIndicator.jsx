'use client'

import { DefaultButton } from '../utils/buttons'
import { ArrowLeft } from '../utils/svg'

const ProgressIndicator = ({
  currentSection,
  currentQuestion,
  setCurrentQuestion,
  sections,
  totalQuestion,
}) => {
  const handleBackClick = () => {
    if (currentQuestion > 0) {
      const dataQuestionnaire = JSON.parse(
        localStorage.getItem('questionnaire'),
      )
      dataQuestionnaire.questionnaireRespond
        .find((e) => e.sectionid === sections[currentSection].ID)
        .responds.pop()
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: currentSection,
          currentQuestion: currentQuestion - 1,
          questionnaireRespond: dataQuestionnaire.questionnaireRespond,
          status: 'progress',
          expired: dataQuestionnaire.expired,
        }),
      )
      setCurrentQuestion(currentQuestion - 1)
    } else {
      const dataQuestionnaire = JSON.parse(
        localStorage.getItem('questionnaire'),
      )
      dataQuestionnaire.questionnaireRespond
        .find((e) => e.sectionid === sections[currentSection - 1].ID)
        .responds.pop()
      dataQuestionnaire.questionnaireRespond.pop()
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: currentSection,
          currentQuestion: null,
          questionnaireRespond: dataQuestionnaire.questionnaireRespond,
          status: 'progress',
          expired: dataQuestionnaire.expired,
        }),
      )
      setCurrentQuestion(null)
    }
  }

  return (
    <div className="relative flex flex-col w-full">
      <DefaultButton
        className="absolute -top-6 left-0 hidden w-fit md:flex items-center text-nav font-maisonMono mx-6 md:mx-8 uppercase"
        onClick={handleBackClick}
      >
        <ArrowLeft className="mr-4" />
        Back
      </DefaultButton>
      <div className="relative w-full grid md:grid-cols-3 border-y-2 border-black">
        {sections.map(
          (data, id) =>
            data.type !== 'fundamental' && (
              <div
                key={id}
                className="relative md:border-r-2 z-10 border-black text-center text-footer md:text-nav font-maisonMono py-3"
              >
                <span className="relative uppercase">{data.title.en}</span>
              </div>
            ),
        )}
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
