import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Retrieve the Authorization header from the request
  const authHeader = req.header('Authorization');
  console.log(req.headers); // This will print all headers to the console

  // Check if the Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Not authorized. Login again." });
  }

  // Extract the token from the Authorization header
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    // Verify the token using the JWT_SECRET from the environment variables
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user ID from the token to the request body
    req.body.userId = token_decoded.id;
    
    // Call the next middleware in the stack
    next();
  } catch (e) {
    // Log the error and send a 401 Unauthorized response
    console.error("Error in authMiddleware", e);
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default authMiddleware;
