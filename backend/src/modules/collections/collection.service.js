const CollectionModel = require("./collections.model")

class CollectionService {
    createCollection =async (data)=>{
        try{
            const collection = new CollectionModel(data)
            return await collection.save()

        } catch(exception){
            throw exception
        }

    }
    listdata = async({skip=0,limit=10,filter ={}})=>{
        try{
            const count = await CollectionModel.countDocuments(filter)
            const data = await CollectionModel.find(filter)
                .populate("createdBy", ["_id","email", "email", "role"])
                .sort({_id: "desc"})
                .limit(limit)
                .skip(skip)
            
    
            return {count, data}
        }catch(exception){
            throw exception
        }
        

    }
}

module.exports  = new CollectionService