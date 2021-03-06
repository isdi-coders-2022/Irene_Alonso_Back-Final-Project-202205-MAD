import { Schema, SchemaTypes, Types } from 'mongoose';

export const isEmail = (email: string) => {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regEx.test(email);
};

export const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'Invalid email'],
        unique: true,
    },
    password: { type: String, minlength: 5, required: true },
    role: { type: String, enum: ['master', 'jugador'], default: 'master' },
    characters: [{ type: SchemaTypes.ObjectId, ref: 'Character' }],
});
/* istanbul ignore file */

export interface iUser {
    id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: string;
    characters: Array<string>;
}

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});
