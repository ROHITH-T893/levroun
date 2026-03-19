import bcrypt from 'bcryptjs';

const password = 'admentry';
const hash = bcrypt.hashSync(password, 10);
console.log('Password Hash:', hash);