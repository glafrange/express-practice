const express = require("express")
const router = express.Router()

let todos = [
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
		res.json({error: "Could not find all required paramaters in request"})
		return
	}
	
	const todoIndex = todos.findIndex(item => {
		return item.title === req.body.title.toString()
	})

	if (todoIndex >= 0) {
		res.status(409)
		res.json({error: "Todo already exists"})
		return
	}

	const item = {
		title: req.body.title.toString(),
		author: req.body.author.toString(),
		id: todos.length > 1 ? todos[todos.length-1].id + 1 : todos.length > 0 ? todos[0].id + 1 : 1, //auto-increment id
		text: req.body.text.toString(),
		date: new Date().toUTCString()
	}

	todos.push(item)

	res.status(201)
	res.json(todos)
})

router.get("/todo/:id", (req, res) => {
	const id = parseInt(req.params.id)
	const todoIndex = todos.findIndex(todo => {
		return todo.id === id
	})

	if (todoIndex < 0) {
		res.status(404)
		return res.json({error: "id not found"})
	}

	return res.json(todos[todoIndex])
})

router.put("/todo/:id", (req, res) => {
	const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id))
	const updatedItem = {...todos[todoIndex]}
	
	if (req.body.title) {
		updatedItem.title = req.body.title.toString()
	}

	if (req.body.author) {
		updatedItem.author = req.body.author.toString()
	}

	if (req.body.text) {
		updatedItem.text = req.body.text.toString()
	}

	updatedItem.date = new Date().toUTCString()
	todos.splice(todoIndex, 1, updatedItem)

	res.status(200)
	res.json(updatedItem)
})

router.delete("/todo/:id", (req, res) => {
	const id = parseInt(req.params.id)
	const index = todos.findIndex(item => {
		return item.id === id
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

router.get("/author/:author", (req, res) => res.json(todos.filter(todo => todo.author === req.params.author)))

router.delete("/author/:author", (req, res) => {
	const author = req.params.author.toLowerCase()
	todos = todos.filter((todo) => {
		return todo.author.toLowerCase() !== author
	})
	res.status(204)
	res.send()
})

router.get("/search", (req, res) => {
	const searchParamaters = ["title", "author", "id", "text"]
	let filteredTodos = [...todos]

	searchParamaters.forEach(parameter => {
		if (req.query[parameter]) {
			filteredTodos = filteredTodos.filter(todo => {
				return todo[parameter].toString().toLowerCase() === req.query[parameter].toLowerCase()
			})
		}
	})

	res.json(filteredTodos)
})

module.exports = router