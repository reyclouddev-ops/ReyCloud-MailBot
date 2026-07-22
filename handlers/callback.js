const {
    Markup
} = require("telegraf");

const {
saveSession
}=require("../database/session");

const session = require("../database/session");


const register = require("../templates/register");
const invoice = require("../templates/invoice");

const sendMail = require("../utils/mailer");

const generateMember = require("../utils/memberId");



module.exports = (bot)=>{


// BUTTON REGISTER

bot.action("register", async(ctx)=>{


let data=session[ctx.from.id];


if(!data)
return ctx.reply(
"❌ Session tidak ditemukan"
);



data.template="register";

data.step="nama";

saveSession(session);    


await ctx.reply(
"👤 Masukkan Nama Lengkap:"
);



});





// BUTTON INVOICE

bot.action("invoice", async(ctx)=>{


let data=session[ctx.from.id];


if(!data)
return ctx.reply(
"❌ Session tidak ditemukan"
);



data.template="invoice";

data.step="nama";

saveSession(session);  



await ctx.reply(
"👤 Masukkan Nama Pelanggan:"
);



});



};
