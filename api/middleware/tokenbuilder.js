const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets');

function tokenBuilder(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
    };
    const options = {
        expiresIn: '3d',
    };
    const token = jwt.sign(
        payload,
        JWT_SECRET,
        options,
    );
    return token;
}

const restrict = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        res.status(401).json("no token found")
    } else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json(err.message)
            } else {
                req.decodedToken = decoded
                next()
            }
        })
    }
}



module.exports = {
    tokenBuilder,
    restrict

}