import User from '../sequelize';

module.exports = (app) => {
    app.delete('/deleteUser', (req, res) => {
        User.destroy({
            where: {
                username: req.query.username
            }
        })
            .then(user => {
                if(user === 1){
                    console.log('user deleted from db');
                    res.json('user deleted from db');
                } else {
                    console.log('user not found in db');
                    res.status(404).json('no user with that username to delete');
                }
            })
            .catch(err => {
                console.log('problem communicating with db');
                res.status(500).json(err);
            })
    });
};