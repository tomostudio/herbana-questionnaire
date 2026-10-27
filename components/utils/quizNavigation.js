// Question visibility follows the API's display config:
// `state` is the default (1 = shown, 0 = hidden) and a matching `condition` flips it.
const conditionMatches = (question, responds) =>
  question.display.condition.some((condition) =>
    condition.answer.some((value) =>
      responds
        .find((h) => parseInt(h.questionID) === parseInt(condition.questionID))
        ?.answer.some((k) => k.toLowerCase() === value.toLowerCase()),
    ),
  )

export const isQuestionVisible = (question, responds) =>
  (parseInt(question.display.state) === 1) !==
  conditionMatches(question, responds)

const firstVisible = (sections, section, from, responds) => {
  const index = sections[section].questions.findIndex(
    (question, i) => i >= from && isQuestionVisible(question, responds),
  )
  return index === -1 ? null : index
}

const lastVisible = (sections, section, before, responds) => {
  for (let i = before - 1; i >= 0; i--) {
    if (isQuestionVisible(sections[section].questions[i], responds)) return i
  }
  return null
}

// Screen after the current one: next visible question, else the next section
// (quiz sections open on their title screen, `question: null`), else finish.
export const getNextScreen = (sections, section, question, responds) => {
  const next = firstVisible(
    sections,
    section,
    question === null ? 0 : question + 1,
    responds,
  )
  if (next !== null) return { section, question: next, status: 'progress' }

  for (let s = section + 1; s < sections.length; s++) {
    if (sections[s].type === 'quiz')
      return { section: s, question: null, status: 'progress' }
    const first = firstVisible(sections, s, 0, responds)
    if (first !== null) return { section: s, question: first, status: 'progress' }
  }
  return { section: null, question: null, status: 'finish' }
}

// Screen before the current one, mirroring getNextScreen. Returns null at the very start.
export const getPreviousScreen = (sections, section, question, responds) => {
  if (question !== null) {
    const previous = lastVisible(sections, section, question, responds)
    if (previous !== null) return { section, question: previous }
    if (sections[section].type === 'quiz') return { section, question: null }
  }

  for (let s = section - 1; s >= 0; s--) {
    const last = lastVisible(
      sections,
      s,
      sections[s].questions.length,
      responds,
    )
    if (last !== null) return { section: s, question: last }
    if (sections[s].type === 'quiz') return { section: s, question: null }
  }
  return null
}
