const User = require("../models/users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async (name, username, email, password, phone) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            user_name: name,
            user_username: username,
            user_email: email,
            user_pass: hashedPassword,
            user_phone: phone,
            joined_on: new Date(),
        });

        return newUser.toJSON();
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

const updateUser = async (id, username, name, email, password, phone) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const updated = await User.update({
            user_username: username,
            user_name: name,
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
        if (user) {
            const deletedUser = await user.destroy();
            return deletedUser.toJSON();
        }
        return "User not found";
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
};
