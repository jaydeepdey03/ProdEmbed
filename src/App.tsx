import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import CreateStore from "./StoreFrontPages/CreateStore";
import ProductEditor from "./StoreFrontPages/ProductEditor";
import Dashboard from "./StoreFrontPages/Dashboard";
import StoreDashboardLayout from "./StoreFrontPages/StoreDashboardLayout";
import Settings from "./StoreFrontPages/Settings";
import ProductsListedPage from "./StoreFrontPages/ProductsListedPage";
import Test from "./Test";
import {StarknetProvider} from "./starknetstuff/starknet-provider";

function App() {
  return (
    <>
      <StarknetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/:id" element={<StoreDashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products/:id" element={<ProductsListedPage />} />
              <Route path="settings/:id" element={<Settings />} />
            </Route>
            <Route path="/create-store" element={<CreateStore />} />
            <Route path="/producteditor/:id" element={<ProductEditor />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </StarknetProvider>
    </>
  );
}

export default App;
