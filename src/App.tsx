import { BrowserRouter, Route, Routes } from "react-router";
import MoveDetailPage from "./pages/MoveDetailPage";
import MoveListPage from "./pages/MoveListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoveListPage />} />
        <Route path="/moves/:id" element={<MoveDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
