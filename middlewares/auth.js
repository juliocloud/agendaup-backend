const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
     /*
     Here we are giving the option of using the cookie token.
     The frontend application uses header tokens. But other application who is able to use 
     cookies, can use it 
     */
     const { authorization } = req.headers

     const token = authorization || req.cookies.token

     if(!token){
          return res.status(401).json({ error: 'You have to login'})
     } 

     const verification = jwt.verify(
          token,
          process.env.JWT_SECRET,
          (err, decoded) => {
               if(err){ 
                    return res.status(401).json({ error: 'The token expired'});
               }
               else {
                    req.user = decoded.user;
                    next();
               }
          }
     )
}

module.exports = authentication