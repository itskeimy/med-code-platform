const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Fallback секрет для разработки, чтобы всё работало без .env
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_key_change_in_production';

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Валидация входных данных
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Пароль должен содержать минимум 6 символов' });
        }

        // Проверка существования пользователя
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            if (user.email === email) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
            }
            if (user.username === username) {
                return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ username, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({ 
            token, 
            user: { id: user._id, username: user.username, score: user.score } 
        });
    } catch (err) {
        // Обработка ошибок валидации Mongoose
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message).join(', ');
            return res.status(400).json({ message: messages });
        }
        if (err.code === 11000) {
            // Ошибка дублирования уникального ключа
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({ 
                message: field === 'email' 
                    ? 'Пользователь с таким email уже существует' 
                    : 'Пользователь с таким именем уже существует' 
            });
        }
        console.error('Registration error:', err);
        res.status(500).json({ message: err.message || 'Ошибка при регистрации' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user._id, username: user.username, score: user.score } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.json({ id: user._id, username: user.username, email: user.email, score: user.score });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
