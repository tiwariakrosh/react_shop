import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="content-wrapper">
          <div className="details-pane">
            <Routes>
              <Route
                path="*"
                element={
                  <div className="placeholder">
                    Select a product to view details
                  </div>
                }
              />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </div>
          <div className="list-pane">
            <ProductList />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
