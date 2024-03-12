import axios from 'axios';
import { useState } from 'react'

function Form({ setWords }) {

  const [ url, setUrl ] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/products/wordcloud', { url });
        const fetchedWords = response.data.map(word => ({ text: word[0], value: word[1] }));
        setWords(fetchedWords);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <button type="submit">Generar Nube de Palabras</button>
      </form>
    </div>
  )
}

export default Form