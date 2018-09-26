// load out app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require("mysql")

const body_parser = require("body-parser")

// Middleware to get form data
app.use(body_parser.urlencoded({extended: false}))

// Serve static pages in the public folder
app.use(express.static('./public'))

app.use(morgan('short'))

app.use("/user_create", (req,res) =>{
    // console.log("Trying to create a new user...")
    // console.log("How do we get the form data???")
    // console.log("First name: " + req.body.create_first_name)
    const first_name = req.body.create_first_name
    const last_name = req.body.create_last_name

    const query_string = "INSERT INTO users (first_name, last_name) VALUES (?,?)"
    getConnection().query(query_string, [first_name, last_name], (err, results, fields)=>{
        if(err){
            console.log("Field to insert new user: "+ err)
            res.sendStatus(500)
        }
        console.log("Inserted a new user with id: " , results.insertId);
        res.end()
    })
    // res.end()
})

function getConnection(){
    return mysql.createConnection({
        host: "us-cdbr-iron-east-01.cleardb.net",
        user: "b568b03df34fd4",
        password: "dd8ea6d4",
        database: "heroku_876ded22b090a26"
    })

}

// user route   
app.get("/user/:id", (req, res) => {
    console.log("Fetching user with id: " + req.params.id)
    
    const connection = getConnection();

    const user_id = req.params.id
    const query_string = "SELECT * FROM users WHERE id = ?"
    connection.query(query_string, [user_id], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for user..." + err)
            res.sendStatus(500)
            // throw err
            // res.end()
            return
        }
        console.log("I think we fetched the users successfully")

        const users = rows.map((row)=>{
            return {firstName: row.first_name,
                lastName: row.last_name
            }
        })
        res.json(users)
    })
    
    // res.end()
})
// root route
app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOOOT ...")
})

// users route
app.get("/users", (req, res) => {
    // Static users response
    // const user1 = {firstName: "Lorena", lastName: "Sabathié"}
    // const user2 = {firstName: "Jorge", lastName: "Irizarry"}

    const connection = getConnection()
    const query_string = "SELECT * FROM users;"
    
    connection.query(query_string, (err, rows, fields)=>{
        if (err) {
            console.log('There was an error fetching the users... ' + err.toString())
            res.sendStatus(500)
            return
        } else {
            res.json(rows)
        }
    })

    // res.json([user1, user2])
    // res.send("Nodemon auto updates when I save this file")
})

const PORT = process.env.PORT || 3003
// localhost:3003
app.listen(PORT, () => {
    console.log("Server is up an listening on: " + PORT + " ...")
})