// Admon user middleware 
// Check the user is Admin or Not 
// This is Role based access control


function isAdminOrNot(req: { user: { isAdmin: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }, next: () => void) {
    if (req.user.isAdmin) {
        next();
    } else {
        //403 is Forbident - This user can not use this route or service
        res.status(403).send("Access denied")
    }
}

module.exports.isAdmin = isAdminOrNot