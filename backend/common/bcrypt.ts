import bcrypt from 'bcrypt';

const bcryptHashSync = (data: string): string => {
    const saltRounds = 10; 
    return bcrypt.hashSync(data, saltRounds);
};

const bcryptCompareSync = (plainData: string, hashData: string): boolean => {
    return bcrypt.compareSync(plainData, hashData);
}

export{bcryptCompareSync, bcryptHashSync};

