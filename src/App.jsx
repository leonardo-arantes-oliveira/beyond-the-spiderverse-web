import { useRef } from 'react'
import './App.css'

// GSAP Imports
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

// Context Import
import { useViewport } from './context/ViewportProvider'
import Hero from './sections/Hero/Hero'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

function App() {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  const { isMobile } = useViewport()

  useGSAP(() => {
      if (isMobile) return
      ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.5,
        effects: true,
      })
    },
    { dependencies: [isMobile], scope: wrapperRef }
  )

  return (
    <main id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        <Hero isMobile={isMobile} />
      </div>
    </main>
  )
}

export default App