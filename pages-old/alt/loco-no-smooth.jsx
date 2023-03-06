import { useRef, useEffect } from 'react'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'
import FancyLink from '@/components/fancyLink'
import { fade } from '@/helpers/transitions'
import PushScrollGlobal from '@/helpers/globalscroll'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import ScrollTriggerWrapper from '@/components/scrolltrigger.js'
import { applyAnimation } from '@/components/scrollTriggerAnim'

export default function Home() {
  gsap.registerPlugin(ScrollTrigger)

  const containerRef = useRef(null)

  const animationObj = {
    '(min-width: 751px)': [
      () => {
        const id = 'si01'
        const elem = '.scrollsection .line'

        const settings = {
          scrollTrigger: {
            id: id,
            trigger: '.scrollsection', // which page section will be tracked as the scroll trigger
            scroller: '#scroll-container', // id of scroll container
            scrub: true,
            start: 'top 0%',
            end: '+=100%',
            // onUpdate: (e) => { console.log('1', Math.round(e.progress * 100)) }
          },
        }
        const animation = [
          {
            set: [
              elem,
              {
                background: 'rgba(253, 230, 138, 1)',
              },
            ],
          },
          {
            to: [
              elem,
              {
                scaleX: 0,
                transformOrigin: 'left center',
                background: 'rgba(253, 230, 138, 0)',
                ease: 'none',
                duration: 1,
              },
              0,
            ],
          },
        ]
        return { id, elem, settings, animation }
      },
    ],
    '(max-width: 750px)': [
      () => {
        const id = 'si02'
        const elem = '.scrollsection .line'

        const settings = {
          scrollTrigger: {
            id: id,
            trigger: '.scrollsection', // which page section will be tracked as the scroll trigger
            scroller: '#scroll-container', // id of scroll container
            scrub: true,
            start: 'top 0%',
            end: '+=100%',
            // onUpdate: (e) => { console.log('2', Math.round(e.progress * 100)) }
          },
        }
        const animation = [
          {
            set: [
              elem,
              {
                background: 'rgba(253, 230, 138, 0)',
              },
            ],
          },
          {
            to: [
              elem,
              {
                scaleX: 0,
                transformOrigin: 'left center',
                background: 'rgba(253, 230, 138, 1)',
                ease: 'none',
                duration: 2,
              },
              0,
            ],
          },
        ]
        return { id, elem, settings, animation }
      },
    ],
  }

  useEffect(() => {
    window.addEventListener('LocoCall', (e) => {
      console.log(' triggered', e.detail)
    })
  }, [])

  return (
    <Layout>
      <NextSeo title="Home" />

      <LocomotiveScrollProvider
        options={{ smooth: false, lerp: 0.05 }}
        containerRef={containerRef}
        watch={[]}
      >
        <PushScrollGlobal />
        <div
          data-scroll-container
          ref={containerRef}
          id="scroll-container"
          className="test test2 test3"
        >
          <div data-scroll-section>
            <ScrollTriggerWrapper animation={animationObj} locomotive={true}>
              <Header />
              <LazyMotion features={domAnimation}>
                <m.div initial="initial" animate="enter" exit="exit">
                  <m.section
                    variants={fade}
                    className="scrollsection h-screen-1/2 w-full flex justify-center items-center p-10 "
                  >
                    <div className="w-full h-full line bg-yellow-200 bg-opacity-0 md:bg-opacity-100"></div>
                    <div className="absolute left-1/2 top 1/2 -translate-x-1/2 -translate-y-1/2 text-xl">
                      {' '}
                      Scroll and Watch the Bar Moves
                    </div>
                  </m.section>
                  <m.main
                    variants={fade}
                    className="mb-12 md:mb-16 xl:mb-24 pt-24 md:pt-20"
                  >
                    <Container>
                      <article>
                        <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl mb-4">
                          LOCOMOTIVE WITH SCROLL TRIGGER NO SMOOTH
                        </h1>
                        <div className="content max-w-3xl mb-4">
                          <h2>Some example content</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate.
                          </p>

                          <p
                            data-scroll
                            data-scroll-repeat
                            data-scroll-call="trigger"
                            className="trigger"
                          >
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>

                          <p>
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>

                          <h2>Some example content</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate.
                          </p>

                          <p>
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>

                          <h2>Some example content</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate.
                          </p>

                          <p
                            data-scroll
                            data-scroll-repeat
                            data-scroll-call="trigger"
                            className="trigger"
                          >
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>

                          <p>
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>

                          <h2>Some example content</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate.
                          </p>

                          <p>
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>

                          <p
                            data-scroll
                            data-scroll-repeat
                            data-scroll-call="trigger"
                            className="trigger"
                          >
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>

                          <h2>Some example content</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate.
                          </p>

                          <p>
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>

                          <p
                            data-scroll
                            data-scroll-repeat
                            data-scroll-call="trigger"
                            className="trigger"
                          >
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>

                          <h2>Some example content</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate.
                          </p>

                          <p>
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>

                          <h2>Some example content</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate.
                          </p>

                          <p>
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>

                          <h2>Some example content</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate.
                          </p>

                          <p>
                            Velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum.
                          </p>
                        </div>

                        <FancyLink
                          destination="/about"
                          a11yText="Navigate to the about page"
                        >
                          About Page
                        </FancyLink>
                      </article>
                    </Container>
                  </m.main>

                  <m.div variants={fade}>
                    <Footer />
                  </m.div>
                </m.div>
              </LazyMotion>
            </ScrollTriggerWrapper>
          </div>
        </div>
      </LocomotiveScrollProvider>
    </Layout>
  )
}
