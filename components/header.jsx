'use client'

import Container from '@/components/container'
import Image from 'next/image'
import { DefaultButton } from './utils/buttons'
import { ArrowLeft, ArrowLeftMobile, Herbana } from './utils/svg'
import { usePathname, useRouter } from 'next/navigation'

export default function Header({
  background = '#FFF7E9',
  header,
  setCheckStorage,
  setStatus,
  setColor,
  setCurrentSection = null,
  setCurrentQuestion,
  setReset,
}) {
  const router = useRouter()
  const getPath = usePathname()
  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-20 border-b md:border-b-default  border-black`}
      style={{
        backgroundColor: background,
      }}
    >
      <Container>
        <div className="flex justify-between items-center h-mHeader md:h-header">
          <DefaultButton
            destination="https://herbana.id"
            className="hidden md:flex items-center text-nav font-maisonMono"
          >
            <ArrowLeft className="mr-4" />
            {getPath === "/en" ? header.backButton.en : header.backButton.id}
          </DefaultButton>
          <DefaultButton
            destination="https://herbana.id"
            className="relative flex items-center w-fit h-fit"
          >
            {/* <ArrowLeft className="md:hidden mr-1" /> */}
            <ArrowLeftMobile className="md:hidden mr-0.5" />
            <div className="relative w-[120px] h-[22px] md:w-[180px] md:h-[35px]">
              <Herbana />
            </div>
          </DefaultButton>
          <DefaultButton
            className="text-mNav md:text-nav w-28 md:w-fit font-maisonMono text-right tracking-tight"
            onClick={() => setReset(true)}
          >
            {getPath === '/en' ? header.title.en : header.title.id}
          </DefaultButton>
        </div>
      </Container>
    </nav>
  )
}
