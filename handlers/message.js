const {
saveSession
}=require("../database/session");


const sendMail =
require("../utils/mailer");


const register =
require("../templates/register");


const invoice =
require("../templates/invoice");


module.exports = (bot, session)=>{


bot.on("text", async(ctx)=>{


let data = session[ctx.from.id];


if(!data)
return;



let text = ctx.message.text;


// =====================
// INPUT EMAIL PENERIMA
// =====================

if(data.step === "email"){


const emailCheck =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;



if(!emailCheck.test(text)){


return ctx.reply(
"❌ Email tidak valid\nContoh: user@gmail.com"
);


}



data.email = text;

data.step = "template";


saveSession(session);



return ctx.reply(
"📄 Pilih Template Email:",
Markup.inlineKeyboard([

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


}


let data =
session[ctx.from.id];


// kalau tidak ada session
if(!data)
return;



let text =
ctx.message.text;



// =================
// REGISTER FLOW
// =================


if(data.template==="register"){


if(data.step==="nama"){


data.nama=text;

data.step="role";

saveSession(session);


return ctx.reply(
"🏷 Masukkan Role / Jabatan:"
);


}



if(data.step==="role"){


data.role=text;

data.step="wa";

saveSession(session);


return ctx.reply(
"📱 Masukkan WhatsApp:"
);


}



if(data.step==="wa"){


data.wa=text;


data.member =
"LEGION-"+Date.now();


data.status="ACTIVE";


data.date =
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

saveSession(session);


}



}




// =================
// INVOICE FLOW
// =================


if(data.template==="invoice"){


if(data.step==="nama"){


data.nama=text;

data.step="produk";

saveSession(session);


return ctx.reply(
"📦 Masukkan Produk:"
);


}



if(data.step==="produk"){


data.produk=text;

data.step="harga";

saveSession(session);


return ctx.reply(
"💰 Masukkan Harga:"
);


}



if(data.step==="harga"){


data.harga=text;

data.step="metode";

saveSession(session);


return ctx.reply(
"💳 Masukkan Metode Pembayaran:"
);


}



if(data.step==="metode"){


data.metode=text;

data.step="status";

saveSession(session);


return ctx.reply(
"📌 Masukkan Status Pembayaran:"
);


}



if(data.step==="status"){


data.status=text;


data.date =
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

saveSession(session);


}



}


});


};
