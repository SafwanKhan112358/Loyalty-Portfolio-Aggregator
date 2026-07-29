const bcryptjs = require("bcryptjs");

async function hashPass(userPass){
    const hashedPass = await bcryptjs.hash(userPass,10);
    return hashedPass;
}

async function comparePass(pass, userPass){
    const result = await bcryptjs.compare(pass, userPass);
    return result;
}

