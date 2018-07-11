import User from '../sequelize';

module.exports = (app) => {
    app.post('/loginUser', (req, res) => {
        User.findOne({
            where: {
                username: req.query.username,
                password: req.query.password
            }
        })
            .then((user) => {
                if(user != null){
                    console.log('user found & logged in');
                    res.json('user found & logged in');
                } else {
                    console.log('bad username or password');
                    res.json('bad username or password');
                }
        })
            .catch(err => {
                console.log('problem communicating with db');
                res.status(500).json(err);
            })
    })
};