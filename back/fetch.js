const express = require('express');
const { spawn } = require('child_process');
const csv = require('csv-parser');
const mysql = require('mysql');
const multer = require('multer');
const fs=require('fs')
const app = express();
const path = require('path');
const port = 5000;
const cors=require('cors');
app.use(express.json());
app.use(cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '../front/public/temp_Pics');
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
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
  const{remainPrice,locations}=req.body;
  const userInput3={
    loacion:locations,
    max_cost:parseFloat(remainPrice/30)
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
app.post('/saveRow', upload.single('image'), (req, res) => {
  const formData = req.body;
  let imagePath=''
  // Check if image was uploaded
  if (req.file) {
      // Manipulate the imagePath to contain only a relative path to the uploaded image
      // formData.imagePath = `../temp_Pics/${req.file.filename}`;
      imagePath=`/temp_Pics/${req.file.filename}`;
  }
  // Format form data into CSV row
  // const csvRow = Object.values(formData).join(',')+'\n' ;
  let csvRow = Object.values(formData).slice(0, -3).join(','); // Exclude the last 3 columns
    csvRow += ',' + imagePath + ','; // Add imagePath
    csvRow += Object.values(formData).slice(-3).join(','); // Add the last 3 columns

    csvRow += '\n'; // Add new line
  // Write CSV row to file
  fs.appendFile('./TrainModel/Bengaluru_House_Data.csv', csvRow, (err) => {
      if (err) {
          console.error('Error writing to CSV file:', err);
          res.status(500).send('Error writing to CSV file');
      } else {
          console.log('Form data saved to CSV file');
          res.send("Successful")
      }
  });
});
app.post('/getDatas',(req,res)=>{
  const {fetchMail}=req.body;
  const userMail=fetchMail.current;
  Promise.all([runPythonScript(JSON.stringify(userMail),"./TrainModel/fetchingMail.py")])
    .then(([rowData]) => {
      const combinedData={
        datas:rowData
      }
      res.send(combinedData)
    })
    .catch((error) => {
      console.error(`Error processing request: ${error.message}`);
      res.status(500).json({ error: error.message });
    });
})
// const csvParser = require('csv-parser');
app.delete('/deleteRow', (req, res) => {
  const deletedRow = req.body;
  console.log(deletedRow)
  parseInt(deletedRow.total_sqft)
  // Specify the path to your CSV file
  const filePath = './TrainModel/Bengaluru_House_Data.csv';

  // Array to hold updated rows
  const updatedRows = [];

  // Flag to skip the first row (headers)
  let isFirstRow = true;

  // Read the CSV file and filter out the deleted row
  let count=0;
  fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
          if (isFirstRow) {
              // Preserve the first row (headers)
              updatedRows.push(row);
              isFirstRow = false;
          } else {
              row.total_sqft = parseInt(row.total_sqft);
              row.bath = parseInt(row.bath);
              row.balcony = parseInt(row.balcony);
              row.price = parseFloat(row.price);
              row.contact_number = parseInt(row.contact_number);

              // Check if the row matches the deleted row
              if (JSON.stringify(row) !== JSON.stringify(deletedRow)) {
                  updatedRows.push(row);
                  if(count<1)
                  {
                    console.log(JSON.stringify(row),JSON.stringify(deletedRow))
                    count+=1
                  }
              }
              else if(JSON.stringify(row) === JSON.stringify(deletedRow))
                console.log("match found")
          }
      })
      .on('end', () => {
          // Write the updated rows back to the CSV file
          const writableStream = fs.createWriteStream(filePath);
          // Write headers
          writableStream.write(Object.keys(updatedRows[0]).join(',') + '\n');
          // Write data rows
          updatedRows.forEach((row) => {
              // Correctly format the address field
              const correctedAddress = row.address.includes(',') ? `"${row.address}"` : row.address;
              // Reconstruct the row with the corrected address field
              const reconstructedRow = { ...row, address: correctedAddress };
              writableStream.write(Object.values(reconstructedRow).join(',') + '\n');
          });
          writableStream.end();
          console.log('Row deleted successfully');
          res.status(200).send('Row deleted successfully');
      })
      .on('error', (error) => {
          console.error('Error deleting row:', error);
          res.status(500).send('Error deleting row');
      });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
