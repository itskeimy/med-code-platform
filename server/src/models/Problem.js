const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }, // Описание симптомов
    mediaUrl: { type: String }, // Ссылка на рентген/МРТ (необязательно)
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    type: { type: String, enum: ['quiz', 'text'], required: true },
    
    // Для квизов (варианты ответов)
    options: [{ type: String }], 
    
    // Правильный ответ (Скрыт от клиента при GET запросе)
    correctAnswer: { type: String, required: true, select: false } 
});

module.exports = mongoose.model('Problem', ProblemSchema);
