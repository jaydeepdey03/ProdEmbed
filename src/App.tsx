import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import CreateStore from "./CreateStore";
import ProductEditor from "./ProductEditor";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/contract/:id" element={<EachContractPage />} /> */}
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/create-store" element={<CreateStore />} />
          <Route path="/producteditor/:id" element={<ProductEditor />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
