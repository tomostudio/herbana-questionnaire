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
  if (!dataQuestionnaire) window.location.reload()

  const updateQuestionnaire = (updateSection, updateQuestion, status) => {
    if (answer) {
      const newRespond = {
        sectionID: sections[currentSection].ID,
        questionID: parseInt(questionId),
        answer: answer,
      }

      const updatedResponds = [
        ...dataQuestionnaire.questionnaireRespond,
        // RESPOND OBJECT
        newRespond,
      ]

      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: updateSection,
          currentQuestion: updateQuestion,
          questionnaireRespond: updatedResponds,
          status: status,
          expired: dataQuestionnaire.expired,
        }),
      )
    } else {
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          currentSection: updateSection,
          currentQuestion: updateQuestion,
          questionnaireRespond: dataQuestionnaire.questionnaireRespond,
          status: status,
          expired: dataQuestionnaire.expired,
        }),
      )
    }

    setCurrentSection(updateSection)
    setCurrentQuestion(updateQuestion)
    setStatus(status)
  }

  let newSection = currentSection
  let newQuestion = currentQuestion

  const loopSkip = () => {
    if (newQuestion !== null) {
      if (sections[newSection].questions[newQuestion + 1]) {
        let showQuiz
        if (answer) {
          const newRespond = {
            sectionID: parseInt(sections[currentSection].ID),
            questionID: parseInt(questionId),
            answer: answer,
          }

          const updatedResponds = [
            ...dataQuestionnaire.questionnaireRespond,
            // RESPOND OBJECT
            newRespond,
          ]

          showQuiz = sections[newSection].questions[
            newQuestion + 1
          ].display.condition.find((i) =>
            i.answer.find(
              (j) =>
                j.toLowerCase() ===
                updatedResponds
                  .find(
                    (h) => parseInt(h.questionID) === parseInt(i.questionID),
                  )
                  ?.answer.find((k) => k.toLowerCase() === j.toLowerCase())
                  ?.toLowerCase(),
            ),
          )
        } else {
          showQuiz = sections[newSection].questions[
            newQuestion + 1
          ].display.condition.find((i) =>
            i.answer.find(
              (j) =>
                j.toLowerCase() ===
                dataQuestionnaire.questionnaireRespond
                  .find(
                    (h) => parseInt(h.questionID) === parseInt(i.questionID),
                  )
                  ?.answer.find((k) => k.toLowerCase() === j.toLowerCase())
                  ?.toLowerCase(),
            ),
          )
        }

        if (
          parseInt(
            sections[newSection].questions[newQuestion + 1].display.state,
          ) === 0
        ) {
          if (!showQuiz) {
            newQuestion = newQuestion + 1
            return true
          } else {
            updateQuestionnaire(
              sections[newSection].questions[newQuestion + 1]
                ? newSection
                : sections[newSection + 1]
                ? newSection + 1
                : null,
              sections[newSection].questions[newQuestion + 1]
                ? newQuestion === null
                  ? 0
                  : newQuestion + 1
                : sections[newSection + 1]?.type === 'fundamental'
                ? 0
                : null,
              sections[newSection + 1] ||
                sections[newSection].questions[newQuestion + 1] !== undefined
                ? 'progress'
                : 'finish',
            )

            return false
          }
        } else {
          if (showQuiz) {
            newQuestion = newQuestion + 1
            return true
          } else {
            updateQuestionnaire(
              sections[newSection].questions[newQuestion + 1]
                ? newSection
                : sections[newSection + 1]
                ? newSection + 1
                : null,
              sections[newSection].questions[newQuestion + 1]
                ? newQuestion === null
                  ? 0
                  : newQuestion + 1
                : sections[newSection + 1]?.type === 'fundamental'
                ? 0
                : null,
              sections[newSection + 1] ||
                sections[newSection].questions[newQuestion + 1] !== undefined
                ? 'progress'
                : 'finish',
            )

            return false
          }
        }
      } else {
        updateQuestionnaire(
          sections[newSection].questions[newQuestion + 1]
            ? newSection
            : sections[newSection + 1]
            ? newSection + 1
            : null,
          sections[newSection].questions[newQuestion + 1]
            ? newQuestion === null
              ? 0
              : newQuestion + 1
            : sections[newSection + 1]?.type === 'fundamental'
            ? 0
            : null,
          sections[newSection + 1] ||
            sections[newSection].questions[newQuestion + 1] !== undefined
            ? 'progress'
            : 'finish',
        )

        return false
      }
    } else {
      updateQuestionnaire(
        newSection,
        null,
        newSection || newQuestion !== undefined ? 'progress' : 'finish',
      )

      return false
    }
  }

  if (
    sections[currentSection].questions[
      currentQuestion === null ? 0 : currentQuestion + 1
    ]
  ) {
    if (
      parseInt(
        sections[currentSection].questions[
          currentQuestion === null ? 0 : currentQuestion + 1
        ].display.state,
      ) === 0
    ) {
      while (true) {
        if (loopSkip() === false) {
          break
        }
      }
    } else {
      updateQuestionnaire(
        sections[currentSection].questions[
          currentQuestion === null ? 0 : currentQuestion + 1
        ]
          ? currentSection
          : sections[currentSection + 1]
          ? currentSection + 1
          : null,
        sections[currentSection].questions[
          currentQuestion === null ? 0 : currentQuestion + 1
        ]
          ? currentQuestion === null
            ? 0
            : currentQuestion + 1
          : sections[currentSection + 1]
          ? sections[currentSection + 1].type === 'fundamental'
            ? 0
            : null
          : null,
        sections[currentSection].questions[
          currentQuestion === null ? 0 : currentQuestion + 1
        ]
          ? 'progress'
          : sections[currentSection + 1]
          ? 'progress'
          : 'finish',
      )
    }
  } else {
    updateQuestionnaire(
      sections[currentSection + 1] ? currentSection + 1 : null,
      sections[currentSection + 1]
        ? sections[currentSection + 1].type === 'fundamental'
          ? 0
          : null
        : null,
      sections[currentSection + 1] ? 'progress' : 'finish',
    )
  }

  if (
    sections[currentSection].questions[
      currentQuestion === null ? 0 : currentQuestion + 1
    ]
      ? parseInt(
          sections[currentSection].questions[
            currentQuestion === null ? 0 : currentQuestion + 1
          ].display.state,
        ) === 0
      : false
  ) {
    while (true) {
      if (loopSkip() === false) {
        break
      }
    }
  } else {
    updateQuestionnaire(
      sections[currentSection].questions[currentQuestion + 1]
        ? currentSection
        : sections[currentSection + 1]
        ? currentSection + 1
        : null,
      sections[currentSection].questions[currentQuestion + 1]
        ? currentQuestion === null
          ? 0
          : currentQuestion + 1
        : sections[currentSection + 1]?.type === 'fundamental'
        ? 0
        : null,
      sections[currentSection + 1] ||
        sections[currentSection].questions[currentQuestion + 1] !== undefined
        ? 'progress'
        : 'finish',
    )
  }
}

export default quizUpdate
