const {
    Markup
} = require("telegraf");


const {
    saveSession
} = require("../database/session");


const sendMail =
require("../utils/mailer");


const register =
require("../templates/register");


const invoice =
require("../templates/invoice");




// validasi email

function isEmail(email){

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}



module.exports=(bot,session)=>{


bot.on("text", async(ctx)=>{


let data =
session[ctx.from.id];


// tidak ada session
if(!data)
return;



let text =
ctx.message.text;



// =======================
// STEP EMAIL PENERIMA
// =======================


if(data.step==="email"){


if(!isEmail(text)){


return ctx.reply(
"❌ Email tidak valid\n\nContoh:\nuser@gmail.com"
);


}



data.email=text;

data.step="template";


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






// =======================
// TEMPLATE REGISTER
// =======================


if(data.template==="register"){



// nama

if(data.step==="nama"){


data.nama=text;

data.step="role";


saveSession(session);


return ctx.reply(
"🏷 Masukkan Role / Jabatan:"
);


}




// role

if(data.step==="role"){


data.role=text;

data.step="wa";


saveSession(session);


return ctx.reply(
"📱 Masukkan WhatsApp:"
);


}




// whatsapp

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
`✅ Registration email berhasil dikirim

📩 ${data.email}

🆔 ${data.member}`
);



delete session[ctx.from.id];


saveSession(session);



return;

}



}







// =======================
// TEMPLATE INVOICE
// =======================


if(data.template==="invoice"){



// nama pelanggan

if(data.step==="nama"){


data.nama=text;

data.step="produk";


saveSession(session);



return ctx.reply(
"📦 Masukkan Produk:"
);


}




// produk

if(data.step==="produk"){


data.produk=text;

data.step="harga";


saveSession(session);



return ctx.reply(
"💰 Masukkan Harga:"
);


}




// harga

if(data.step==="harga"){


data.harga=text;

data.step="metode";


saveSession(session);



return ctx.reply(
"💳 Masukkan Metode Pembayaran:"
);


}





// metode

if(data.step==="metode"){


data.metode=text;

data.step="status";


saveSession(session);



return ctx.reply(
"📌 Masukkan Status Pembayaran:"
);


}





// status

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

📩 ${data.email}

💳 Status:
${data.status}`
);



delete session[ctx.from.id];


saveSession(session);



return;

}



}



});


};
