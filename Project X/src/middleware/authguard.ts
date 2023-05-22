/* Process of the Middleware is 
    1) Extract the token from req header
    2) Check the middle ware is valid or Not
    3) If middelware is Valid to call the next middleware in the request processing pipe-line 
 */
// Import some packages
const jwt = require('jsonwebtoken');




class AuthGuard{

    // Three parameters provided 
    async validateToken(req: { header: (arg0: string) => any; userToken: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }, next: () => void){
        console.log("Inside the Token Validation >>>>>>>>")
        try{
            // First verify the Request Header have a Token or Not
            const token = req.header('x-access-token')

            if(!token) return res.status(401).send('Token was not provides') // That means Unathorized use
            
            // If Request Header have a Token then validate the given token is "Valid" OR "Not"
            // Use JWT "verify" method helps to validate the token
            // Syntax of verify ==> verify(REQ_HEADER_TOKEN, SECRET_KEY)

            const validToken = jwt.verify(token, process.env.SECRET_KEY);

            if(validToken){
                // Pass the decoded token to REQUEST
                req.userToken = validToken;
                next()
            }

        }catch(e){
            res.status(400).send("Invalid token");
        }

    }
}

module.exports.authGuard = new AuthGuard()