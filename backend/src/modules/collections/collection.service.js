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
}

module.exports  = new CollectionService