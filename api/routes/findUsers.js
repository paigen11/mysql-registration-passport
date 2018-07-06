import User from '../sequelize';

module.exports = (app) => {
    app.get('/findUser', (req, res) => {
        User.findOne({
            where: {
                username: req.query.username
            }
        })
            .then(user => {
                if(user != null){
                    console.log('user found in db');
                    res.json(user);
                } else {
                    console.log('user not found in db');
                    res.status(404).json('no user with that username');
                }

            })
            .catch(err => {
                console.log('problem communicating with db');
                res.status(500).json(err);
            })
    });
};