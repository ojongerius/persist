import mongoose from 'mongoose';

import Student from './app/server/models/student';
import User from './app/server/models/user'
import Notification from './app/server/models/notification';
import School from './app/server/models/school';

mongoose.connect('mongodb://localhost:27017/nyc_outward');
const bulk = User.collection.initializeUnorderedBulkOp();
User
    .findOne({
        _id: '585cf33604388a0d63fd9f6a'
    }, {'notifications.$': 0}, (err, user) => {
        console.log(user);
    });