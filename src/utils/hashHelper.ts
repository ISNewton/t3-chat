import bcrypt from 'bcrypt'
export const hash = async (password : string) => {
    return await bcrypt.hashSync(password, 10)
}

export const comparePasswords = async (password : string, hash : string) => {
    return await bcrypt.compareSync(password, hash)
}