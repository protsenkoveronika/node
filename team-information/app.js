const { name } = require('ejs');
const express = require('express');
const path = require('path'); // Підключаємо модуль path
const app = express();

// Встановлюємо папку для статичних файлів
app.use(express.static('public'));
app.use('/styles', express.static(path.join(__dirname, 'styles')));

// Маршрут для статичної сторінки index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для динамічної сторінки students.ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/students', (req, res) => {
    const students = [
        {name: 'Ларіна Марія Михайлівна', role: 'Розробник', group: 'ІС-22', photo:'/images/Maria.jpg', username:'<a href="https://t.me/Masha_5_Lar"> контакт студента</a>'},
        {name: 'Проценко Вероніка Ігорівна', role: 'Розробник', group: 'ІА-23', photo:'/images/Veronika.jpg', username:'<a href="https://t.me/linferr"> контакт студента</a>'},
    ];
    res.render('students', { students });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
