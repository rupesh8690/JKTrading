//accessing variable from .env file
if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

// console.log(process.env.SECRET)

const express = require('express')
const app = express()
const port = 3000
const Listing=require("./models/listing.js");
const Category=require("./models/category.js");
const Contact=require("./models/contact.js");

const ejsMate = require('ejs-mate'); // Add this line to import ejsMate
// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);
const ExpressError=require("./utils/ExpressError.js");
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


const passport= require("passport")
const localStrategy=require("passport-local")
const User= require("./models/user.js");

const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));



// const MONGO_URL= "mongodb://127.0.0.1:27017/jk-trading";
const dbUrl= process.env.ATLASDB_URL;

const store =MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600, // for lazy update after 24 hours


});

store.on("error", () =>{
  console.log("ERROR in MONGO SESSION STORE",err);
})
const sessionOptions ={
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true, //basically used for security purpose
  }
}




app.use(session(sessionOptions))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) =>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})


const router = express.Router();

const  listingSchema =require("./schema.js")
const categorySchema =require("./schema.js")
const {contactSchema } = require("./schema.js")


const listings=require("./routes/listing.js")
const user= require("./routes/user.js");
const listingsSearch= require("./routes/search.js");
const insertCategory= require("./routes/category.js");
const contact= require("./routes/contact.js");



//mongoose code
const mongoose = require('mongoose');

app.use(express.urlencoded( {extended: true}));
app.use(express.json());


var methodOverride = require('method-override');
const { nextTick } = require('process');
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname,"/public")));



main().then((res) => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main()
{
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(dbUrl);
}



app.use("/listings",listings); // this line mean any request to a url that begin with '/listings' will be handled by 'listings
app.use("/", user);
app.use("/search",listingsSearch);
app.use("/category",insertCategory);
app.use("/contact",contact);


app.get("/about" ,(req,res) =>{
  res.render("./includes/aboutus");
})
app.get('/', (req, res) => {
  res.redirect('/listings');
});

app.all("*",(req,res,next) => {
  next(new ExpressError(404, "Page not found!"));

})
app.use((err,req,res,next) => {
  // res.send("Something went wrong");
  let {statusCode=500,message="Something went wrong"}=err; //
  // if there is nothing in statucode then default it wiill be 500 and message will be somehting went wrong
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs" , {err})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})