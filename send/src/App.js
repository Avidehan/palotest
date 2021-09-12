import {  useState } from 'react';
import './App.css';

const test =require('./data.json')

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
  
  
  const [Comment,setComment] = useState();

  function server_post(data)  {
    fetch("http://localhost:8080/post",
      { method: 'POST',
        headers: { 'Content-type': 'application/json' }, 
        body: JSON.stringify(data) })
           .then((res) => res.json()).then((repos) => console.log(repos))
         
        }
   
   
  return (
    <div>
      <button class="b" onClick={()=>{server_post(test)}}>Sending information from the file</button>
    <div>
      <h2>Write the information inside the square </h2>
      <p><b>-	Resource</b> - string</p>
      <p><b>-	Category</b> - IAM, Logging,Monitoring, Networking, Kubernetes, General, Serverless, Elasticsearch, Storage, Secrets, Public, Vulnerabilities</p>
      <p><b>-	Errors</b> - the number of errors per request</p>
      <p><b>-	Creation Data</b> - timestamp</p>
      <p><b>-	Details</b> <b>-	Severity</b> - critical, high, medium, low</p>
                            <p class="a"><b>-	Status</b> - error, suppressed, passed</p>
                            <p class="a"><b>-	Tags</b> - an array of key-value object </p>
      <textarea  onChange={(e) =>
      {if(isJson(e.target.value)){
                                    
            const a=JSON.parse(e.target.value);
            if(!("resource" in a) ||!("category" in a)||!("creation_date" in a)||!("details" in a)){
                setComment(<strong>missing "resource"  or "details" or "creation_date" or "category"</strong>)
                }
            else{  
                if(!("errors" in a))
                    a["errors"]=1;
                setComment(<button class="a"onClick={()=>{server_post(a)}}>Click to send the data</button>)
                }
      }
      else{
          setComment(<strong>This field only accepts json</strong>)}} }/>
       <div >
      {Comment}
    
       </div>
      
    </div>
    </div>
   
  );
}


export default App;