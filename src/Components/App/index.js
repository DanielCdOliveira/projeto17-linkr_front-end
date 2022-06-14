import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../../Assets/globalStyle.js";
import AuthProvider from "../../Context/Auth.js";

import LogIn from "../LogIn/index.js";
import Register from "../SignUp/index.js";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="/sign-up" element={<Register />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;