import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "@pages/root";
import LoginPage from "@pages/auth/login";
import SignupPage from "@pages/auth/signup";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/:id" element={<RootPage />} />
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
