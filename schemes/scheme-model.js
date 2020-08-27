const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update

}

function find(){
    try{
        return db('schemes')
    }
    catch (e) {
        next(e)
    }
}

function findById(id){
    try{
        return db('schemes')
            .where('id',id);
    }
    catch (e) {
        next(e)
    }
}

async function findSteps(id){
    try{
        return await db('steps')
            .where('id',id)
    }
    catch (e) {
        next(e)
    }
}

async function add(schemeData){
    try{
       await db('schemes').insert(schemeData)
            .then(ids => {
                return findById(ids[0]);
            });

    }
    catch (e) {
        next(e)
    }



}

async function addStep(stepData,id){
    try{
        await db('steps')
            .insert({
                scheme_id:id,
                instructions:stepData
            })
            .then(ids=>{
                return findSteps(ids[0])
            })
    }
    catch (e) {

    }
}

async function update(changes,id){
    await db('schemes').update(changes).where('id',id)
        .then(id =>{
            return findById(id)
        })
}


