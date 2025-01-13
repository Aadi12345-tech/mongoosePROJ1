const express = require('express');
const urlRoute = require("./routes/url");
const {connectToMongoDB} = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017")
.then(()=>console.log("MongoDB Connected!"));

app.use(express.json());
app.use("/url",urlRoute);

app.get("/:shortId",async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
        shortId
        },
        {
            $push:{
                visitHistory:{
                    timestamp:Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
})


app.listen(PORT,()=>`Server started at PORT no : ${PORT}`);