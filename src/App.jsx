import React, { useState, useEffect } from 'react';
import { fetchDataWithThen, fetchDataWithAsyncAwait } from './api';
import './App.css';

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAsync, setIsAsync] = useState(true);

  useEffect(() => {
    if (isAsync) {
      fetchDataWithAsyncAwait().then(data => setCryptoData(data));
    } else {
      fetchDataWithThen().then(data => setCryptoData(data));
    }
  }, [isAsync]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredData = cryptoData.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.symbol.toLowerCase().includes(searchTerm)
  );

  const sortByMarketCap = () => {
    const sorted = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    setCryptoData(sorted);
  };

  const sortByPercentageChange = () => {
    const sorted = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    setCryptoData(sorted);
  };

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <div className="controls">
        <input
          type="text"
          placeholder="Search By Name or Symbol"
          onChange={handleSearch}
          style={{ marginBottom: "10px" }}
        />
        <button onClick={sortByMarketCap}>Sort By Mkt Cap</button>
        <button onClick={sortByPercentageChange}>Sort by % Change</button>
      </div>

      <table>
       
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td><img src={item.image} alt={item.name} width="25" /></td>
              <td>{item.name}</td>
              <td>{item.symbol.toUpperCase()}</td>
              <td>${item.current_price.toFixed(2)}</td>
              <td>${item.total_volume.toLocaleString()}</td>
              <td style={{ color: item.price_change_percentage_24h > 0 ? "green" : "red" }}>
                {item.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>Mkt Cap : ${item.market_cap.toLocaleString()}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
