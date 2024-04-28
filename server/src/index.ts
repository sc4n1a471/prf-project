import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import expressSession from "express-session"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/routes"

dotenv.config()

const app = express()
const port = 5005
const dbUrl = process.env.DBURL ?? "yas"
const passport = require("./passport/passport")

mongoose
    .connect(dbUrl)
    .then((_) => {
        console.log("Successfully connected to MongoDB.")
    })
    .catch((error) => {
        console.log(error)
        return
    })

const whitelist = process.env.WHITELIST?.split(",") ?? ["http://localhost:4200"]
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
        if (whitelist.indexOf(origin!) !== -1 || whitelist.includes("*")) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS."))
        }
    },
    credentials: true,
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(cookieParser())

const sessionOptions: expressSession.SessionOptions = {
    secret: process.env.SECRET ?? "yas",
    resave: false,
    saveUninitialized: false,
}
app.use(expressSession(sessionOptions))

app.use(passport.initialize())
app.use(passport.session())

app.use("/prf", router)

app.listen(port, () => {
    console.log("Server is listening on port " + port.toString())
})
