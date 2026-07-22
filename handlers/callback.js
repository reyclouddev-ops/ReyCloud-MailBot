const {
    saveSession
} = require("../database/session");



module.exports=(bot,session)=>{



// =======================
// BUTTON SEND MAIL
// =======================


bot.action(
"sendmail",
async(ctx)=>{


session[ctx.from.id]={

step:"email",

template:""

};


saveSession(session);



await ctx.answerCbQuery();



ctx.reply(
"📩 Masukkan email penerima:"
);


});






// =======================
// BUTTON REGISTER
// =======================


bot.action(
"register",
async(ctx)=>{


let data =
session[ctx.from.id];



if(!data){


return ctx.reply(
"❌ Session tidak ditemukan\nGunakan /sendmail dulu"
);


}




data.template="register";

data.step="nama";


saveSession(session);



await ctx.answerCbQuery();



ctx.reply(
`🎉 Template Register dipilih


👤 Masukkan Nama Lengkap:`
);


});








// =======================
// BUTTON INVOICE
// =======================


bot.action(
"invoice",
async(ctx)=>{


let data =
session[ctx.from.id];



if(!data){


return ctx.reply(
"❌ Session tidak ditemukan\nGunakan /sendmail dulu"
);


}




data.template="invoice";

data.step="nama";


saveSession(session);



await ctx.answerCbQuery();



ctx.reply(
`🧾 Template Invoice dipilih


👤 Masukkan Nama Pelanggan:`
);


});



};
