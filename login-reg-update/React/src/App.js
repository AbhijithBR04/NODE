import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Update from "./Update";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register></Register>}></Route>
      <Route path="login" element={<Login></Login>}></Route>
      <Route path="update" element={<Update></Update>}></Route>
    </Routes>
  );
}

export default App;
