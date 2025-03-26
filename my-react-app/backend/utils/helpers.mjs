import bcrypt from 'bcrypt';

//recommended 10 rounds  
const saltRounds = 10;
export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    console.log('Generated salt:', salt);
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plainPassword, hashedPassword) => {

    return bcrypt.compareSync(plainPassword, hashedPassword);
};
