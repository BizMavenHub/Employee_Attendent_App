import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Home_Page from "./pages/Home_Page.jsx";
import Login_Page from "./pages/Login_Page.jsx";
import Profile_Page from "./pages/Profile_Page.jsx";
import Create_Record_Page from "./pages/CreateRecord_Page.jsx";

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <Routes>
          <Route path="/" element={<Home_Page />} />
          <Route path="/login" element={<Login_Page />} />
          <Route path="/profile" element={<Profile_Page />} />
          <Route path="/create-record" element={<Create_Record_Page />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
