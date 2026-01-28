const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    userAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
