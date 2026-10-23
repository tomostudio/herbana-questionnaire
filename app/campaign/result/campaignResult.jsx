'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeaderGap from '@/components/headerGap'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

const SLIDE_GAP = 24

const CampaignResult = ({ result, quiz }) => {
  const router = useRouter()
  const isEn = usePathname().endsWith('/en')
  const s = useSearchParams().get('s')
  const sliderRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const slideStep = () =>
    sliderRef.current.querySelector('.product').offsetWidth + SLIDE_GAP

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setActiveSlide(
      scrollLeft >= scrollWidth - clientWidth - 1
        ? result.products.length - 1
        : Math.round(scrollLeft / slideStep()),
    )
  }

  return (
    <main className="w-full flex flex-col justify-between bg-white">
      <div className="relative min-h-screen w-full flex flex-col">
        <Header
          header={quiz.headerData}
          setReset={() => router.push(isEn ? '/campaign/en' : '/campaign')}
        />
        <HeaderGap />
        <div
          className={`campaign-result ${result.noDoctor ? 'nodoctor' : ''}`}
        >
          <div dangerouslySetInnerHTML={{ __html: result.heading }} />
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="product_container"
          >
            <section className="products">
              <div id="slider">
                {result.products.map((product, index) => (
                  <div
                    key={index}
                    className="product"
                    dangerouslySetInnerHTML={{ __html: product }}
                  />
                ))}
              </div>
            </section>
          </div>
          {result.products.length > 1 && (
            <div className="slider-dots">
              {result.products.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Slide ${index + 1}`}
                  className={activeSlide === index ? 'active' : ''}
                  onClick={() =>
                    sliderRef.current.scrollTo({
                      left: index * slideStep(),
                      behavior: 'smooth',
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer footer={quiz.footerData} search={`?s=${s}`} />
    </main>
  )
}

export default CampaignResult
