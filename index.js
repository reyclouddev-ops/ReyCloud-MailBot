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

const commandHandler =
require("./handlers/command");

const messageHandler =
require("./handlers/message");

const callbackHandler =
require("./handlers/callback");

const {
isOwner
}=require("./config/owner");


const fs=require("fs");



const bot=new Telegraf(
process.env.BOT_TOKEN
);

commandHandler(bot);

messageHandler(bot);

callbackHandler(bot);


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




bot.on("text", async(ctx)=>{


let data=session[ctx.from.id];

if(!data)
return;


let text=ctx.message.text;



// REGISTER

if(data.template==="register"){


if(data.step==="nama"){


data.nama=text;

data.step="role";


return ctx.reply(
"🏷 Masukkan Role / Jabatan:"
);


}



if(data.step==="role"){


data.role=text;

data.step="wa";


return ctx.reply(
"📱 Masukkan WhatsApp:"
);


}



if(data.step==="wa"){


data.wa=text;


data.member=
"LEGION-"+Date.now();


data.date=
new Date()
.toLocaleDateString("id-ID");



await sendMail({

email:data.email,

subject:
"🎉 Registration Successful",

html:
register(data)

});



ctx.reply(
`✅ Register berhasil dikirim

📩 ${data.email}

🆔 ${data.member}`
);



delete session[ctx.from.id];

}



}





// INVOICE

if(data.template==="invoice"){



if(data.step==="nama"){


data.nama=text;

data.step="produk";


return ctx.reply(
"📦 Masukkan produk:"
);


}



if(data.step==="produk"){


data.produk=text;

data.step="harga";


return ctx.reply(
"💰 Masukkan harga:"
);


}



if(data.step==="harga"){


data.harga=text;

data.step="metode";


return ctx.reply(
"💳 Masukkan metode pembayaran:"
);


}



if(data.step==="metode"){


data.metode=text;

data.step="status";


return ctx.reply(
"📌 Masukkan status pembayaran:"
);


}



if(data.step==="status"){


data.status=text;


data.date=
new Date()
.toLocaleDateString("id-ID");



await sendMail({

email:data.email,

subject:
"🧾 Payment Invoice",

html:
invoice(data)

});



ctx.reply(
`✅ Invoice berhasil dikirim

📩 ${data.email}`
);



delete session[ctx.from.id];


}



}


});



bot.launch();


console.log(
"🚀 ReyMailBot Online"
);
