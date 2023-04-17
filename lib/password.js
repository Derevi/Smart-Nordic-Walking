import { scrypt, randomBytes } from 'crypto'; //callback based, and we want to use async and await
import { promisify } from 'util';

const scryptAsync = promisify(scrypt) 

async function toHash(password){
    const salt = randomBytes(8).toString('hex');
    const buf = await scryptAsync(password,salt,64); 
    return `${buf.toString('hex')}.${salt}`
}

async function compare(storedPassword, suppliedPassword){
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = await scryptAsync(suppliedPassword,salt,64);
    return buf.toString('hex') === hashedPassword
}

module.exports = { toHash, compare};