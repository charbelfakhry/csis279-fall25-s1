const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require("../Services/UserService");

const usersController = {
  getUserByIdController: async (req, res) => {
    const user_id = req.params.id;
    console.log(req.params.id);
    try {
      if (!user_id) return res.status(400).json({ message: "Missing user id" });

      const user = await getUserById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error?.message });
    }
  },

  getAllUsersController: async (req, res) => {
    try {
      const users = await getAllUsers();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: error?.message });
    }
  },

  createUserController: async (req, res) => {
    const { user_username, user_email, user_pass, user_phone } = req.body;

    try {
      if (!user_username || !user_email || !user_pass || !user_phone) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const existingUser = await getUserByEmail(user_email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = await createUser(
        user_username,
        user_email,
        user_pass,
        user_phone
      );

      if (!newUser) {
        return res
          .status(500)
          .json({ message: "Failed to create a new user." });
      }

      res.status(201).json({ message: "New user created", user: newUser });
    } catch (error) {
      res.status(500).json({ error: error?.message });
    }
  },

  updateUserController: async (req, res) => {
    const { user_id, user_username, user_email, user_phone } =
      req.body;

    if (!user_id) {
      return res.status(400).json({ message: "Missing user id" });
    }

    try {
      const updatedUser = await updateUser(
        user_id,
        user_username,
        user_email,
        user_phone
      );

      if (!updatedUser) {
        return res.status(500).json({ message: "Failed to update user." });
      }

      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error?.message });
    }
  },

  deleteUserController: async (req, res) => {
    const user_id = req.params.id;

    if (!user_id) {
      return res.status(400).json({ message: "Missing user id" });
    }

    try {
      const result = await deleteUser(user_id);

      if (!result) {
        return res.status(500).json({ message: "Failed to delete user." });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error in deleting the user ${error.message}` });
    }
  },
};

module.exports = usersController;
