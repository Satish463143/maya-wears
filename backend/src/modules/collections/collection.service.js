const { message } = require("../banner/banner.request")
const CollectionModel = require("./collections.model")

class CollectionService {
    createCollection = async (data) => {
        try {
            const collection = new CollectionModel(data)
            return await collection.save()

        } catch (exception) {
            throw exception
        }

    }
    listdata = async ({ skip , limit , filter }) => {
        try {
            const count = await CollectionModel.countDocuments(filter)
            const data = await CollectionModel.find(filter)
                .populate("createdBy", ["_id", "email", "name", "role"])
                .sort({ _id: "desc" })
                .limit(limit)
                .skip(skip)


            return { count, data }
        } catch (exception) {
            throw exception
        }


    }
    getIdbyFilter = async (filter) => {
        try {
            const collectionDetails = await CollectionModel.findOne(filter)
                .populate("createdBy", ["_id", "email", "name", "role"])
            return collectionDetails

        } catch (exception) {
            throw exception
        }

    }
    updateCollection = async (data, id) => {
        try {
            const response = await CollectionModel.findByIdAndUpdate(id, { $set: data }, { new: true })
            return response

        } catch (exception) {
            throw exception
        }
    }
    deleteCollection = async (id) => {
        try {
            const response = await CollectionModel.findByIdAndDelete(id)
            if (!response) {
                throw { status: 404, message: "Collection Not Found" }
            }
            return response
        } catch (exception) {
            throw exception
        }
    }
}

module.exports = new CollectionService