import { useRef } from 'react'
import './App.css'
import PreLoader from './components/PreLoader/PreLoader'

// GSAP Imports
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

// Context Import
import { useViewport } from './context/ViewportProvider'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

function App() {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  const { isMobile } = useViewport()

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: isMobile ? 0 : 1.5, 
      effects: true,
    })
  }, [isMobile]) 

  return (
    <main id="smooth-wrapper" ref={wrapperRef}>
      <PreLoader isMobile={isMobile} />

      <div id="smooth-content" ref={contentRef}>
      </div>
    </main>
  )
}

export default App