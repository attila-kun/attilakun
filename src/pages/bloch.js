import React, { useEffect } from "react"
import {init} from "bloch"

const BlocPage = () => {

  useEffect(() => {
    init();
  }, []);

  return (
    <div></div>
  )
}

export default BlocPage
