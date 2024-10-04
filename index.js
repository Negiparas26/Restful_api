const express=require ("express");
const app= express();
const port =8000
// for use this folder to access 
const path=require("path");
// uuid 
const{v4:uuidv4} =require('uuid');

// override (post-patch)
const methodoverride=require("method-override");


// middle ware 
// from frontend when form is submitted the data is accept 
//to understand the express
app.use(express.urlencoded({extended:true}));
app.use(methodoverride('_method'));
   
//set view engine 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
 
// with this app.use in this case also link css to index.ejs  or // Serve static files from the "public" directory
app.use(express.static(path.join(__dirname,"public")));

// posts data  here :->
let posts=[
    {
        id: uuidv4(),
        username:"paras",
        content:" i love coding"
    },

    {
        id: uuidv4(),
        username:"rahul",
        content:"I'd love to tell you a story!"
    },
]   

//main port app

app.listen(port ,()=>{
    console.log(`app is listen on port ${port}`);
})

//:: implement get  index route
app.get("/posts",(req,res)=>{
  //  res.send("server working well 1 stage");
    res.render("index.ejs",{posts})
})

//:: create new route 
// serve the form    GET       /posts/new
// Add the new post    POST   /posts 
//in app.get  --> req.query
// in app.post  --> req.body

// form 
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

// form action="/posts"
app.post("/posts",(req,res)=>{
    let id=uuidv4();
  // console.log(req.body); // output:- {username:'paras',content:'helloworld'}
   // res.send ("post request send ");
   let {username,content}=req.body;
   posts.push({id,username,content});
    res.redirect("/posts"); //default -"GET" redirect to get.post(/post)
}) 


// :: /post/id 

app.get("/posts/:id",(req,res)=>{
    let{id}=req.params; 
    let post=posts.find((p)=>id===p.id);
    res.render("detail.ejs",{post})
})

// PATCH /post/id
// update
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params; 
    let newcontent=req.body.content;
    let post=posts.find((p)=>id=== p.id);
    post.content=newcontent;
    res.redirect("/posts");

})

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params; 
    let post=posts.find((p)=>id=== p.id);
    res.render("edit.ejs",{post});
})
  

// ::delete 
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params; 
   posts=posts.filter((p)=>id!== p.id);
   res.redirect("/posts");
})
