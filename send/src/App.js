import { useState } from 'react';
import './App.css';
function isJson(string){
  try{
    JSON.parse(string)
  }
  catch(arr){
    return false;
  }
  return true;
}
function App() {
  
  const [data,setdata]=useState();
  const [arr,setArr]=useState ();
  const [but,setBut]=useState();
  const server_post = () => {
    let a=JSON.parse(data);
    fetch("http://localhost:8080/post",
      { method: 'POST',
        headers: { 'Content-type': 'application/json' }, 
        body: JSON.stringify(a) })
           .then((res) => res.json()).then((repos) => console.log(repos)) }
  return (
    <div>
      <h1>Welcome</h1>
      <textarea  onChange={(e) =>{if(isJson(e.target.value)){
                                    setdata(e.target.value)
                                    setArr(<button onClick={server_post}>Click to send the data</button>)
                                  }
                                   else{
                                    setArr(<strong>This field only accepts json</strong>)
                                   }} }
        />
      
      {arr}
    </div>
  );
}


export default App;