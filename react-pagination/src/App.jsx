import './App.css'
import { useState, useEffect } from 'react'
import ProductDetail from './components/ProductDetail';

function App() {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     const response = await fetch('https://dummyjson.com/products?limit=100');
  //     const data = await response.json();
  //     setData(data);
  //   }
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(currentPage-1) * 10}`);
      const data = await response.json();
      console.log("DATA : ",data);
      setData(data);
    }
    fetchProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(data.total / 10);

  return (
    <div className="App">
      <h1 className="product-title">Product List</h1>
      <div className="product-card">
        {/* {data.products && data.products.slice((currentPage - 1) * 10, currentPage * 10).map((product) => (
          <ProductDetail key={product.id} product={product} />
        ))} */}
        {data.products && data.products.map((product) => (
          <ProductDetail key={product.id} product={product} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default App
