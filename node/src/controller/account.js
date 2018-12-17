import mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../model/account';
import bodyParser from 'body-parser';

import passport from 'passport';
import config from '../config';

import { generateAccessToken, respond, authenticate } from '../middleware/authmiddleware';

export default({ config, db }) => {
    let api = Router();

    // 'v1/account'
    api.post('/register', (req, res) => {
        Account.register(new Account({ username: req.body.email }), req.body.password, function(err, account) {
            if (err) {
                return res.status(500).send('An error occurred: ' + err);
            }

            passport.authenticate(
                'local', {
                    session: false
                }) (req, res, () => {
                    res.status(200).send('Successfully created new account!');
                });
            });
        });

    return api;
};

