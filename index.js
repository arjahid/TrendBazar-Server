const express= require('express');
const app= express();
const { MongoClient, ServerApiVersion } = require('mongodb');
 require('dotenv').config();
const port=process.env.PORT || 3200;
const cors= require('cors');

// /
// middlewares
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lsdr1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const productCollection=client.db('TrendBazar').collection('products');


    app.get('/products',async(req,res)=>{
        const result= await productCollection.find().toArray();
        res.send(result);
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Hello i am from server')
})
app.listen(port,()=>{
    console.log(`server is runnig at http://localhost:${port}`)
})