import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Home_Page from "./pages/Home_Page.jsx";
import Login_Page from "./pages/Login_Page.jsx";
import Profile_Page from "./pages/Profile_Page.jsx";

// import AddEmployee from "./pages/admin/AddEmployee.jsx";
import PersonalStatistic from "./pages/admin/PersonalStatistic.jsx";
import SearchUserStatistic from "./pages/admin/SearchUserStatistic.jsx";

import IsLoginRoute from "./components/IsLoginRoute.jsx";
import IsAdminRoute from "./components/IsAdminRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <Routes>
          <Route path="/" element={<Home_Page />} />
          <Route path="/login" element={<Login_Page />} />
          <Route element={<IsLoginRoute />}>
            <Route path="/profile" element={<Profile_Page />} />
          </Route>
          <Route element={<IsAdminRoute />}>
            {/* <Route path="/add-employee" element={<AddEmployee />} /> */}
            <Route path="/personal-statistic" element={<PersonalStatistic />} />
            <Route
              path="/search-user-statistic"
              element={<SearchUserStatistic />}
            />
          </Route>
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
