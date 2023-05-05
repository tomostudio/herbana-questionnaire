'use client'

import Container from '../container'
import { BorderButton } from '../utils/buttons'
import Heading from '../utils/heading'
import quizUpdate from '../utils/quizUpdate'

const InputTextComponent = ({
  sections,
  subTitle = '',
  placeholder,
  currentSection,
  currentQuestion,
  setCurrentSection,
  setCurrentQuestion,
  questionId,
  setStatus,
}) => {
  const title = sections[currentSection].title.en

  return (
    <Container className="w-full h-full flex justify-center items-center py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault()
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
        }}
        className="w-full md:max-w-lg lg:max-w-4xl flex flex-col items-center"
      >
        <Heading title={title} subTitle={subTitle} />
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
}

export default InputTextComponent
