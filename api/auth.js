const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenicateToken = (req, res, next) => {
    const token = req.header('authorization')?.split(' ')[1];
    if (token == null) return res.sendStatus(401).json({ message: 'no token found' });

    try{
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    }catch(err){
        res.sendStatus(403).json({ message: 'invalid token' });
    }

};

module.exports = authenicateToken;