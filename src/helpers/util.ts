import bcrypt from 'bcrypt'
const saltRounds = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, saltRounds);
    } catch (er) {
        console.log(er)
    }
}

export const comparePasswordHelper = async (plainPassword: string, hashPassword: string) => {
    try {
        return await bcrypt.compare(plainPassword, hashPassword);
    } catch (error) {
        console.log(error);
    }
}