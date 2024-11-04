const express = require('express');
const cors = require('cors');
const faker = require('faker'); // Импортируем faker
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Функция для генерации пользователей
const generateUsers = (num) => {
    const users = [];
    for (let i = 0; i < num; i++) {
        users.push({
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            status: faker.random.arrayElement(['active', 'inactive']),
            role: faker.random.arrayElement(['admin', 'user', 'guest']),
        });
    }
    return users;
};

// Генерируем 200 пользователей
const users = generateUsers(200);

// Эндпоинт для получения пользователей
app.get('/api/users', (req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});