const {
Markup
}=require("telegraf");


const {
isOwner
}=require("../config/owner");


const {
saveSession
}=require("../database/session");


const createBackup =
require("../utils/backup");



const checkCooldown =
require("../utils/cooldown");


module.exports=(bot,session)=>{



bot.start((ctx)=>{


ctx.reply(
`🤖 ReyMail Bot

PT Legion Teknologi Mail System

Gunakan:
 /menu`
);


});





bot.command(
"menu",
(ctx)=>{


ctx.reply(
`📩 ReyMail Menu


/sendmail
Kirim email template


/backup
Backup database


/status
Status bot
`,
Markup.inlineKeyboard([

[
Markup.button.callback(
"📧 Send Mail",
"sendmail"
)
],

[
Markup.button.callback(
"🎉 Register",
"register"
),

Markup.button.callback(
"🧾 Invoice",
"invoice"
)
]

])
);


});





bot.command(
"sendmail",
(ctx)=>{


if(!isOwner(ctx.from.id))
return ctx.reply(
"❌ Access Denied"
);



session[ctx.from.id]={

step:"email",
template:""

};


saveSession(session);



ctx.reply(
"📩 Masukkan email penerima:"
);


});






bot.command(
"backup",
async(ctx)=>{


if(!isOwner(ctx.from.id))
return ctx.reply(
"❌ Access Denied"
);



ctx.reply(
"⏳ Membuat backup..."
);



let file =
await createBackup();



await ctx.replyWithDocument({
source:file
});



});






bot.command(
"status",
(ctx)=>{


ctx.reply(
`🟢 Bot Online

Owner:
${process.env.OWNER_ID}

System:
ReyMail Bot`
);


});



};
