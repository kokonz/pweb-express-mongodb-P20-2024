import bcrypt from 'bcrypt';

export const encryptUserPassword = async (rawPassword: string): Promise<string> => {
    const saltStrength = 10;
    const salt = await bcrypt.genSalt(saltStrength);
    return bcrypt.hash(rawPassword, salt);
};