import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: any
  shadowHtml?: string
}
export const ShadowRoot = (props: Props) => {
  const { shadowHtml, className, children } = props
  const shadowRootRef = useRef<any>(null)
  const [shadowConDom, setShadowConDom] = useState<any>(null)

  useEffect(() => {
    if (shadowRootRef.current) {
      // Attach a shadow root to the div
      const showRootDom = shadowRootRef.current.attachShadow({ mode: 'open' })
      if (shadowHtml) {
        showRootDom.innerHTML = shadowHtml
      }
      const shadowContent = document.createElement('div')
      shadowContent.style.cssText = `width:100%;height:100%;overflow: auto;`
      showRootDom.appendChild(shadowContent)
      setShadowConDom(shadowContent)
    }
  }, [])

  return (
    <div className={className} ref={shadowRootRef}>
      {shadowConDom && createPortal(children, shadowConDom)}
    </div>
  )
}
