import DBLocal from 'db-local';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './config.js';

const { Schema } = new DBLocal({ path: './database' });

const User = Schema('User', {
    _id: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
})

export class UserRepository {

    static async create({ username, password }) {

        Validation.username(username);
        Validation.password(password);
        
        let user = User.findOne({username});

        if (user) {
            throw new Error('username already exist');
        }

        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        User.create({
            _id: id,
            username,
            password:hashedPassword
        }).save();
        user = User.findOne({username});
        
        return {_id: user._id, username: user.username};
    }

    static async login({username, password}) {

        Validation.username(username);
        Validation.password(password);

        const user = User.findOne({username});
        if (!user) throw new Error('username does not exist');
        
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            throw new Error('password not correct');
        }
        return {_id: user._id, username: user.username};
         
    }

}

class Validation {
    static username(username){
        if (typeof username != 'string') throw new Error ('username must be a string');
        if (username.length < 3) throw new Error ('username must be at least 3 characters long');
    }
    static password(password){
        if(typeof password != 'string') throw new Error('password mus be a string');
        if(password.length < 7) throw new Error('password mus be at least 7 characters long');
    }
}

