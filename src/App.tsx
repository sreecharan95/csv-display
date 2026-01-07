import { Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import TablePage from "./pages/TablePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/table" element={<TablePage />} />
    </Routes>
  );
}

export default App;
