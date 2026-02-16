export const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user?.role) return res.status(401).json({success:false, message:"Authorization Role not found"});

        // Check if the user's role is in the array of allowed roles passed to the function
        const result = allowedRoles.includes(req.user.role);

        if (!result) return res.status(403).json({success:false, message:"Access Denied"}); 
        
        next(); 
    }
}

//usage example:

// .verifyRoles("HR Manager","Finance Manager")