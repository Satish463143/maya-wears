require("dotenv").config();
const jwt = require('jsonwebtoken');
const UserModel  = require('../modules/user/user.model')

const authOrAnonymous = async (req, res, next) => {
    try {
        let userId = null;

        // Check if token exists in the Authorization header
        const token = req.headers['authorization'] ? req.headers['authorization'].split(' ').pop() : null;

        if (token) {   
            try {
                // Validate the token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await UserModel.findById(decoded.sub);

                if (!user) {
                    throw { status: 401, message: 'Invalid token: user not found' };
                }

                // Set authUser for logged-in user
                req.authUser = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                };
                userId = user._id;
            } catch (err) {
                throw { status: 401, message: 'Invalid or expired token' };
            }
        } else if (req.cookies.cartId) {
            // For anonymous users, use cartId from cookies
            userId = req.cookies.cartId;
        } else {
            return res.status(400).json({ message: 'No token or cartId provided' });
        }

        // Attach userId (either logged-in or anonymous) to the request
        req.userId = userId;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authOrAnonymous;