const loginCheck = (req,res,next)=>{
    let user ={}
    if(user){
        next()
    }else{
        next({status:401, message:"You need to llogin first"})
    }
}

module.exports = loginCheck