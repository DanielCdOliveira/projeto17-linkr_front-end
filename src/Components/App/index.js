import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../../Assets/globalStyle.js";
import AuthProvider from "../../Context/Auth.js";

import LogIn from "../LogIn/index.js";
import Register from "../SignUp/index.js";
import Timeline from "../Timeline/index.jsx";
import HashtagPage from "../HashtagPage/index.jsx";
import UsersPage from "../UsersPage/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="/sign-up" element={<Register />}></Route>
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
        <Route path="/user/:id" element={<UsersPage/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;