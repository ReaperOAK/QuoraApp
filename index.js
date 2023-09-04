const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require('uuid');

const posts=[
    {
        id : uuidv4(),
        username:"Owais",
        content:"yay, I learned to work with servers and APIs"
    },
    {
        id : uuidv4(),
        username:"Aftab",
        content:"Party was fun"
    }
]

app.use(express.urlencoded({extended : true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id = uuidv4()
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});