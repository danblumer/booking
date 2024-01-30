import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultPage from "./pages/Default";
import Checkout from "./pages/Checkout/index";
import MyReservations from "./pages/MyReservations/index";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/mybooking" element={<MyReservations />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}
