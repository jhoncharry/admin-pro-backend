const jwt = require("jsonwebtoken");


// ================================
// Verificar Token
// ================================

const validarJWT = (req, res, next) => {

    let token = req.get("token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "No hay token en la peticion"
        });
    }


    try {

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = id;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: "Token no valido"
        });
    }




}


module.exports = {
    validarJWT
}




