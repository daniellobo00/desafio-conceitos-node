import React from "react";
import { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

    useEffect(() => {
      api.get('/repositories').then(response => {
        setRepositories(response.data);

      });
    }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Sei la",
      url: "qualquercoisa.com",
      techs: "pagofunk",
    });
    
    const repository = response.data;

    setRepositories([ ...repositories, repository])

  }

  async function handleRemoveRepository(id) {
    //console.log('teste se esta clicando')
    await api.delete('repositories/' + id)

    var item = document.getElementById(id);
    item.parentNode.removeChild(item);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(repository => <li id={repository.id} key={repository.id}>{repository.title} <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
