import { useState } from 'react'
import './App.css'
import PreLoader from './components/PreLoader/PreLoader'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)



function App() {
  const wrapperRef = useRef()
  const contentRef = useRef()

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
    })
  }, [])

  return (
    <main id='smooth-wrapper' ref={wrapperRef}>
      <PreLoader/>
      <div id="smooth-content" ref={contentRef}>

      </div>
    </main>
  )
}

export default App
