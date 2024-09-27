const http = require("http")
const app = require("./src/config/express.config")


const server = http.createServer(app)

server.listen(9005 , 'localhost',(error)=>{
    if(error){
        console.log("server error")
    }
    else{
        console.log("Server is running")
        console.log("Press CSTRL+C to discontinue server.")
    }
})