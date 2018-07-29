import User from '../sequelize';
import bcrypt from 'bcrypt';

module.exports = (app) => {
    app.get('/loginUser', (req, res) => {
        User.findOne({
            where: {
                username: req.query.username
            }
        })
            .then((user) => {
                if(user != null){
                    bcrypt.compare(req.query.password, user.password)
                        .then((response) => {
                            console.log(response);
                            if(response === true){
                                console.log('user found & logged in');
                                res.json('user found & logged in');
                            } else {
                                console.log('passwords do not match');
                                res.json('passwords do not match');
                            }
                        })
                } else {
                    console.log('bad username');
                    res.json('bad username');
                }
            })
            .catch(err => {
                console.log('problem communicating with db');
                res.status(500).json(err);
            })
    })
};