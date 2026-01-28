const Problem = require('../models/Problem');
const Submission = require('../models/Submission');
const User = require('../models/User');
const { checkAnswer } = require('../services/gradingService');

exports.submitAnswer = async (req, res) => {
    try {
        const { problemId, answer } = req.body;
        const userId = req.user.id;

        // 1. Находим задачу, включая правильный ответ (select('+correctAnswer'))
        const problem = await Problem.findById(problemId).select('+correctAnswer');
        if (!problem) return res.status(404).json({ message: 'Problem not found' });

        // 2. Проверяем ответ через сервис
        const isCorrect = checkAnswer(problem, answer);

        // 3. Сохраняем попытку
        const submission = new Submission({
            user: userId,
            problem: problemId,
            userAnswer: answer,
            isCorrect
        });
        await submission.save();

        // 4. Если верно, обновляем рейтинг юзера и список решенных
        if (isCorrect) {
            await User.findByIdAndUpdate(userId, {
                $inc: { score: 10 }, // +10 очков за решение
                $addToSet: { solvedProblems: problemId } // Добавить в массив (без дублей)
            });
        }

        res.json({ 
            success: isCorrect, 
            message: isCorrect ? 'Correct! Well done, Doctor.' : 'Incorrect diagnosis.',
            scoreEarned: isCorrect ? 10 : 0
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
