const express = require('express');
const urlRoute = require("./routes/url");
const {connectToMongoDB} = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb+srv://samyul2004:jh6OUXKIlO9LOXxC@cluster0.r8el1.mongodb.net/devdao")
.then(()=>console.log("MongoDB Connected!"))
.catch((err)=>console.log(err));

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


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});