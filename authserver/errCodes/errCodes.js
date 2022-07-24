module.exports = {
    USER_ID_NOT_FOUND: {
        code: "USER_ID_NOT_FOUND",
        description: "user id not found"
    },
    ACCESS_TOKEN_NOT_FOUND: {
        code: "ACCESS_TOKEN_NOT_FOUND",
        description: "access token not found"
    },
    TOKEN_EXPIRED: {
        code: "TOKEN_EXPIRED",
        description: "access token is expired"
    },
    INVALID_ACCESS_TOKEN: {
        code: "INVALID_ACCESS_TOKEN",
        description: "access token is invalid"
    },
    LAST_ISSUED_ACCESS_TOKEN_MISMATCH: {
        code: "LAST_ISSUED_ACCESS_TOKEN_MISMATCH",
        description: "last issued acces token is mismatched"
    },
    REFRESH_TOKEN_NOT_FOUND: {
        code: "REFRESH_TOKEN_NOT_FOUND",
        description: "refresh token is not found"
    },
    LAST_ISSUED_ACCESS_TOKEN_NOT_FOUND: {
        code: 'LAST_ISSUED_ACCESS_TOKEN_NOT_FOUND',
        description: "last issued access token not found in request body"
    },
    LAST_ISSUED_ACCESS_TOKEN_NOT_EXPIRED: {
        code: "LAST_ISSUED_ACCESS_TOKEN_NOT_EXPIRED",
        description: "last issued access token is not expored , can't assign a new token , user must log out to delete token and then login to generate new tokens"
    },
    INVALID_REFRESH_TOKEN: {
        code: " INVALID_REFRESH_TOKEN",
        description: "refresh token is not valid"
    },
    INTERNAL_SERVER_ERROR: {
        code: "INTERNAL_SERVER_ERROR",
        description: "something went wrong in server"
    }
}