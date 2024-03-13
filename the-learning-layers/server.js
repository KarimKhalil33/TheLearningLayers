
require('./database');

const app = require('express')();
const cors=require('cors');
const port = 4000;
app.use(cors());

const bodyParser=require('express').json;

const userRouter=require('./api/routes');

 app.use(bodyParser());
 app.use('/user',userRouter)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});