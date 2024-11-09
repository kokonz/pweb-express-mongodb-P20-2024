import mongoose, { Schema, Document } from 'mongoose';

interface IUserToken {
    tokenString: string;
    createdAt: Date;
}

export interface ILibraryUser extends Document {
    username: string;
    email: string;
    password: string;
    activeSessions: IUserToken[];
    lastLogin?: Date;
}

const libraryUserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    activeSessions: [{
        tokenString: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    lastLogin: {
        type: Date
    }
}, { 
    timestamps: true,
    versionKey: false 
});

export const LibraryUser = mongoose.model<ILibraryUser>('LibraryUser', libraryUserSchema);