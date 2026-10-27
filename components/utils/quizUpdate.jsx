import { getNextScreen } from './quizNavigation'

const quizUpdate = (
  answer,
  questionId,
  sections,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  setStatus,
) => {
  const dataQuestionnaire = JSON.parse(localStorage.getItem('questionnaire'))
  if (!dataQuestionnaire) return window.location.reload()

  // Replace any earlier answer to this question so it is never sent twice
  const questionnaireRespond = answer
    ? [
        ...dataQuestionnaire.questionnaireRespond.filter(
          (respond) => parseInt(respond.questionID) !== parseInt(questionId),
        ),
        {
          sectionID: sections[currentSection].ID,
          questionID: parseInt(questionId),
          answer: answer,
        },
      ]
    : dataQuestionnaire.questionnaireRespond

  const { section, question, status } = getNextScreen(
    sections,
    currentSection,
    currentQuestion,
    questionnaireRespond,
  )

  localStorage.setItem(
    'questionnaire',
    JSON.stringify({
      ...dataQuestionnaire,
      currentSection: section,
      currentQuestion: question,
      questionnaireRespond,
      status,
    }),
  )

  setCurrentSection(section)
  setCurrentQuestion(question)
  setStatus(status)
}

export default quizUpdate
