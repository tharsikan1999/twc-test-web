import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContacts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./protectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/contacts"
          element={<ProtectedRoute element={<Contacts />} />}
        />
        <Route
          path="/contacts/new"
          element={<ProtectedRoute element={<AddContact />} />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
