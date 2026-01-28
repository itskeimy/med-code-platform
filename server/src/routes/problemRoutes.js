const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// GET /api/problems - получить все задачи
router.get('/', async (req, res) => {
    try {
        const problems = await Problem.find().select('-correctAnswer');
        res.json(problems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/problems/seed - добавить тестовые данные (только для разработки!)
router.post('/seed', async (req, res) => {
    try {
        // Проверяем, есть ли уже задачи
        const count = await Problem.countDocuments();
        if (count > 0) {
            return res.status(400).json({ message: 'Database already has problems' });
        }

        const problems = [
            {
                title: 'Перелом ключицы',
                description: 'Пациент, 28 лет, упал с велосипеда.',
                difficulty: 'Easy',
                type: 'quiz',
                options: ['Консервативное лечение', 'Открытая репозиция'],
                correctAnswer: 'Консервативное лечение'
            },
            {
                title: 'Повреждение ПКС',
                description: 'Футболист, 22 года, получил травму колена.',
                difficulty: 'Medium',
                type: 'text',
                correctAnswer: 'Артроскопическая реконструкция'
            },
            {
                title: 'Стрессовый перелом',
                description: 'Бегун, 30 лет, жалуется на боль в стопе.',
                difficulty: 'Medium',
                type: 'quiz',
                options: ['Полный покой', 'Снижение нагрузок'],
                correctAnswer: 'Снижение нагрузок'
            },
            {
                title: 'Разрыв ахиллова сухожилия',
                description: 'Баскетболист, 35 лет. Острая боль в пятке.',
                difficulty: 'Hard',
                type: 'text',
                correctAnswer: 'Хирургическое лечение в течение 48 часов'
            },
            {
                title: 'Сотрясение мозга',
                description: 'Хоккеист, 25 лет, получил удар в голову.',
                difficulty: 'Medium',
                type: 'quiz',
                options: ['Возврат к игре', 'Полный покой 7-10 дней'],
                correctAnswer: 'Полный покой 7-10 дней'
            },
            {
                title: 'Латеральный эпикондилит',
                description: 'Теннисист, 32 года, боль в локте.',
                difficulty: 'Easy',
                type: 'text',
                correctAnswer: 'Консервативное лечение с упражнениями'
            },
            {
                title: 'Перелом Джонса',
                description: 'Футболист, 26 лет, боль в стопе.',
                difficulty: 'Hard',
                type: 'quiz',
                options: ['Гипс', 'Интрамедуллярный винт'],
                correctAnswer: 'Интрамедуллярный винт'
            }
        ];

        const created = await Problem.insertMany(problems);
        res.json({
            message: 'Database seeded!',
            count: created.length
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/problems/:id - получить одну задачу
router.get('/:id', async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id).select('-correctAnswer');
        if (!problem) return res.status(404).json({ message: 'Not found' });
        res.json(problem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
