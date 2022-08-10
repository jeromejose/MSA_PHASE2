import { useState} from 'react';
import axios from "axios";
import './App.css';
import { ChakraProvider,Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Box, Center } from '@chakra-ui/react'
// fetch and 
function App() {
  const [characterName, setCharacterName] = useState<undefined | any>(undefined);
  const [characterInfo, setCharacterInfo] = useState<undefined | any>(undefined);
  const GENSHIN_BASE_API_URL = "https://api.genshin.dev";
  const [currentCharacterName, setCurrentCharacterName] = useState("");

  return (
    <ChakraProvider>
    <div>
      <h1 style={{fontSize:40, textAlign:'center',}}>Genshin Character Search</h1>

      <div>
        <label style={{textAlign:'center'}}>Character Name</label>
        <br />
        <input style={{textAlign:'center'}}
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
          <img width="280" height="auto" style ={{alignSelf:'center'}}src={GENSHIN_BASE_API_URL + "/characters/" + currentCharacterName + "/card"} />
          <h1>Description:</h1>
          <p>{characterInfo.description}</p>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  About
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            Affiliation: {characterInfo.affiliation} <br/>
            Vision: {characterInfo.vision} <br/>
            Weapon: {characterInfo.weapon}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Constellations
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            {characterInfo.constellation}
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
    axios.get(GENSHIN_BASE_API_URL + "/characters/" + characterName)
    .then(res => {
      setCharacterInfo(res.data)
      console.log(res.data)
      })
    .catch(err =>{
      console.log(err.message);
      setCharacterInfo(undefined);
    });
  }
}

export default App;
