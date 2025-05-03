const express= require('express');
const app= express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
 require('dotenv').config();
const port=process.env.PORT || 3200;
const cors= require('cors');

// /
// middlewares
app.use(cors({
    origin: ["https://trendbazar-client.onrender.com", "http://localhost:3001"]
}));
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
    const elecronicCollection=client.db('TrendBazar').collection('electronics');
    const fashonCollecton=client.db('TrendBazar').collection('fashon');
    const computerCollecton=client.db('TrendBazar').collection('computer');
    const sportsCollecton=client.db('TrendBazar').collection('sports');
    const cartCollecton=client.db('TrendBazar').collection('cart');


    app.get('/products',async(req,res)=>{
        const result= await productCollection.find().toArray();
        res.send(result);
    })
    app.get('/electronics',async(req,res)=>{
        const result= await elecronicCollection.find().toArray();
        res.send(result);
    })
    app.get('/electronics/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id: new ObjectId(id)}
        const result= await elecronicCollection.findOne(query);
        res.send(result);
    })
    app.get('/fashon',async(req,res)=>{
        const result= await fashonCollecton.find().toArray();
        res.send(result);
    })
    app.get('/fashon/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id: new ObjectId(id)}
        const result= await fashonCollecton.findOne(query);
        res.send(result);
    })
    app.get('/computer',async(req,res)=>{
        const result= await computerCollecton.find().toArray();
        res.send(result);
    })
    app.get('/computer/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id: new ObjectId(id)}
        const result= await computerCollecton.find(query).toArray();
        res.send(result);
    })
    app.get('/sports',async(req,res)=>{
        const result= await sportsCollecton.find().toArray();
        res.send(result);
    })
    // cart collection
    app.get('/cart',async(req,res)=>{
        const email=req.query.email;
        const query={email:email}
        const result= await cartCollecton.find(query).toArray();
        res.send(result);
    })
    app.post('/cart',async(req,res)=>{
        const product=req.body;
        const result= await cartCollecton.insertOne(product);
        res.send(result);
    })
    app.delete('/cart/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id: new ObjectId(id)}
        const result= await cartCollecton.deleteOne(query);
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