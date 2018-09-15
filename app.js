// load out app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('short'))

// root route
app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOOOT ...")
})

// users route
app.get("/users", (req, res) => {
    var user1 = {firstName: "Lorena", lastName: "Sabathié"}
    const user2 = {firstName: "Jorge", lastName: "Irizarry"}
    res.json([user1, user2])



    // res.send("Nodemon auto updates when I save this file")
})

// localhost:3003
app.listen(3003, () => {
    console.log("Server is up an listening on 3003...")
})