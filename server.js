const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const partone = require("./routes/partone")
app.use("/", partone)

const todos = require("./routes/todos")
app.use("/todos", todos)

app.listen(port, () => console.log(`listening on port ${port}`))