const shortid = require("shortid");
const URL = require("../models/url.js");

async function handleGenerateNewShortURL(req,res){
    try{ const body = req.body;
        if(!body.url)return res.status(400).json({err:"url is required"});
        const shortID = shortid();
        await URL.create({
            shortId:shortID,
            redirectURL:body.url,
            visitHistory:[],
        });
    
        return res.json({id:shortID});}
        catch(e){
            console.error(e);
            return res.status(200).json({message:"some error Ocuured"})
        }
   
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalclicks:result.visitHistory.length,analytics:result.visitHistory
    })
}


module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}