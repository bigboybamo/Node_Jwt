const express = require("express")
const app = express()
const port = 3001
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const User = require("./model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')

dotenv.config()


const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect("mongodb://localhost:27017/User_jwt", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
})

mongoose.connection.once("open", () => {
	console.log("connected to mongodb")
})

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html")
})

app.get("/login", (req, res) => {
	res.sendFile(__dirname + "/login.html")
})

app.post("/register", (req, res) => {
	const user = new User(req.body)
	user
		.save()
		.then(() => {
			res.status(201).json({
				message: "user saved successfully!",
			})
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			})
		})
})

app.post("/login", (req, res) => {
	const { username, password } = req.body
	const user = User.findOne({ username }).lean()

	if (!user) {
		return res.send("Invalid Username/password")
	}

	if (bcrypt.compare(password, user.password)) {
		const token = jwt.sign(
			{
				id: user.id,
				username: user.username,
			},
			JWT_SECRET
		)

		console.log(`The users token is ${token}`)
		return res.send(`Welcome ${username}`)
	}
})

app.listen(port, () => {
	console.log(`listening on port ${port}`)
})
