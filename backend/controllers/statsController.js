import Stats from "../models/Stats.js";


// GET ALL STATS

export const getStats = async(req,res)=>{

try{

const stats = await Stats.find().sort({order:1});

res.status(200).json(stats);


}catch(error){

res.status(500).json({
message:error.message
});

}

};




// CREATE STATS

export const createStats = async(req,res)=>{

try{

const stats = await Stats.create(req.body);

res.status(201).json(stats);


}catch(error){

res.status(500).json({
message:error.message
});

}

};




// UPDATE STATS

export const updateStats = async(req,res)=>{


try{

const stats = await Stats.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);


res.status(200).json(stats);


}catch(error){

res.status(500).json({
message:error.message
});

}


};





// DELETE STATS

export const deleteStats = async(req,res)=>{


try{

await Stats.findByIdAndDelete(req.params.id);


res.status(200).json({
message:"Stats Deleted"
});


}catch(error){

res.status(500).json({
message:error.message
});

}

};