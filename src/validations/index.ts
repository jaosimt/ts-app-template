import * as z from 'zod';

export const loginValidation = z.object({
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address!'),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]).{8,}$/, 'Please enter a strong password!'),
}).required();