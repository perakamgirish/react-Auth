import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedContent1 from "./pages/ProtechtedContent1";
import ProtectedContent2 from "./pages/ProtechtedContent2";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/protected-content1"
          element={
            isAuthenticated ? <ProtectedContent1 /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/protected-content2"
          element={
            isAuthenticated ? <ProtectedContent2 /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
