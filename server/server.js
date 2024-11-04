const express = require('express');
const cors = require('cors');
const faker = require('faker');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const generateUsers = (num) => {
    const users = [];
    for (let i = 0; i < num; i++) {
        users.push({
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            status: faker.random.arrayElement(['Active', 'Inactive']),
            role: faker.random.arrayElement(['Admin', 'User', 'Guest']),
        });
    }
    return users;
};

let users = generateUsers(200);

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users[userIndex] = { ...users[userIndex], ...updatedUser };
    res.json(users[userIndex]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});