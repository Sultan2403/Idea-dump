import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./Components/Main/main";
import Display from "./Components/UI/Display/display";

import VoiceTest from "./Utils/audioRecorder";
import ViewIdea from "./Components/UI/Display/viewIdea";
import Edit_Idea from "./Components/UI/Display/editIdea";

function App() {
  return (
    <BrowserRouter basename="/Idea-dump">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Display />} />
          <Route path="voice" element={<VoiceTest />} />
          <Route path="idea/:ideaId" element={<ViewIdea />} />
          <Route path="idea/edit/:ideaId" element={<Edit_Idea />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
