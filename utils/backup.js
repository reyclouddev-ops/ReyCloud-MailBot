const fs = require("fs");
const archiver = require("archiver");


function createBackup(){

return new Promise((resolve)=>{


const output =
fs.createWriteStream(
"backup-reymail.zip"
);


const archive =
archiver("zip",{
zlib:{
level:9
}
});


output.on(
"close",
()=>{

resolve(
"backup-reymail.zip"
);

});


archive.pipe(output);



if(fs.existsSync(
"database/session.json"
)){

archive.file(
"database/session.json",
{
name:"session.json"
}
);

}



if(fs.existsSync(
"logs/mail.log"
)){

archive.file(
"logs/mail.log",
{
name:"mail.log"
}
);

}



archive.finalize();



});

}



module.exports=createBackup;
