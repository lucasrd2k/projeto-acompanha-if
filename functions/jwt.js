const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function verifyJWTAdmin(req, res, next) {
    try {
        //Token bearer split
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                error: true,
                message: "Token não encontrado!"
            });
        }
        const decoded = await jwt.verify(token, process.env.JWT_KEY_ADM);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({
            error: true,
            message: "Token inválido!"
        });
    }
}

async function verifyJWTAluno(req, res, next) {
    try {
        //Token bearer split
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                error: true,
                message: "Token não encontrado!"
            });
        }
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({
            error: true,
            message: "Token inválido!"
        });
    }
}

function generateJWT(payload, secret, options = { expiresIn: '500h' }) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    verifyJWTAdmin,
    verifyJWTAluno,
    generateJWT
}