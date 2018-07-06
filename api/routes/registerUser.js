import User from '../sequelize';

module.exports = (app) => {
    app.post('/registerUser', (req, res) => {
        const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };
        User.create({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            username: data.username,
            password: data.password
        })
            .then(user => {
                console.log('user created');
                res.json(user)
            })
    });
};