require("dotenv").config();


function isOwner(id){

return Number(id) === Number(process.env.OWNER_ID);

}


module.exports={
isOwner
}
