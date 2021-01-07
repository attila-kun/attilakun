import {init} from "bloch";
import React, { useEffect } from "react"

const BlochPage = () => {

  useEffect(() => {
    init();
  }, []);

  return (
    <div></div>
  );
};

export default BlochPage
