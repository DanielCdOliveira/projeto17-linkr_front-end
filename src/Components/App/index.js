import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../../Assets/globalStyle.js";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
            
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;