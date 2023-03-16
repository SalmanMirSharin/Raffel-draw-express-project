const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use([morgan('dev'),cors(),express.json()]);


app.use('/api/v1/tickets',require('./router'));



app.get('/health',(req,res)=>{
    res.status(200).json({message:'success'});
});





app.use((req, res, next)=>{
    const error = new Error('Resource Not Found')
    error.status = 404;
    next(error);
})

app.use((error,req, res, next)=>{
    console.log(error);
    if(error.status){
       return res.status(error.status).json({
            message: error.message,
        })
    }

    res.status(500).json({message:'something went worng'})
})


const port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log('Server is listening on PORT 4000');
})
