const {
Markup
}=require("telegraf");


const {
saveSession
}=require("../database/session");



module.exports=(bot,session)=>{



// tombol menu send mail

bot.action(
"sendmail",
async(ctx)=>{


session[ctx.from.id]={

step:"email",

template:""

};


saveSession(session);



ctx.reply(
"📩 Masukkan email penerima:"
);


});




// pilih register

bot.action(
"register",
async(ctx)=>{


let data =
session[ctx.from.id];


if(!data)
return ctx.reply(
"❌ Session tidak ditemukan"
);



data.template="register";

data.step="nama";


saveSession(session);



ctx.reply(
"👤 Masukkan Nama Lengkap:"
);


});






// pilih invoice

bot.action(
"invoice",
async(ctx)=>{


let data =
session[ctx.from.id];


if(!data)
return ctx.reply(
"❌ Session tidak ditemukan"
);



data.template="invoice";

data.step="nama";


saveSession(session);



ctx.reply(
"👤 Masukkan Nama Pelanggan:"
);


});



};
