import { useState } from "react";
import ReactWordcloud from "react-wordcloud";
import axios from "axios";

function WordCloud() {
 const [url, setUrl] = useState('');   
 const [words, setWords] = useState([]);
 const [ errorMessage, setErrorMessage ] = useState('');
 const [ isLoading, setIsLoading ] = useState(false);
 const [ error, setError ] = useState('');  

 const handleSubmit = async (event) => {
    event.preventDefault();
    if(!url || url.trim() ===''){
        setErrorMessage('Please enter a valid url');
        return;
    }
    setErrorMessage('');
    setIsLoading(true);
    try {
        const response = await axios.post(`http://localhost:5000/api/products/wordcloud?url=${url}`)
        const fetchedWords = response.data.map(word => ({ text: word[0], value: word[1] }));
        console.log("Fetched Words:", fetchedWords);

        const duplicateWords = [ ...words, ...fetchedWords ].reduce((acc, word) => {
          const existingWord = acc.find(w => w.text === word.text);
          if(existingWord) {
            existingWord.value += word.value;
          } else {
            acc.push(word);
          }
          return acc;
        }, []);

        console.log("Duplicate Words:", duplicateWords);
        setWords(duplicateWords);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
 }

 return (
    <>
        <form className="sc_form" action="" onSubmit={handleSubmit}>
            <label htmlFor="">URL:</label>
            <input 
            className={errorMessage.length === 0 ? `sc_url` : `sc_url sc_error`} 
            placeholder="Insert a amazon product url..." 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            />
            <button type="submit">Submit</button>
        </form>
        {errorMessage && <p className="sc_error">{errorMessage}</p>}
        {isLoading ? (
        <p>Loading...</p>
        ) : (
        <ReactWordcloud 
          words={words} 
          options={{
            rotations: 2,
            rotationAngles: [0, 0],
            fontFamily: 'Arial',
            fontSizes: [24, 120],
            fontStyle: 'normal',
            fontWeight: 'normal',
            deterministic: true
          }}        
        />
      )}
    </>
 )
}

export default WordCloud
