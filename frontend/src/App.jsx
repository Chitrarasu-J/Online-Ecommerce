import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import TemplateDetails from "./pages/TemplateDetails";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/templates" element={<Templates />} />
  <Route path="/template/:id" element={<TemplateDetails />} />

</Routes>
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
