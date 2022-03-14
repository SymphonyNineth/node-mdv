const path = require("path")
const express = require("express")
const { engine } = require("express-handlebars")
const app = express()

const { home, about, notFound, serverError } = require("./lib/handlers")

const PORT = process.env.PORT ?? 3000

app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
    })
)

app.set("view engine", "handlebars")

app.use(express.static(path.resolve(__dirname, "public")))

app.get("/", home)

app.get("/about", about)

app.use(notFound)

app.use(serverError)

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Express started on http://localhost:${PORT}` + "; press Ctrl-C to terminate.")
    })
} else {
    module.exports = app
}
