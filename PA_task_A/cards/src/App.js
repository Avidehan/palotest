
import './index.css';
import React, { useState,useEffect } from 'react';
import ShowMoreText from "react-show-more-text";
import Card from './Card.svg'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';




function parseTime(time){
  var date = new Date(time).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
  return date
}


function App() {
  const [isActive, setIsActive] = useState(null);
  const [Data, setData] = useState([]);
  const [content,setCont]=useState();
  
  useEffect(() => {
    fetch("http://localhost:8080/get")
      .then((res) => res.json())
      .then((repos) => {
        setData(repos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function delitem(index){
 
    Data.splice(index,1);
    

  }
  return (
    <div >
      
     
      <div className="accordion">
        
            <div class="title"> {Data.length} Total Erorrs</div>
              {Data.map((data,row_index) => {
                       
                  return (
                    <div className="card">
                          <div className="grid-container" onClick={() =>{
                                        
                                        if (isActive === row_index)
                                        {
                                            setIsActive( null)
                                        }
                                        else
                                        {
                                            setIsActive(row_index)
                                        }

                                        if("details" in data && "tags" in data.details){
                                            setCont( <div className="content"><p><b>Status</b> : {data.details.status} </p> 
                                                                            <p><b>Severity </b>:{data.details.severity}</p> 
                                                                            <p><b>Tags</b> :{JSON.stringify(data.details.tags).replace(/[^a-zA-Z0-9 : ,_ ]/g, " ") }</p></div>)
                                        }
                                        else{
                                            setCont(<div ><img src={Card} height="50px" width="50px"/></div>)
                                        }
                                      }} 
                        
                                        >
                                        <ShowMoreText 
                                                lines={3}
                                                more=""
                                                less=""
                                                className="content-css"
                                                anchorClass="my-anchor-css-class"
                                                expanded={false}
                                                width={250}
                                                truncatedEndingComponent={"... "}  className='grid-item'>{data.resource}</ShowMoreText>
                                                <div className='grid'> {data.category}</div>
                                                <div className='grid-item' > {parseTime(Number(data.creation_date))}</div>
                                                <div className='grid4'> {data.errors}</div>
                                                <div className='grid5'><button onClick={()=>{delitem(row_index) ;}} > <DeleteOutlinedIcon/></button></div>
                                    
                          </div>
                           {
                          isActive===row_index  &&  <div className="content">{content}</div>}
                        </div>
                        )
             })}
     </div>
    </div>
  );
}

export default App;
