import mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../model/Account';
import bodyParser from 'body-parser';

import passport from 'passport';
import config from '../config';

import { generateAccessToken, respond, authenticate } from '../middelware/authmoddleware';

export default({ config, db }) => {
    let api = Router();

    return api;
};

