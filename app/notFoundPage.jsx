'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const NotFoundPage = () => {
  const [quiz, setQuiz] = useState(null)
  useEffect(() => {
    fetch('https://herbana.id/quiz-api.php')
      .then((res) => res.json())
      .then((quizData) => {
        setQuiz(quizData)
      })
  }, [])

  return !quiz ? (
    <></>
  ) : (
    <>
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
                  loading="eager"
                  priority={true}
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
    </>
  )
}

export default NotFoundPage
