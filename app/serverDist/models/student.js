'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Student = undefined;

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _ = require('./');

var _schemas = require('../../common/schemas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Student = exports.Student = new Schema((0, _schemas.studentSchema)(Schema));
Student.plugin(_mongoosePaginate2.default);

Student.pre('save', true, function (next, done) {
    next();
    var record = this;
    // handle hsGradYear
    if (record.hsGradDate instanceof Date) {
        record.hsGradYear = record.hsGradDate.getFullYear();
    } else {
        delete record.hsGradYear;
    }
    done();
});
Student.pre('save', true, function (next, done) {
    next();
    var record = this;
    // handle mostRecentCol
    if (record.terms.length < 1) {
        return done();
    }
    record.terms = (0, _sortBy2.default)(record.terms, function (obj) {
        return obj.enrolBegin;
    }).reverse();
    record.mostRecentCol = record.terms[0].college;
    record.mostRecentEnrolStatus = record.terms[0].status;
    done();
});
Student.pre('save', true, function (next, done) {
    next();
    var record = this;
    // handle expectedHSGrad
    if (record.cohort && record.cohort.length > 0) {
        var myRegexp = /.*\s\((\d{4})\)/g;
        var match = myRegexp.exec(record.cohort);
        if (match && match[1]) {
            var year = Number(match[1]);
            record.expectedHSGrad = new Date('9/15/' + (year + 4));
        }
    }
    done();
});
Student.pre('save', true, function (next, done) {
    next();
    var record = this;
    // nscRecordFound
    if (record.terms.length > 0) {
        record.nscRecordFound = true;
    }
    done();
});
Student.pre('save', true, function (next, done) {
    next();
    var record = this;
    // cuny
    if (record.applications.length > 0) {
        var colList = (0, _map2.default)(record.applications, 'college');
        _.College.find({
            $and: [{ _id: { $in: colList } }, { collType: 1 }]
        }, function (err, cunyColleges) {
            if (err) {
                return done(err);
            }
            if (cunyColleges.length > 0) {
                record.cunyApp = 'Completed';
            }
            return done();
        });
    }
    done();
});
Student.pre('save', true, function (next, done) {
    next();
    var record = this;
    // suny
    if (record.applications.length > 0) {
        var colList = (0, _map2.default)(record.applications, 'college');
        _.College.find({
            $and: [{ _id: { $in: colList } }, { collType: 2 }]
        }, function (err, sunyColleges) {
            if (err) {
                return done(err);
            }
            if (sunyColleges.length > 0) {
                record.sunyApp = 'Completed';
            }
            return done();
        });
    }
    done();
});
exports.default = mongoose.model('Student', Student);