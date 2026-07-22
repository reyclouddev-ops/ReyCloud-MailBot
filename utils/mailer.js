const nodemailer=require("nodemailer");
const fs=require("fs");


const transporter =
nodemailer.createTransport({

host:"smtp.gmail.com",

port:465,

secure:true,

auth:{
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS
}

});



async function sendMail(data){


await transporter.sendMail({

from:
`PT Legion Teknologi <${process.env.EMAIL_USER}>`,

to:data.email,

subject:data.subject,

html:data.html

});


let log=
`${new Date()} | ${data.email} | ${data.subject}\n`;


fs.appendFileSync(
"logs/mail.log",
log
);


}


module.exports=sendMail;
