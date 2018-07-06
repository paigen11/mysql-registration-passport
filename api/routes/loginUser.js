import User from '../sequelize';

module.exports = (app) => {
    app.post('/loginUser', (req, res) => {
        User.findOne({
            where: {
                username: req.query.username,
                password: req.query.password
            }
        }).then(() => {
            console.log('user found');
            res.json('user found');
        })
    })
};