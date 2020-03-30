exports.createPostValidator = (req, res, next) => {
    //title error checking
    req.check('hashTags', 'The hashTags is missing').notEmpty()
    req.check('hashTags', 'hashTags must be more than 4 characters').isLength({min:4, max:150})

    //body error checking
    req.check('description', 'the description is missing').notEmpty()
    req.check('description', 'Description must be more than 4 characters').isLength({min:4, max:2000})

    //check errors
    const errors = req.validationErrors()
    //show errors as the occur
    if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    //proceed to next function
    next()
}

exports.userSignUpValidator = (req, res, next) => {
    //name is not ""
    req.check("name", "Name is required").notEmpty()

    //email
    req.check("email", "is required").matches(/.+\@.+\..+/).withMessage("@ sign missing")

    //check for pass
    req.check("password", "Password is required").notEmpty()
    req.check('password').isLength({min: 6}).withMessage("passwords must contain 6 characters").matches(/\d/).withMessage("Password Must contain 1 number")
    //check for errors
    //check errors
    const errors = req.validationErrors()
    //show errors as the occur
    if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    //proceed to next function
    next()
}

exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check('newPassword', 'Password is required').notEmpty();
    req.check('newPassword')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 chars long')
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage('must contain a number')
        .withMessage('Password must contain a number');

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};