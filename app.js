const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/configDatabase')
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') })

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200'
}));


const products = require('./routes/product');
const orders = require('./routes/order');

connectDatabase();

app.use(express.json());
app.use('/api/v1/', products);
app.use('/api/v1/', orders);

if(process.env.NODE_ENV == 'production'){
  app.use(express.static(path.join(__dirname,'..','frontend','dist','frontend','browser')))
  app.use((req,res)=>{
    res.sendFile(path.resolve(__dirname,'..','frontend','dist','frontend','browser','index.htmll'))
  })
}

app.listen(process.env.PORT, () => {
  console.log(`port num p${process.env.PORT} is ${process.env.process}initialized..!`)
})

