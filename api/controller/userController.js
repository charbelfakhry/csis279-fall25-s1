const UserService = require("../services/UserService"); 

const userController = {

    getUserByIdController : async (req, res) => {    
        const {user_id} = req.body;
        try {
            if(!user_id)
                return res.status(400).json({message : "Missing user id"});
    
            const user = await UserService.findUserById(user_id);
            res.status(201).json({ user });
        } catch (error){
            res.status(500).json({ error : error?.message })
        }
    
    },
    
    getAllUsersController : async (req, res) =>{
        try{
            const users = await UserService.getAllUsers();
            res.status(200).json({ users });
    
        } catch(error){
            res.status(500).json({ error : error?.message })
        }
    
    },
    
    createUserController : async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { user_name, user_username, user_email, user_pass, user_phone } = req.body;
    
        try {
            const response = await UserService.createUser(user_name, user_username, user_email, user_pass, user_phone);
    
            if(!response){
                return res.status(500).json({ message: "Failed to create a new user." });
            }
    
        } catch (error) {
            res.status(500).json({ error: error?.message });
        }
    
    },
    
    updateUserController : async (req, res) => {
        const { user_id, user_username, user_name, user_email, user_pass, user_phone } = req.body;
        if (!user_id) {
            return res.status(400).json({ message: "missing data" })
        }
    
        try {
            const response = await UserService.updateUser(user_id, user_username, user_name, user_email, user_pass, user_phone);
            res.status(201).json({ response });
        } catch (error) {
            res.status(500).json({ error: error?.message });
        }
    },
    
    deleteUserController : async (req, res) => {
        try {
            const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ message: "missing user id" });
        }
            const result = await UserSevice.deleteUser(user_id);
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    }
}


module.exports = userController;