const { ac, grantAccess } = require('../accessControl');
grantAccess();
exports.checkPermission = (action, resource) => {
    return (req, res, next) => {
        try {
            const permission = ac.can(req.user.role)[action](resource);
            if (!permission.granted) { return res.status(403).json({ msg: "No tienes permiso para realizar esta acción" }); }
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error al verificar permisos' });
        }
    };
};