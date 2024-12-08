const jwt = require('jsonwebtoken');
const UserModel = require('../modules/user/user.model');
const mongoose = require('mongoose');

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

                // If the token belongs to a logged-in user, set userId
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
            // If no token or cartId, create a new anonymous userId (cartId)
            userId = new mongoose.Types.ObjectId().toString(); // Generate a new ObjectId
            res.cookie('cartId', userId, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Set cartId cookie for anonymous users
        }

        // Attach the resolved userId (from token, cookie, or newly generated) to the request
        req.userId = userId;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authOrAnonymous;
