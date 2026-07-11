const jwt = require('jsonwebtoken');
// const User = require('../../models/User');  // uncomment when you have the model

module.exports = async ({ req }) => {
  // Simple auth extraction (commented out for now)
  // const token = req.headers.authorization?.replace('Bearer ', '') || '';
  // let user = null;
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   user = await User.findById(decoded.id);
  // } catch (e) {}
  // return { user, req };

  // For now, return an empty context
  return { req };
};