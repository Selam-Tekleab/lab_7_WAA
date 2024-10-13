
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    
    fetch('./db.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  return (
    <div>
      <h1>Selam </h1>
      <h2>Tewelde</h2>
      <h3>FOTO</h3>

      {data ? (
        <div>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Age:</strong> {data.age}</p>
          <p><strong>City:</strong> {data.city}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
