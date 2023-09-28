require('dotenv').config({ path: '../.env' });
const jwt = require ('jsonwebtoken')

const verifyToken = (req,res,next) => {
    const bearerHeader = req.headers['authorization']
    if(!bearerHeader){
        return res.status(401).send('Unauthorized request')
    }
    let token = bearerHeader.split(' ')[1]
    if(token === null){
        return res.status(401).send('Unauthorized request')
    }
    
    try {
        jwt.verify(token, process.env.JWTSECRET,(err,user)=>{
            if(err) {
                return res.sendStatus(403)
            }
            req.userId = user.subject
            next ()
        });
        
        

    } catch (err) {
        return res.status (401) .send ('Unauthorized request')

    }


}

module.exports = {
    verifyToken,
}