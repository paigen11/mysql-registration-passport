import User from '../sequelize';

module.exports = (app) => {
    app.put('/updateUser', (req, res) => {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(user  => {
            if (user != null) {
                user.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                })
                    .then(() => {
                        console.log('user updated');
                        res.json('user updated')
                    })
            } else {
                console.log('no user exists in db to update');
                res.json('no user exists in db to update');

            }
        })
            .catch(err => {
                console.log('problem communicating with db');
                res.status(500).json(err);
            })
        })
};