require("dotenv").config();


const {
Telegraf,
Markup
}=require("telegraf");


const sendMail=require("./utils/mailer");

const register=require("./templates/register");
const invoice=require("./templates/invoice");

const member=require("./utils/memberId");

const backup=require("./utils/backup");

const {
isOwner
}=require("./config/owner");


const fs=require("fs");



const bot=new Telegraf(
process.env.BOT_TOKEN
);



let session={};



bot.command("start",(ctx)=>{

ctx.reply(
"🤖 ReyMail Bot Online"
);

});




bot.command("sendmail",(ctx)=>{


if(!isOwner(ctx.from.id))
return ctx.reply("❌ Access Denied");


session[ctx.from.id]={

step:"email"

};


ctx.reply(
"📩 Masukkan email penerima:"
);


});




bot.command("backup",async(ctx)=>{


if(!isOwner(ctx.from.id))
return ctx.reply(
"❌ Access Denied"
);


for(let file of backup()){

await ctx.replyWithDocument({
source:file
});

}


});




bot.on("text",async(ctx)=>{


let data=session[ctx.from.id];

if(!data)
return;



let text=ctx.message.text;



if(data.step==="email"){


data.email=text;

data.step="template";


ctx.reply(
"Pilih template:",
Markup.inlineKeyboard([

[
Markup.button.callback(
"🎉 Register",
"register"
)
],

[
Markup.button.callback(
"🧾 Invoice",
"invoice"
)
]

])

);


}



});





bot.action("register",(ctx)=>{


let d=session[ctx.from.id];


d.template="register";


d.step="nama";


ctx.reply(
"Masukkan nama:"
);


});




bot.action("invoice",(ctx)=>{


ctx.reply(
"Template invoice dipilih"
);


});




bot.launch();


console.log(
"🚀 ReyMailBot Online"
);
