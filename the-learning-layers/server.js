require('./database'); //calls the database connection

const app = require('express')(); 
const cors=require('cors');
const port = 4000;
app.use(cors());

const bodyParser=require('express').json; //helps in sending our schema to JSON

//used in developing the links for sending data
const adminRouter=require('./api/adminRoutes');

 app.use(bodyParser());
 app.use('/admin',adminRouter) //telling our app to use this route when sending a request

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

//run node server.js on the terminal for connection to database
//create a new terminal and run npm start when connected to front end