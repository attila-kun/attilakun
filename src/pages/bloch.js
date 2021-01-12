import React, { useEffect } from "react"
import {init} from "bloch"

const css = `
body > div {
  display: grid;
  place-items: center center;
}

fieldset {
  width: 472px;
  border: 1px solid #ddd;
}

#matrixContainer > div + div {
  margin-top: 6px;
}

#canvasRoot {
  position: relative;
  margin-top: 5px;
}

#buttonContainer {
  position: absolute;
  top: 10px;
  left: 10px;
}`;

const BlochPage = () => {

  useEffect(() => {
    init(
      document.getElementById("stateContainer"),
      document.getElementById("matrixContainer"),
      document.getElementById("canvasContainer"),
      document.getElementById("buttonContainer"),
    );
  }, []);

  return (
    <div>
      <div>
        <style>{css}</style>
        <fieldset id="stateContainer">
          <legend>Quantum state:</legend>

        </fieldset>
        <fieldset id="matrixContainer">
          <legend>Enter a unitary matrix:</legend>
        </fieldset>
        <div id="canvasRoot">
          <div id="buttonContainer"></div>
          <div id="canvasContainer"></div>
        </div>
      </div>
    </div>
  )
}

export default BlochPage
