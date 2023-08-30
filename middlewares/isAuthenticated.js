
const isAuthenticated = (req, res, next) => {
    // Assuming you have a session or authentication mechanism
    // Check if the user is authenticated
    if (userIsAuthenticated) {
        // User is authenticated, proceed to the next middleware/route handler
        next();
    } else {
        // User is not authenticated, send an unauthorized response
        res.status(401).send("Unauthorized");
    }
};



module.exports = isAuthenticated;
