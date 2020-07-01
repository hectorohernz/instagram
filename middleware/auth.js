const jswt = require('jsonwebtoken');

// @ DESC EXPORTING A MIDDLEWARE FUNCTINO 


module.exports = function(req,res,next){ 
    // Getting the  token from header with the line below
    const token = req.header('x-auth-token');

    // Check if there's no token rejecting the request
    if(!token){
        return res.status(401).json({msg: "No Token, Authorization denied"})
    };

    // Verify Token 
    try{ // Decoding the verify the token is valid \
        const decoded =  jswt.verify(token, process.env.JWT_SECRET); // Decocding token 
        req.user = decoded.user; // Decoded token 
        next(); 
    } catch(err){ // If there's a token but not valid. The lines below will run
        res.status(401).json({msg: "Token Is Not Valid"})
    };


}