const User = require("../models/users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async (username, email, password, phone) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({

            user_username: username,
            user_email: email,
            user_pass: hashedPassword,
            user_phone: phone,
            joined_on: new Date(),
        });

        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw new Error('Failed to retrieve users');
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            return user.toJSON();
        }
        return "User not found";
    } catch (error) {
        console.error('Error retrieving user by ID:', error);
        throw new Error('Failed to retrieve user');
    }
};

const getUserByEmail = async (user_email) => {
    try {
        const user = await User.findOne({ where: { user_email: user_email } });


        return user || null;
    } catch (err) {
        throw new Error(`Error in finding the user with the email ${user_email}`);
    }
};
const updateUser = async (id, username, email, password, phone) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const updated = await User.update({
            user_username: username,
            user_email: email,
            user_pass: hashedPassword,
            user_phone: phone,
        }, {
            where: { user_id: id }
        });

        return updated;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
    }
};

const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
           throw new Error(`User with the id ${id} is not found`); 
        }
        const deletedUser = await user.destroy();
        return deletedUser;
       
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail
};
