const path = require("path")
const express = require("express")
const { engine } = require("express-handlebars")
const app = express();

const PORT = process.env.PORT ?? 3000;

const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
    ]

app.engine("handlebars", engine({
    defaultLayout: "main",
}))

app.set("view engine", "handlebars")

app.use(express.static(path.resolve(__dirname, "public")))

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/about", (req, res) => {
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render("about", { fortune })
})

app.use((req, res) => {
    res.status("404");
    res.render("404")
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status("500")
    res.render("home")
})


app.listen(PORT, () => `Running on port ${PORT}`)