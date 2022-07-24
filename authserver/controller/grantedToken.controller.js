const grantedToken = require('../model/grantedToken.model');
const generateTokenSecret = require('../util/generateTokenSecret');
var jwt = require('jsonwebtoken');
const Err = require('../util/errorHandler.class');
const errCodes = require('../errCodes/errCodes');
const expiresIn = '1d';

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
            throw (new Err('userId not found in request body', 400, errCodes.USER_ID_NOT_FOUND));

        const accessTokenSecret = generateTokenSecret();
        const refreshTokenSecret = generateTokenSecret();
        const accessToken = jwt.sign({ userId }, accessTokenSecret, { expiresIn });
        const refreshToken = jwt.sign({ userId }, refreshTokenSecret);
        await grantedToken.create({
            userId,
            accessTokenSecret,
            refreshTokenSecret,
            lastIssuedAccessToken: accessToken
        });
        res.status(200).json({ sucess: true, payload: { accessToken, refreshToken } });
    }
    catch (error) {
        next({ error: error.message, statusCode: error.statusCode || 409, code: err.code });
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
        const { userId } = req.query;
        if (!userId)
            throw new Err('userId not found in query params', 409, errCodes.USER_ID_NOT_FOUND);

        const bearer = req.headers['authorization'];
        if (!bearer)
            throw new Err('token not found add an access token in req.header["Authorization"]', 403, errCodes.ACCESS_TOKEN_NOT_FOUND);

        const grantedTokenObj = await grantedToken.findOne({ userId });
        if (!grantedTokenObj)
            throw new Err(`No token found with id ${userId}`, 404, errCodes.USER_ID_NOT_FOUND);

        const accessToken = bearer.split(' ')[1];
        jwt.verify(accessToken, grantedTokenObj.accessTokenSecret, (err, payload) => {
            if (err)
                if (err.name === 'TokenExpiredError')
                    throw new Err(`Access token ${accessToken} is expired for user ${userId}`, 401, errCodes.TOKEN_EXPIRED);
                else
                    throw new Err(`Access token ${accessToken} is not valid for user ${userId}, ${err.name}`, 409, errCodes.INVALID_ACCESS_TOKEN);
            res.status(200).json({ success: true, payload: { message: `Access token verified for user ${userId}` } });
        });
    }
    catch (error) {
        next({ error: error.message, statusCode: error.statusCode || 409, code: error.code });
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
        const { userId, lastIssuedAccessToken } = req.body;
        if (!userId)
            throw new Err('userId not found in requset body', 409, errCodes.USER_ID_NOT_FOUND);

        if (!lastIssuedAccessToken)
            throw new Err('last assigned access token token not found in body', 409, errCodes.LAST_ISSUED_ACCESS_TOKEN_NOT_FOUND);

        const bearer = req.headers['authorization'];
        if (!bearer)
            throw new Err('token not found add an access token in req.header["Authorization"]', 403, errCodes.REFRESH_TOKEN_NOT_FOUND);

        const grantedTokenObj = await grantedToken.findOne({ userId });

        if (grantedTokenObj.lastIssuedAccessToken !== lastIssuedAccessToken)
            throw new Err(`last issued access token ${lastIssuedAccessToken} is not valid`, 409, errCodes.LAST_ISSUED_ACCESS_TOKEN_MISMATCH);

        // checking if lastIssuedAccessToken token is expired
        jwt.verify(lastIssuedAccessToken, grantedTokenObj.accessTokenSecret, (err, payload) => {
            if (!err)
                throw new Err(`Last issued access token is not expired for user ${userId}`, 401, errCodes.LAST_ISSUED_ACCESS_TOKEN_NOT_EXPIRED);

            const refreshToken = bearer.split(' ')[1];
            if (!refreshToken)
                throw new Err(`refresh token not found in header for user ${userId}`, 409, errCodes.REFRESH_TOKEN_NOT_FOUND);

            jwt.verify(refreshToken, grantedTokenObj.refreshTokenSecret, async (err, payload) => {
                if (err)
                    next({ error: `Refresh token ${refreshToken} is not valid for user ${userId}, ${err.name}`, statusCode: 409, code: errCodes.INVALID_REFRESH_TOKEN });
                else {
                    const newSecret = generateTokenSecret();
                    const newToken = jwt.sign({ userId }, newSecret, { expiresIn });
                    await grantedToken.updateOne({ userId }, { $set: { accessTokenSecret: newSecret, lastIssuedAccessToken: newToken } });
                    res.status(200).json({ success: true, payload: { message: `new Tokens generated for user ${userId}`, newToken } });
                }
            })
        });
    }
    catch (error) {
        next({ error: error.message, statusCode: error.statusCode || 409, code: error.code });
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
            throw new Error('userId not found in request id', 409, errCodes.USER_ID_NOT_FOUND);

        const bearer = req.headers['authorization'];
        if (!bearer)
            throw new Err('token not found add an access token in req.header["Authorization"]', 403, errCodes.ACCESS_TOKEN_NOT_FOUND);

        const grantedTokenObj = await grantedToken.findOne({ userId });
        if (!grantedTokenObj)
            throw new Err(`No token found with id ${userId}`, 404, errCodes.USER_ID_NOT_FOUND);

        const accessToken = bearer.split(' ')[1];
        jwt.verify(accessToken, grantedTokenObj.accessTokenSecret, async (err, payload) => {
            if (err)
                if (err.name === 'TokenExpiredError')
                    throw new Err(`Access token ${accessToken} is expired for user ${userId}`, 401, errCodes.TOKEN_EXPIRED);
                else
                    throw new Err(`Access token ${accessToken} is not valid for user ${userId}, ${err.name}`, 409, errCodes.INVALID_ACCESS_TOKEN);
            await grantedToken.deleteOne({ userId });
            res.status(200).json({ success: true, payload: { message: `token for ${userId} deleted successfully` } });
        });
    }
    catch (error) {
        next({ error: error.message, statusCode: 409 });
    }
}