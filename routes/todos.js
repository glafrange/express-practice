const express = require("express")
const router = express.Router()

const todos = [
	{
		title: "1",
		text: "todo 1",
		id: 1,
		author: "gabe",
		date: new Date().toUTCString()
	},
	{
		title: "2",
		text: "todo 2",
		id: 2,
		author: "gabe",
		date: new Date().toUTCString()
	}
]

router.get("/", (req, res) => res.json(todos))

router.post("/", (req, res) => {
	if (!req.body.text || !req.body.title || !req.body.author) {
		res.status(400)
		res.json({error: "Could not find todo in user request"})
		return
	}
	
	const item = {}
	const title = req.body.title.toString()
	const author = req.body.author.toString()
	const index = todos.findIndex(item => {
		return item.title === title
	})

	if (index >= 0) {
		res.status(409)
		res.json({error: "Todo already exists"})
		return
	}

	item.title = title
	item.author = author
	item.id = todos.length > 1 ? todos[todos.length-1].id + 1 : todos.length > 0 ? todos[0].id + 1 : 1 //auto-increment id
	item.date = new Date().toUTCString()
	todos.push(item)

	res.status(201)
	res.json(todos)
})

router.delete("/", (req, res) => {
	if (!req.body.todo) {
		res.status(400)
		res.json({error: "Could not find todo in user request"})
		return
	}
	const title = req.body.title.toString()
	const index = todos.findIndex(item => {
		return item.title === title
	})

	if (index < 0) {
		res.status(404)
		res.json({error: "todo not found"})
		return
	}

	todos.splice(index, 1)
	res.status(204)
	res.send()
})

router.get("/todo/:id", (req, res) => {
	const id = parseInt(req.params.id)
	const todoIndex = todos.findIndex(todo => {
		todo.id === id
	})
	res.json(todos[todoIndex])
})

router.get("/title/:title", (req, res) => {
	const title = req.params.title
	res.json(todos.filter(todo => todo.title === title))
})

router.get("/author/:author", (req, res) => res.json(todos.filter(todo => todo.author === req.params.author)))

router.delete("/author/:author", (req, res) => {
	const author = req.params.author
	todos.forEach((todo, index) => {
		if (todo.author != author) {
			todos.splice(index, 1)
		}
	})
	res.status(204)
	res.send()
})

module.exports = router