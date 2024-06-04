// exports.isAuthenticated = (req, res, next) => {
//     if (req.session && req.session.userId) {
//         return next();
//     }
//     res.status(401).json({ message: 'You must be logged in to view this page' });
// };
//
// exports.isAdmin = (req, res, next) => {
//     if (req.session && req.session.role === 'admin') {
//         return next();
//     }
//     res.status(403).json({ message: 'You do not have permission to view this page' });
// };
