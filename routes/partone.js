const express = require("express")
const router = express.Router()

const users = {
	"admin": {"password": "admin"}
}

router.get("/", (req, res) => {
	res.json({message: "This is a basic express app."})
})

router.get("/hello", (req, res) => {
	res.json({hello: "Hello World!"})
})

router.get("/hello/:name", (req, res) => {
	const hello = `Hello ${req.params.name}`
	res.json({hello: hello})
})

router.get("/name", (req, res) => {
	res.json({name: "Gabriel Lafrange"})
})

router.get("/add", (req, res) => {
	const sum = (parseInt(req.query.num1) + parseInt(req.query.num2)).toString()
	res.json({sum: sum})
})

router.post("/login", (req, res) => {
	const username = req.body.username.toString()
	const password = req.body.password.toString()
	if (users[username] && users[username].password == password) {
		res.status(200)
		res.json({status: "Logged in"})
	}
	res.status(403)
	res.json({error: "Invalid Credentials"})
})

module.exports = router