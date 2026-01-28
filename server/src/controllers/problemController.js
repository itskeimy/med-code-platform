const Problem = require('../models/Problem');

// Получить все задачи
exports.getAllProblems = async (req, res) => {
    try {
        // Не отправляем correctAnswer клиенту
        const problems = await Problem.find().select('-correctAnswer'); 
        res.json(problems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Получить задачу по ID
exports.getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id).select('-correctAnswer');
        if (!problem) return res.status(404).json({ message: 'Problem not found' });
        res.json(problem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Создать задачу (Для админа/сидов)
exports.createProblem = async (req, res) => {
    try {
        // Здесь можно добавить загрузку файла через req.file (Multer)
        const problem = new Problem(req.body);
        await problem.save();
        res.status(201).json(problem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
