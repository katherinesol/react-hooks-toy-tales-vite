// App - Main component with toys state and CRUD functions

import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(res => res.json())
      .then(data => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const addToy = (newToy) => {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then(res => res.json())
      .then(data => setToys(prevToys => [...prevToys, data]));
  };

  const deleteToy = (id) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(() => setToys(prevToys => prevToys.filter(toy => toy.id !== id)));
  };

  const likeToy = (id) => {
    const toy = toys.find(t => t.id === id);
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then(res => res.json())
      .then(updatedToy => {
        setToys(prevToys => prevToys.map(t => t.id === updatedToy.id ? updatedToy : t));
      });
  };

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} likeToy={likeToy} />
    </>
  );
}

export default App;