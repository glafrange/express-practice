const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = 5000

const users = {
	"admin": {"password": "admin"}
}

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => res.send("This is a basic express app."))

app.get("/hello", (req, res) => res.send("Hello World!"))

app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`))

app.get("/devname", (req, res) => res.send("Gabriel Lafrange"))

app.get("/add", (req, res) => res.send((parseInt(req.query.num1) + parseInt(req.query.num2)).toString()))

app.post("/login", (req, res) => {
	let username = req.body.username.toString()
	let password = req.body.password.toString()
	if (users[username] && users[username].password == password) {
		res.send("Logged in")
	}
	res.status(403)
	res.send("Invalid Credentials")
})

app.listen(port, () => console.log(`listening on port ${port}`))