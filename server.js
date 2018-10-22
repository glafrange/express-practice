const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = 5000

const users = {
	"admin": {"password": "admin"}
}

const todos = [
	{
		todo: "1",
		id: 1
	},
	{
		todo: "2",
		id: 2
	}
]

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
	res.json({message: "This is a basic express app."})
})

app.get("/hello", (req, res) => {
	res.json({hello: "Hello World!"})
})

app.get("/hello/:name", (req, res) => {
	const hello = `Hello ${req.params.name}`
	res.json({hello: hello})
})

app.get("/name", (req, res) => {
	res.json({name: "Gabriel Lafrange"})
})

app.get("/add", (req, res) => {
	const sum = (parseInt(req.query.num1) + parseInt(req.query.num2)).toString()
	res.json({sum: sum})
})

app.post("/login", (req, res) => {
	const username = req.body.username.toString()
	const password = req.body.password.toString()
	if (users[username] && users[username].password == password) {
		res.status(200)
		res.json({status: "Logged in"})
	}
	res.status(403)
	res.json({error: "Invalid Credentials"})
})

app.get("/todos", (req, res) => res.json({todos: todos}))

app.post("/todos", (req, res) => {
	if (!req.body.todo) {
		res.status(400)
		res.json({error: "Could not find todo in user request"})
		return
	}
	
	const item = {}
	const todo = req.body.todo.toString()
	const index = todos.findIndex(item => {
		return item.todo === todo
	})

	if (index >= 0) {
		res.status(409)
		res.json({error: "Todo already exists"})
		return
	}

	item.todo = todo
	item.id = todos.length > 1 ? todos[todos.length-1].id + 1 : todos.length > 0 ? todos[0].id + 1 : 1
	todos.push(item)

	res.status(201)
	res.json({todos: todos})
})

app.delete("/todos", (req, res) => {
	if (!req.body.todo) {
		res.status(400)
		res.json({error: "Could not find todo in user request"})
		return
	}
	const todo = req.body.todo.toString()
	const index = todos.findIndex(item => {
		return item.todo === todo
	})

	if (index < 0) {
		res.status(404)
		res.json({error: "todo not found"})
		return
	}

	todos.splice(index, 1)
	res.status(200)
	res.json({todos: todos})
})

app.listen(port, () => console.log(`listening on port ${port}`))