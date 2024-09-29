require("dotenv").config()
const http = require("http")
const app = require("./src/config/express.config")


const server = http.createServer(app)

const port = process.env.PORT || 9005

server.listen( port, 'localhost',(error)=>{
    if(error){
        console.log("server error")
    }
    else{
        console.log("Server is running on port :"+port)
        console.log("Press CSTRL+C to discontinue server.")
    }
})