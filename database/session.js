const fs = require("fs");


const file =
"./database/session.json";



function loadSession(){

if(!fs.existsSync(file)){

fs.writeFileSync(
file,
"{}"
);

}


return JSON.parse(
fs.readFileSync(file)
);

}



function saveSession(data){

fs.writeFileSync(
file,
JSON.stringify(
data,
null,
2
)
);

}



module.exports={
loadSession,
saveSession
};
