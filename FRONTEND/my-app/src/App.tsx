import { useState} from 'react';
import axios from "axios";
import './App.css';
import { ChakraProvider,Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Box } from '@chakra-ui/react'
// fetch and 
function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterInfo, setCharacterInfo] = useState<undefined | any>(undefined);
  const GENSHIN_BASE_API_URL = "https://api.genshin.dev";
  const [currentCharacterName, setCurrentCharacterName] = useState("");
  return (
    <ChakraProvider>
    <div>
      <h1>Genshin Character Search</h1>

      <div>
        <label>Character Name</label>
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
        <p style={{fontSize:20}}>Character not found</p>
      ) : (
        <div id="character-result">
          <img width="280" height="auto"src={GENSHIN_BASE_API_URL + "/characters/" + currentCharacterName + "/card"} />
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Best Artifacts
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Teams
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </AccordionPanel>
          </AccordionItem>
      </Accordion>
        </div>
      )}
    </div>
    
    </ChakraProvider>
  );

  function search() {
    setCurrentCharacterName(characterName);
    axios.get(GENSHIN_BASE_API_URL + "/characters/" + characterName + "/card").then((res) => {
      setCharacterInfo(res.data);
      console.log(res.data);
    });
  }
}

export default App;
