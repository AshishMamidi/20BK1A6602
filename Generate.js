function generateRandomID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-----';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        if (i / 4 == 0) {
            result += "-"

        }
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


function generateRandomSecret(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}




module.exports = { generateRandomSecret, generateRandomID }
