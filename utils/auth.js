const APPROVED_STATUS = 1

const isApproved = (req, res, next) => {
    const userStatus = req.user && req.user.status

    if (userStatus >= APPROVED_STATUS) {
        next()
    } else {
        res.status(403).json({ err: 'Unauthorized, please contact a moderator' });
    }
}

module.exports = { isApproved}