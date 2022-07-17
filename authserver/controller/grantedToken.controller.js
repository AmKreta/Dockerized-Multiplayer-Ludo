const grantedToken = require('../model/grantedToken.model');
const generateTokenSecret = require('../util/generateTokenSecret');
var jwt = require('jsonwebtoken');
const Err = require('../util/errorHandler.class');

/*
    @method POST
    @reqBody {userId:String}
    @access public
    @url /generateToken
*/
module.exports.generateToken = async (req, res, next) => {
    try {
        const { userId } = req.body;
        if (!userId)
            throw (new Err('userId not found in request body', 400));
        const accessTokenSecret = generateTokenSecret();
        const refreshTokenSecret = generateTokenSecret();
        const accessToken = jwt.sign({ userId }, accessTokenSecret, { expiresIn: '1d' });
        const refreshToken = jwt.sign({ userId }, refreshTokenSecret);
        await grantedToken.create({
            userId,
            accessTokenSecret,
            refreshTokenSecret,
            lastIssuedAccessToken
        });
        res.status(200).json({ sucess: true, payload: { accessToken, refreshToken } });
    }
    catch (error) {
        next({ error, statusCode: error.statusCode || 409 });
    }
}

/*
    @method GET
    @reqBody {userId:String}
    @reqHeader {Authorization:`Bearer ${accessToken}`}
    @access public
    @url /verifyToken
*/
module.exports.verifyToken = async (req, res, next) => {
    try {
        const { userId } = req.body;
        if (!userId)
            throw new Error('userId not found in request body');
        const bearer = req.header['Authorization'];
        if (!bearer)
            throw new Error('token not found add an access token in req.header["Authorization"]', 403);
        const grantedTokenObj = grantedToken.find({ userId });
        if (!grantedTokenObj)
            throw new Error(`No token found with id ${userId}`);
        const accessToken = bearer.split(' ')[1];
        jwt.verify(accessToken, grantedTokenObj.accessTokenSecret, (err, payload) => {
            if (err)
                if (err.name === 'TokenExpiredError')
                    throw new Err(`Access token ${accessToken} is expired ${userId}`, 401);
                else
                    throw new Err(`Access token ${accessToken} is not valid for user ${userId}`);
            res.status(200).json({ success: true, payload: { message: 'Access token verified' } });
        });
    }
    catch (err) {
        next({ error, statusCode: error.statusCode || 409 });
    }
}

/*
    @method PUT
    @reqBody {userId:String}
    @reqHeader {Authorization:`Bearer ${refreshToken}`}
    @access public
    @url /reassignToken
*/
module.exports.reassignToken = async (req, res, next) => {
    try {

    }
    catch (err) {

    }
}

/*
    @method DELETE
    @reqBody {userId:String}
    @reqHeader {Authorization:`Bearer ${token}`}
    @access public
    @url /deleteToken
*/
module.exports.deleteToken = async (req, res, next) => {
    try {
        const { userId } = req.body;
        if (!userId)
            throw new Error('userId not found in request id');
        await grantedToken.deleteOne({ userId });
        res.status(204).json({ success: true, payload: { message: `token for ${userId} deleted successfully` } });
    }
    catch (err) {
        next({ error, statusCode: 409 });
    }
}