// Логика проверки ответов
exports.checkAnswer = (problem, userAnswer) => {
    const correct = problem.correctAnswer;

    if (problem.type === 'quiz') {
        // Для тестов просто сравниваем строки (например, "b" или "Разрыв связки")
        return userAnswer.trim() === correct.trim();
    }

    if (problem.type === 'text') {
        // Для текстового ввода: убираем регистр, пробелы
        const normalizedUser = userAnswer.trim().toLowerCase();
        const normalizedCorrect = correct.trim().toLowerCase();
        return normalizedUser === normalizedCorrect;
    }

    return false;
};
