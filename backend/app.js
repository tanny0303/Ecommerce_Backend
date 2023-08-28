console.log("A");

const express=require('express');
const bodyParser=require('body-parser');
const morgan= require('morgan');
const mongoose=require('mongoose');
const cors=require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


const categoriesRoutes = require('./routers/categories');
const productsRoutes= require('./routers/products');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');

const app=express();

app.use(cors());
app.options('*', cors())


require('dotenv/config');


const api= process.env.API_URL;

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));




mongoose.connect(process.env.CONNECTION_STRING , {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName: 'Ecommerce'
})
.then(()=>{
    console.log("Database Connected ..");
})
.catch((err)=>{
    console.log(err);
})

app.listen(3000, ()=>{

    console.log(api);
    console.log("server is running on port 3000");
})