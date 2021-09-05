
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
var data=[];
app.use('/get', (req, res) => {
    res.send(
         data
        );

});

app.post('/post',((req,res)=>{
    const a=JSON.stringify(req.body)
    if (a.startsWith("[")) {
      console.log("no");
      req.body.map((a)=>{data.push(a)})//If we send an array of json
      }
    else {  
      console.log("yes");
      data.push(req.body);//If we send an json
      
    }
    if(!data){
    return res.status(400).json({
        error: true,
        message: "send egein"
      });
    }
    return res.json(data)

        
}))

app.listen(8080, () => console.log('API is running on http://localhost:8080'));