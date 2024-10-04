// src/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://api.example.com/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <ul className="list-none mb-4">
        {currentItems.map((product) => (
          <li key={product.id} className="mb-2">
            <div className="flex items-center">
              <img src={product.image} alt={product.name} className="w-20 h-20 mr-4" />
              <div>
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;