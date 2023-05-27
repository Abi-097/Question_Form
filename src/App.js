import "./App.css";
import { React } from "react";
import PgFour from "./Components/Page/PgFour";
import PgOne from "./Components/Page/PgOne";
import PgThree from "./Components/Page/PgThree";
import PgTwo from "./Components/Page/PgTwo";
import PgFive from "./Components/Page/PgFive";

import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to={"/home"} />} key={"home"} />
        <Route path={"/home"} element={<PgOne />} key={"p1"} />
        <Route path={"/page2"} element={<PgTwo />} key={"p2"} />
        <Route path={"/page3"} element={<PgThree />} key={"p3"} />
        <Route path={"/page4"} element={<PgFour />} key={"p4"} />
        {/* <Route path={'/page5'} element={ <PgFive/> } key={'p4'}/>    // this line for an additional page which is written for all 20 questions 60 mins.  */}
      </Routes>
    </div>
  );
}

export default App;
