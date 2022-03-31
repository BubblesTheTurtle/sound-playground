import React, { useEffect, useRef } from 'react'
import functionPlot from 'function-plot'


export const FunctionPlot = React.memo(({ options }) => {
  const rootEl = useRef(null)

  useEffect(() => {
    try {
      functionPlot(Object.assign({}, options, { target: rootEl.current }))
    } catch (e) {}
  })

  return (<div ref={rootEl} />)
}, () => false)