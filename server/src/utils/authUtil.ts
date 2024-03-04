import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<{ error: boolean; response?: string; errorMessage?: string; }> => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return { error: false, response: hash };
    } catch (err: any) {
        console.error('Error hashing password:', err);
        return {
            error: true,
            errorMessage: err.message || 'Error occurred during encryption'
        };
    }
};

export const comparePasswords = async (enteredPassword: string, storedPassword: string): Promise<{ error: boolean; response?: boolean; errorMessage?: string; }> => {
    try {
        const result = await bcrypt.compare(enteredPassword, storedPassword);
        return { error: false, response: result };

    } catch (err: any) {
        console.error('Error comparing passwords:', err);
        return {
            error: true,
            errorMessage: err.message || 'Error occurred during decryption'
        };
    }
};
