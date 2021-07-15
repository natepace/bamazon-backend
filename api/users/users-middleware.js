const Users = require('./users-model')
const bcrypt = require('bcryptjs')
// find specific user by id
// getbyid
// 
// verify new user fields
// 
// verify new user is unique
// getby
// 
// confirm user on login exists
// getby & bcrypt
// 
// confirm user filled out all fields on login
// 
const checkId = (req, res, next) => {
    const id = req.params.user_id
    Users.getById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "User not found"
                })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
}

const confirmRegistration = (req, res, next) => {
    const { username,
        name,
        email_address,
        phone_number,
        address_line,
        address_state,
        address_city,
        zip_code,
        password } = req.body
    if (!username || username.trim() === null ||
        !name || name.trim() === null ||
        !email_address || email_address.trim() === null ||
        !phone_number || phone_number.trim() === null ||
        !address_line || address_line.trim() === null ||
        !address_state || address_state.trim() === null ||
        !address_city || address_city.trim() === null ||
        !zip_code || zip_code === null ||
        !password || password.trim() === null
    ) {
        res.status(400).json({
            message: "complete all required fields"
        })
    }
    else {
        next()
    }
}

const checkUnique = (req, res, next) => {
    const { username, email_address, phone_number } = req.body
    console.log(1, req.body)
    Users.getBy({ username })
        .then(user => {

            if (user.username !== undefined) {
                // console.log(user, user.username)
                res.status(422).json({
                    message: "username already taken"
                })

            }
            else {
                Users.getBy({ email_address })
                    .then(user => {
                        if (user.email_address !== undefined) {
                            res.status(422).json({
                                message: "an account has already been created with that email address"
                            })
                        }
                        Users.getBy({ phone_number })
                            .then(user => {
                                if (user.phone_number !== undefined) {
                                    res.status(422).json({
                                        message: "an account has already been created with that phone number"
                                    })
                                }
                                else {
                                    next()
                                }
                            })
                    })
            }

        })

}

const validateLogin = (req, res, next) => {
    const { username, password } = req.body
    Users.getBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next()
            }
            else {
                res.status(401).json({
                    message: "incorrect username or password"
                })
            }
        })
}

const confirmLogin = (req, res, next) => {
    const { username, password } = req.body
    if (!username || username.trim() === null ||
        !password || password.trim() === null
    ) {
        res.status(400).json({
            message: "complete all required fields"
        })
    }
    else {
        next()
    }

}



module.exports = {
    checkId,
    confirmRegistration,
    checkUnique,
    validateLogin,
    confirmLogin


}