import express from "express"
import mongoose from "mongoose"
import routes from "./routes-config"
import errorHandler from "./middleware/errorHandler"
const app = express()

app.use(express.json())
app.use("/api", routes)
app.use(errorHandler)

const MONGO_URL = "mongodb://localhost:27017/template2";

mongoose.connect(MONGO_URL)
.then((data) => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log(err)
})

app.listen(4000, () => {
    console.log("Server is running")
})

export default app