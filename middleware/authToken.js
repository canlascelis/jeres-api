import Jwt from "jsonwebtoken";

//NOTE: this will be used when accessing requesting data
//console.log(Jwt.sign({name: 'Jeres'}, process.env.ACCESS_TOKEN_SECRET));

function authenticateToken(req, res, next) {
    //request the header to client
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // if the token is null return or not equal to the accesstoken rtrn a status error code 
    if (token == null) return res.status(401)

    //verify if the token is match to accesstoken
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403) && res.json({ error: error })
        }
        //req.user = decoded;
        //console.log(decoded);
        next();
    });
}

export default authenticateToken;