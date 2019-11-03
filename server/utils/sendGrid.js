
const sgMail = require('@sendgrid/mail');
const sendGrid = {};
const dotenv = require('dotenv');
dotenv.config();

sendGrid.sendMailBienvenida = async(user, empresa, link ) => {
    try{
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: user,
          from: 'support@ccondominium.com.mx',
          templateId: 'd-d396c0ca49cf432f8a76f7fcfd58e297',
          dynamic_template_data: {
            user: user,
            empresa: empresa,
            link: link}
        };
        var ss = await sgMail.send(msg);
        if(ss != null) return true;
    }catch(e){
        return false;
    }
    return false;
}

sendGrid.sendMailResetPass = async(user, pass, link ) => {
    try{
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: user,
          from: 'support@ccondominium.com.mx',
          templateId: 'd-b8006a346b3e49078ff99b879d214195',
          dynamic_template_data: {
            user: user,
            pass: pass,
            link: link}
        };
        var ss = await sgMail.send(msg);
        if(ss != null) return true;
    }catch(e){
        return false;
    }
    return false;
}

sendGrid.sendMailMensaje = async(user, mensaje, link ) => {
    try{
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: user,
          from: 'support@ccondominium.com.mx',
          templateId: 'd-0ff2eb693ac9428d8e585f4e77674d00',
          dynamic_template_data: {
            user: user,
            mensaje: mensaje,
            link: link}
        };
        var ss = await sgMail.send(msg);
        if(ss != null) return true;
    }catch(e){
        return false;
    }
    return false;
}

sendGrid.sendMailAviso = async(users, mensaje, link ) => {
    try{
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        var aUsers = new Array();
        users.forEach(u => abUsers.push(u.user));
        const msg = {
          to: aUsers,
          from: 'support@ccondominium.com.mx',
          templateId: 'd-0ff2eb693ac9428d8e585f4e77674d00',
          dynamic_template_data: {
            user: 'Residente',
            mensaje: mensaje,
            link: link}
        };
        var ss = await sgMail.sendMultiple(msg);
        if(ss != null) return true;
    }catch(e){
        return false;
    }
    return false;
}
module.exports = sendGrid;