import React, { useEffect } from "react"
import {init} from "bloch"

const BlochPage = () => {

  useEffect(() => {
    init();
  }, []);

  return (
    <div></div>
  )
}

export default BlochPage
