const qrcode = require('yaqrcode');

function qr(text) {
    return { 
        base64Image: qrcode(
            text, 
            {
                size:150,
        }), 
        text: text
    }
}

module.exports = {
    qr
}
