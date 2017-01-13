import validator, {messages, enums} from '../validator';

const Parent = {
    relationship: String,
    name: String,
    mobile: Number,
    textable: Boolean,
    workPhone: Number,
    OtherPhone: [Number]
};

const termSchema = (Schema) => (
    new Schema({
        name: String,
        college: {
            type: Schema.Types.ObjectId,
            ref: 'College'
        },
        status: String,
        enrolBegin: Date,
        enrolEnd: Date,
        creditsEarned: Number,
        creditsAttempted: Number,
        gpa: Number
    })
);

const documentSchema = (Schema) => (
    new Schema({
        name: String,
        type: String,
        Key: String,
        downloadLink: String
    })
);

const caseNotesSchema = (Schema) => (
    new Schema({
        description: String,
        communicationType: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        date: Date,
        needFollowUp: Boolean,
        issueResolved: Boolean
    })
);

const applicationsSchema = (Schema) => (
    new Schema({
        college: {
            type: Schema.Types.ObjectId,
            ref: 'College'
        },
        result: String,
        heop: String,
        attending: Boolean,
        defer: Boolean,
        notes: String
    })
);

const graduationsSchema = (Schema) => (
    new Schema({
        college: {
            type: Schema.Types.ObjectId,
            ref: 'College'
        },
        status: String,
        enrolBegin: Date,
        enrolEnd: Date,
        type: String
    })
);

export default (Schema) => {
    return {
        firstName: {
            type: String,
            index: true
        },
        lastName: String,
        middleName: String,
        fullName: String,
        suffix: String,
        altName: String,
        hsGradYear: Number,
        tags: {
            type: [String]
            // validate: {
            //   validator: validator.tags.bind(validator),
            //   message: messages.default
            // }
        },
        edHistNo: String,
        recType: String,
        schoolAccName: String,
        schoolType: String,
        enrollmentStatus: String,
        termName: String,
        termStartDate: Date,
        termEndDate: Date,
        termGPA: Number,
        cumulativeGPA: Number,
        creditHoursAttempted: Number,
        creditHoursGradEarned: Number,
        remedialHoursEarned: Number,
        termID: String,
        educationalHistory: String,
        contactID: {
            type: String,
            index: true
        },
        dob: {
            type: Date
        },
        mobile: Number,
        textable: Boolean,
        homePhone: Number,
        otherPhone: String,
        email: String,
        lastModifiedDate: Date,
        lastModifiedBy: String,
        parentGuardian: [Parent],
        hsID: Number,
        hsAttended: {
            type: String,
            enum: enums.hsAttended
        },
        cellPhone: String,
        email1: String,
        email2: String,
        parentName: String,
        parentContact: String,
        majorMinor: String,
        mostRecentColEmp: String,
        transferStatus: {
            type: [String],
            validate: {
                validator: validator.transferStatus.bind(validator),
                message: messages.default
            }
        },
        studentSupportOrgName: {
            type: [String],
            validate: {
                validator: validator.studentSupportOrgName.bind(validator),
                message: messages.default
            }
        },
        studentSupportOrgNameOther: String,
        cohort: String,
        hsGradDate: Date,
        iniEnrollDate: Date,
        ethnicity: {
            type: Number,
            min: [
                1, 'Ethnicity must be between 1 and 7'
            ],
            max: [7, 'Ethnicity must be between 1 and 7']
        },
        gender: {
            type: String,
            enum: enums.gender
        },
        SAT: {
            math: Number,
            cr: Number
        },
        actEquiv: Number,
        hsGPA: Number,
        terms: [termSchema(Schema)],
        graduations: [graduationsSchema(Schema)],
        documents: [documentSchema(Schema)],
        caseNotes: [caseNotesSchema(Schema)],
        ferpa: {
            type: String,
            enum: enums.ferpa
        },
        remediationStatus: {
            type: [String],
            validate: {
                validator: validator.remediationStatus.bind(validator),
                message: messages.default
            }
        },
        residency: {
            type: String,
            enum: enums.residency
        },
        riskFactors: {
            type: [String],
            validate: {
                validator: validator.riskFactors.bind(validator),
                message: messages.default
            }
        },
        employmentStatus: {
            type: [String],
            validate: {
                validator: validator.employmentStatus.bind(validator),
                message: messages.default
            }
        },
        progressToGradAss: {
            type: String,
            enum: enums.progressToGradAss
        },
        progressToGradBa: {
            type: String,
            enum: enums.progressToGradBa
        },
        tshirtSize: {
            type: String,
            enum: enums.tshirtSize
        },
        sweatshirtSize: {
            type: String,
            enum: enums.sweatshirtSize
        },
        applicationWave: {
            type: Number,
            min: [1, 'Application Wave must be between 1 and 3'],
            max: [3, 'Application Wave must be between 1 and 3']
        },
        commonApp: {
            type: String,
            enum: enums.commonApp
        },

        housingStatus: {
            type: String,
            enum: enums.housingStatus
        },
        physImmunRecords: {
            type: String,
            enum: enums.physImmunRecords
        },
        registeredForClasses: {
            type: String,
            enum: enums.registeredForClasses
        },
        postSecPlan: {
            type: String,
            enum: enums.postSecPlan
        },
        commsType: {
            type: [String],
            validate: {
                validator: validator.commsType.bind(validator),
                message: messages.default
            }
        },
        hs: {
            type: Schema.Types.ObjectId,
            ref: 'School'
        },
        intendedCollege: {
            type: Schema.Types.ObjectId,
            ref: 'College'
        },
        act: Number,
        osis: Number,
        startedFafsa: Boolean,
        needsFollowup: Boolean,
        completedFafsa: Boolean,
        completedTap: Boolean,
        needGap: Boolean,
        amountOfNeedGap: Number,
        facebookName: String,
        parentPhone: String,


        // TO ADD IN
        attendingMeetupDay: Boolean,
        expectedGrad: Number,
        photoReleaseForm: Boolean,
        psat: Number,
        eaEdApplications: Boolean,
        lettersOfRecommendation: Boolean,
        taxDocumentsSubmitted: Boolean,
        opportunityProgramEligible: Boolean,
        studentAidReportReceived: Boolean,
        fsaid: Number,
        cssProfileCreated: Boolean,
        awardLetterReceived: Boolean,
        scholarshipAmount: Number,
        cunyApp: {
            type: String,
            enum: enums.cunyApp
        },
        sunyApp: {
            type: String,
            enum: enums.sunyApp
        },
        desiredFieldOfStudy: String,
        completedEssay: Boolean,
        crewAdvisor: String,
        satSubjectTests: String,
        appliedToOtherSupportProgram: Boolean,
        applications: [applicationsSchema(Schema)],
        degreeTitle: String,
        gradDate: Date,
        preferredPronoun: String,
        nscRecordFound: Boolean,
        preferredLanguage: String
    };

    // TO FINISH
    // Graduation Date, Intended College, College Name, Term, Status

};