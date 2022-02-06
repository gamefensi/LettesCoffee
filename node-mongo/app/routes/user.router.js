module.exports = function(app) {

    var users = require('../controllers/user.controller.js');

    app.post('/api/user', users.createUser);
    app.get('/api/user/:id', users.getUser); 
    app.get('/api/users', users.users);
    app.put('/api/user', users.updateUser);
    app.delete('/api/user/:id', users.deleteUser);
}