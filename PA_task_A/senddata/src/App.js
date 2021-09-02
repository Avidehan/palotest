import './App.css';


const data =require('./data.json');
function App() {


  const server_post = () => {
    fetch("http://localhost:8080/post",
      { method: 'POST', headers: { 'Content-type': 'application/json' }, 
         body: JSON.stringify(data) })
           .then((res) => res.json()).then((repos) => console.log(repos)) }
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={server_post}>send data</button>
    </div>
  );
}

export default App;