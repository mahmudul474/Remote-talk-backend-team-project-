 const express = require('express');
 const app = express();
 const  port= process.env.PORT || 5000;
 const cors=require ("cors")


 // middleware

 app.use(cors())
 app.use(express.json())








 app.get("/",(req,res)=>{
    res.send("remote talke server")
 })
 

 app.listen(port,()=>{
    console.log("server listening on port"+ port)
 })

   ///
  ;


const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://sobuj:a8fbiHHEqd7u70UH@cluster0.63hfirw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});
 

 
console.log(uri)


const run=async()=>{

  try {
    const usercollection = client.db("remote-talks").collection("users");
    const messageCollection = client.db("remote-talks").collection("messages");

    app.get("/allusers", async (req, res) => {
      const email = req.query.email;
      const query = {};
      const users = await usercollection.find(query).toArray();
      const result = users.filter((usrs) => usrs.email !== email);
      res.send(result);
    });

    app.get("/curentuser", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await usercollection.findOne(query);
      res.send(result);
    });

    app.post("/sendmsg", async (req, res) => {
      const msg = req.body;
      const result = await messageCollection.insertOne(msg);
      res.send(result);
    });

    app.get("/getmsg/:userid/:riciberid", async (req, res) => {
      const userid = req.params.userid;
      const riciberid = req.params.riciberid;
      const allmsg = await messageCollection.find({}).toArray();
      const result = allmsg.filter(
        (msg) =>
          (msg.senderId == userid && msg.reciberId === riciberid) ||
          (msg.senderId === riciberid && msg.reciberId === userid)
      );
      console.log(result);
      res.send(result);
    });

    app.get("last/:id", async (req, res) => {
      const friendid = req.params.id;
      console.log(friendid);
    });
  } finally {
  }
}
run().catch(err=>console.log(err))