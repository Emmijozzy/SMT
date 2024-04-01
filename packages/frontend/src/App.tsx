// import { QueryPayload } from "backend/src/index";
import { useState } from "react";
// import viteLogo from "../../../vite.svg";
import "./styles/App.css";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  // const handleClick = (): void => {
  //   fetch("https://first-back-end.onrender.com/data", {})
  //     .then((r) => r.json())
  //     .then((data: QueryPayload) => console.log(data.foo))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const arr = [1, 2];

  // console.log(arr);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((precount) => precount + 1)}>
          count is {count}
        </button>
        {/* <button type="button" onClick={() => handleClick()}>
          Get data
        </button> */}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
