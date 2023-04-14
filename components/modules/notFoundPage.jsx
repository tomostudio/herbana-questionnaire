'use client'

import Footer from '../footer'
import Header from '../header'
import HeaderGap from '../headerGap'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import fetcher from '../utils/fetcher'
import useSWR from 'swr'

const NotFoundPage = () => {
  const quizData = useSWR('https://demo.herbana.id/quiz-api.php', fetcher)
  const [quiz, setQuiz] = useState([])

  useEffect(() => {
    if (quizData.data) {
      setQuiz(quizData.data)
    }
  }, [quizData.data])

  if (quiz.length === 0) {
    return <></>
  } else {
    return (
      <main
        className="w-full  flex flex-col justify-between"
        style={{
          backgroundColor: '#FFF7E9',
        }}
      >
        <div className="relative min-h-screen w-full h-full flex flex-col grow overflow-hidden">
          <Header background="#FFF7E9" header={quiz.headerData} />
          <HeaderGap />
          <div className="relative w-full h-full grow flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div className="relative w-[70px] h-[70px] md:w-[105px] md:h-[105px]">
                <Image
                  src="/icons/informed.svg"
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
              <span className="text-mheading md:text-qHeading uppercase font-bold text-orange mt-6">
                404 Error
              </span>
              <span className="text-mheading1 md:text-[2.188rem] mt-2">
                Sorry, page not found
              </span>
            </div>
          </div>
        </div>
        <Footer footer={quiz.footerData} />
      </main>
    )
  }
}

export default NotFoundPage
