import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContacts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/new" element={<AddContact />} />
      </Routes>
    </Router>
  );
}

export default App;
