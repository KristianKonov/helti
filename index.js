const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
var fs = require('fs');

const app=express().use('*', cors());

app.options('*', function (req,res) { res.sendStatus(200); });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.get('/', (req,res) => {
    
})

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
  

  app.post('/api/register', (req, res, next) => {
    console.log(req.body);
    console.log(req.body.name);
    const response = {
      success: true,
      code: 200,
      message: 'Data from backend',
      data: req.body
    }
    res.status(200).send(response);

    var config = {
    method: 'post',
    url: 'http://localhost:8080/api/registration/register',
    headers: { 
        'accept': '*/*', 
        'Content-Type': 'application/json'
    },
    data: req.body
    };
    
    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
    
    next()

    // var axios = require('axios');

    

    // next()
  })

  app.options('/api/login', cors())
  app.post('/api/login', cors(), async (req, res) => {
    var axios = require('axios');

    var data = req.body;
    var config = {
      method: 'post',
      url: 'http://localhost:8080/login',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        withCredentials: true,
        'Access-Control-Allow-Origin': '*'
      },
      data : data
    };

    async function LoginValidation() {
      try {
        const response = await axios(config);
        console.log('            ')
        console.log('            ')
        console.log('            ')
        console.log('            ')
        console.log('            ')
        console.log(response.status)
        console.log('            ')
        console.log('            ')
        console.log('            ')
        console.log('            ')
        console.log('            ')
        res.status(200).send(response)
      } catch (error) {
        console.log(error)
      }
    }

    if(req.body) {
      LoginValidation()
    } else {
      res.status(404).send('lol')
    }

    // console.log(req.body)
    
    
    
    // axios(config)
    // .then(response => {
      
    //   console.log(response);
    //   res.status(200).json(response.headers);
    // })
    // .catch((error) => {
    //   console.log(error);
    //   // res.status(403).json('wrong');
    // });
    
    // const responseData = {
    //   success: true,
    //   code: 200,
    //   message: 'Data from backend',
    //   data: req.body
    // }

    // res.status(200).json(responseData)
    // next()
  })

app.get('/api/users', (req,res) => {
    var axios = require('axios');
    
    var config = {
    method: 'get',
    url: 'http://localhost:8080/api/admin/all',
    headers: { 
        'accept': '*/*', 
        'Authorization': 'Basic dGVzdHVzZXJAZ21haWwuY29tOnBhc3N3b3Jk', 
        'Cookie': 'JSESSIONID=DDF2BBEEA82647D79BFEAFD4FA35966F'
    }
    };

    axios(config)
    .then(function (response) {
    res.json(response.data);
    })
    .catch(function (error) {
    console.log(error);
    });
})

app.listen(8000, () => console.log(`Server is running on port ${PORT}`))