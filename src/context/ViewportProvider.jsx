import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const ViewportContext = createContext()

const MOBILE_BREAKPOINT = '(max-width: 768px)'

export function ViewportProvider({ children }) {
const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
    return window.matchMedia(MOBILE_BREAKPOINT).matches
    }
    return false
})

useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT)
    
    const handleChange = (e) => setIsMobile(e.matches)

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
}, [])

const value = useMemo(() => ({ isMobile }), [isMobile])

return (
    <ViewportContext.Provider value={value}>
    {children}
    </ViewportContext.Provider>
)
}

export function useViewport() {
const context = useContext(ViewportContext)
if (!context) {
    throw new Error('useViewport deve ser usado dentro de um ViewportProvider')
}
return context;
}