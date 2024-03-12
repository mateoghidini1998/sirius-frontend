import './App.css';
import Form from './Components/Form';
import WordCloud from './Components/WordCloud';

function App() {
 const data = [
    { text: 'Hello', value: 10 },
    { text: 'World', value: 20 },
    // Add more words as needed
 ];
 const width = 500;
 const height = 500;

 return (
    <>
      {/* <Form/> */}
      <WordCloud data={data} width={width} height={height} />
    </>
 );
}

export default App;
