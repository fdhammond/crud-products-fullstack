import { Navbar } from './components/Navbar';
import { NewProduct } from './components/NewProduct';
import { ProductsPage } from './pages/ProductsPage';
import { Route, Routes } from 'react-router-dom';
import { EditProductPage } from './pages/EditProductPage';
import { ViewProductPage } from './pages/ViewProductPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="/products/:id/edit" element={<EditProductPage />} />
        <Route path="/products/:id" element={<ViewProductPage />} />
      </Routes>
    </>
  )
}

export default App
