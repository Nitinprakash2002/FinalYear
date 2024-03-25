const express = require('express');
const { spawn } = require('child_process');
const mysql = require('mysql');
const fs=require('fs')
const app = express();
const path = require('path');
const port = 5000;
const cors=require('cors');
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'finalyear'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});
const createTable = `CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL PRIMARY KEY,
  password VARCHAR(255) NOT NULL
)`;
const jsonFilePath = './jsonFiles/places.json';
// Function to run the Python script
function runPythonScript(inputData,scriptsName) {
  return new Promise((resolve, reject) => {
   const pythonProcess = spawn('python', [scriptsName]);

    let dataBuffer= '';

    pythonProcess.stdout.on('data', (data) => {
      dataBuffer += data.toString();
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error executing Python script: ${data}`);
      reject(new Error('An error occurred while processing your request.'));
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(dataBuffer);
      } else {
        console.error(`Python script exited with code ${code}`);
        reject(new Error('An error occurred while processing your request.'));
      }

    });

    // Send input data to the Python script
    pythonProcess.stdin.write(inputData);
    pythonProcess.stdin.end();
  });
}
app.post('/secondPage',(req,res)=>{
  const {user,emails,password}=req.body;
  db.query('SELECT email from Users where email=?',[emails],(err,result)=>
  {
    if(result.length>0)
    {
      res.send("present");
    }
    else if(result.length==0)
    {
      console.log(result.length);
      db.query('INSERT INTO Users VALUES(?,?,?)',[user,emails,password],(err,result)=>
      {
        if(err)
          console.log("Error Occured:",err);
        else if(result){
          res.send('saved');
          console.log("Account Successfully Saved");
        }
      })
    }
    else if(err)
    {
      res.send("Error");
    }
  })
})
db.query(createTable, (err, result) => {
  if (err) {
    throw err;
  }
  console.log('Users table created or already exists');
});
app.post('/users', (req, res) => {
  const{loginEmail,loginPass}=req.body;
  const sql = 'SELECT * FROM users where email=? AND BINARY password=?';
  db.query(sql,[loginEmail,loginPass], (err, result) => {
    if (err) throw err;
    else if(result.length>0)
    {
      res.send("exist");
    }
    else
      res.send("non-existant");
  });
});
// POST endpoint to get recommendations
app.post('/getRecommendations', (req, res) => {
  const{tempPrice,locations}=req.body;
  const userInput = {
    field1: parseFloat(tempPrice),
    field2: locations
  };
  const userInput2=userInput.field2
  const data={
    loacion:locations,
    max_cost:parseFloat(tempPrice*10)
  }
  Promise.all([runPythonScript(JSON.stringify(userInput),"./TrainModel/model.py"),runPythonScript(JSON.stringify(userInput2),"./TrainModel/model2.py"),runPythonScript(JSON.stringify(data),"./TrainModel/RFR.py")])
    .then(([recommendations,recommendations2,datas]) => {
      const combinedData={
        houseRent:recommendations,
        transport:recommendations2,
        datas:datas
      }
      
      res.send(combinedData)
    })
    .catch((error) => {
      console.error(`Error processing request: ${error.message}`);
      res.status(500).json({ error: error.message });
    });
});
app.post('/getRecommendation1',(req,res)=>{
  const{tempPrice,locations}=req.body;
  const userInput1= {
    field1: parseFloat(tempPrice),
    field2: locations
  };
  Promise.all([runPythonScript(JSON.stringify(userInput1),"./TrainModel/model.py")])
  .then(([recommendations]) => {
    const combinedData={
      houserents:recommendations
    }
    res.send(combinedData)
  })
  .catch((error) => {
    console.error(`Error processing request: ${error.message}`);
    res.status(500).json({ error: error.message });
  });
});
app.post('/getRecommendation2',(req,res)=>{
  const{locations}=req.body
  const userInput2=locations
  Promise.all([runPythonScript(JSON.stringify(userInput2),"./TrainModel/model2.py")])
  .then(([recommendations2]) => {
    const combinedData={
      transports:recommendations2
    }
    res.send(combinedData)
  })
  .catch((error) => {
    console.error(`Error processing request: ${error.message}`);
    res.status(500).json({ error: error.message });
  });
});
app.post('/getRecommendation3',(req,res)=>{
  const{tempPrice,locations}=req.body;
  const userInput3={
    loacion:locations,
    max_cost:parseFloat(tempPrice*10)
  }
  Promise.all([runPythonScript(JSON.stringify(userInput3),"./TrainModel/RFR.py")])
  .then(([datas]) => {
    const combinedData={
      restaurants:datas
    }
    res.send(combinedData)
  })
  .catch((error) => {
    console.error(`Error processing request: ${error.message}`);
    res.status(500).json({ error: error.message });
  });
});
app.post('/getRecommendation', (req, res) => {
  const{price,location}=req.body;
  const data={
    loacion:location,
    max_cost:parseFloat(price)
  }
  Promise.all([runPythonScript(JSON.stringify(data),"./TrainModel/RFR.py")])
    .then(([datas]) => {
      const combinedData={
        datas:datas
      }
      res.send(combinedData)
    })
    .catch((error) => {
      console.error(`Error processing request: ${error.message}`);
      res.status(500).json({ error: error.message });
    });
});
app.get('/getResults',(req,res)=>{
  const filePath = path.join(__dirname, jsonFilePath);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send('Error reading JSON file');
    }
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Send the JSON data as the response
      res.json(jsonData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Error parsing JSON');
    }
  })
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
