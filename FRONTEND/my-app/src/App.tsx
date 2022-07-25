import { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterInfo, setCharacterInfo] = useState<undefined | any>(undefined);
  const GENSHIN_BASE_API_URL = "https://api.genshin.dev";
  const [currentCharacterName, setCurrentCharacterName] = useState("");
  return (
    <div>
      <h1>Character Search</h1>

      <div>
        <label>Pokemon Name</label>
        <br />
        <input
          type="text"
          id="character-name"
          name="character-name"
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <br />
        <button onClick={search}>Search</button>
      </div>

      <p>You have entered {currentCharacterName}</p>

      {characterInfo === undefined ? (
        <p>Character not found</p>
      ) : (
        <div id="pokemon-result">
          <img src={GENSHIN_BASE_API_URL + "/characters/" + currentCharacterName + "/card"} />
        </div>
      )}
    </div>
  );

  function search() {
    setCurrentCharacterName(characterName);
    axios.get(GENSHIN_BASE_API_URL + "/characters/" + characterName + "/card").then((res) => {
      setCharacterInfo(res.data);
    });
  }
}

export default App;
