const fs=require("fs");


function backupFiles(){

return [

"database/session.json",

"logs/mail.log"

].filter(
x=>fs.existsSync(x)
);


}


module.exports=backupFiles;
