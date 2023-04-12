'use client'

import Footer from '../footer'
import Header from '../header'
import HeaderGap from '../headerGap'
import quizData from '../../app/sample-data.json'
import Image from 'next/image'

const NotFoundPage = () => {
  const quiz = quizData.data
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
            <Image src="/icons/informed.svg" width={105} height={105} />
            <span className="text-qHeading uppercase font-bold text-orange mt-6">
              404 Error
            </span>
            <span className="text-[2.188rem] mt-2">Sorry, page not found</span>
          </div>
        </div>
      </div>
      <Footer footer={quiz.footerData} />
    </main>
  )
}

export default NotFoundPage
