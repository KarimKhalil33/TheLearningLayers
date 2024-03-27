
require('./database');

const app = require('express')();
const cors=require('cors');
const port = 4000;
app.use(cors());

const bodyParser=require('express').json;

const userRouter=require('./api/routes');
const pendingEnrollmentsRoutes = require('./api/enrolmentRoute');

 app.use(bodyParser());
 app.use('/user',userRouter);
 app.use('/api/enrolmentRoute', pendingEnrollmentsRoutes);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});


//run node server.js on the terminal for connection to database
//create a new terminal and run npm start when connected to front end