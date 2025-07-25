declare namespace Express {
  interface Request {
    userId?: string; // Optional userId property to store the authenticated user's ID
  }
}
