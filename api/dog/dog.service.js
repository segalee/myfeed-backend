const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId



async function query(currFilterBy, currSortBy, pageInfo) {
    try {
        const { skip, limit } = pageInfo
        const collection = await dbService.getCollection('dog')

        const criteria = _buildCriteria(currFilterBy);

        if (currSortBy?.dob && currSortBy?.size) {
            if (!['asc', 'desc'].includes(currSortBy.size)) {
                throw new Error(`invalid size type ${size}`)
            }
            const size = currSortBy.size === 'asc'
                ? 1 :
                currSortBy.size === 'desc' ?
                    -1 :
                    ''
            const dob = [currSortBy.dob]

            dogs = await collection.find(criteria).sort({ [dob]: order }).skip(skip).limit(limit).toArray();
        } else {
            dogs = await collection.find(criteria).skip(skip).limit(limit).toArray();
        }
        console.log('dogs:🐶🐕🐩🐕‍🦺', dogs);

        return dogs;
    }
    catch (err) {
        console.log('the err', err)
        logger.error('cannot find dogs', err)
        throw err
    }

}


function _buildCriteria(filterBy) {
    // console.log("filterBy criteria 🎇", filterBy);
    const criteria = {};
    if (filterBy.txt) {
        criteria.name = { $regex: filterBy.txt, $options: "i" };
    }
    if (filterBy.breed) {
        criteria.breed = { $eq: filterBy.breed };
    }
    if (filterBy.gender) {
        criteria.gender = { $eq: filterBy.gender };
    }
    if (filterBy.size) {
        criteria.size = { $eq: filterBy.size };
    }

    return criteria;
}



async function getById(dogId) {
    try {
        const collection = await dbService.getCollection('dog')
        // console.log('dog id in service',dogId);
        const dog = await collection.findOne({ '_id': ObjectId(dogId) })
        // dog.reviews = await reviewService.query({ dogId })
        // console.log('the dog in service', dog)
        return dog
    } catch (err) {
        logger.error(`while finding dog ${dogId}`, err)
        throw err
    }
}

async function remove(dogId) {
    try {
        const collection = await dbService.getCollection('dog')
        await collection.deleteOne({ '_id': ObjectId(dogId) })
        return dogId
    } catch (err) {
        logger.error(`cannot remove dog ${dogId}`, err)
        throw err
    }
}

async function add(dog) {
    try {

        const collection = await dbService.getCollection('dog')
        await collection.insertOne(dog)
        // console.log('added dogs in server', dog);
        return dog
    } catch (err) {
        logger.error('cannot insert dog', err)
        throw err
    }
}
async function update(dog) {
    try {
        let id = ObjectId(dog._id)
        delete dog._id
        const collection = await dbService.getCollection('dog')
        await collection.updateOne({ "_id": id }, { $set: { ...dog } })
    } catch (err) {
        console.log('the err in update', err)
        logger.error(`cannot update dog ${dog._Id}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}



// const criteria = {_id:${dogId}}
//         const dog = collection.aggregate([
//             {
//                 $match: criteria
//             },
//             {
//                 $lookup:
//                 {
//                     localField: '_id',
//                     from: 'user',
//                     foreignField: '_id',
//                     as: 'byUser'
//                 }
//             },
//             {
//                 $unwind: '$byUser'
//             },
//             {
//                 $lookup:
//                 {
//                     localField: '_id',
//                     from: 'review',
//                     foreignField: 'dogId',
//                     as: 'dogReviews'
//                 }
//             },

//         ]).toArray()