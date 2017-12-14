var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passportService = require('../../config/passport'),
    passport = require('passport');

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);
    router.route('/users/login').post(requireLogin, login);
    

    router.route('/users', function (req, res, next) {
        logger.log('Get all users', ' verbose');


        User.find()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/users/:userId', function (req, res, next) {
        logger.log('Get user ' + req.prarams.userId, 'verbose');

        User.findbyId(req.params.userId)
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: "No user Found" });

                }
            })
            .catch(error => {
                return next(error);
            });

    });

    router.post('/users', function (req, res, next) {
        logger.log('Create user', 'verbose');

        var user = new User(req.body);
        user.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                return next(err);
            });
    });

    router.put('/users/:userId', function (req, res, next) {
        logger.log('Create user ' + req.params.userId, 'verbose');

        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true, multi: false })
            .then(user => {
                res.status(200).json(user);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.put('/users/password/:userId'), function (req, res, next) {
        logger.log('Create user ' + req.params.userId, 'verbose');

        User.findById(req.params.userId)
            .exec()
            .then(function (user) {
                if (req.body.passworkd !== undefined) {
                    user.password = req.body.password;
                }

                user.save()
                    .then(function (user) {
                        res.status(200).json(user);
                    })
                    .catch(function (err) {
                        return next(err);
                    });

            })
            .catch(function (err) {
                return next(err);
            });
    };



    router.route('/users/:userId').delete(function (req, res, next) {
        logger.log('Delete user ' + req.params.userId, 'verbose');

        User.remove({ _id: req.params.userId })
                    .then(user => {
                            res.status(200).json({ msg: "User Deleted" });
                    })
                    .catch(error => {
                            return next(error);
                    });
    });
}