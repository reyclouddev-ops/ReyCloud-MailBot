const cooldown={};


function checkCooldown(id){


let now=Date.now();


if(
cooldown[id] &&
now-cooldown[id]<10000
){

return false;

}


cooldown[id]=now;


return true;


}



module.exports=checkCooldown;
