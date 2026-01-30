import { BrowserRouter, Route, Routes } from "react-router-dom";
import useIdeas from "./Apis/ideas";
import { useEffect } from "react";
import Main from "./Components/Main/main";
import Display from "./Components/UI/Display/display";

import VoiceTest from "./Utils/audioRecorder";

function App() {
  useEffect(() => {
 
  useIdeas()
  }, []);
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<VoiceTest/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
