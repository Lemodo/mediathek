import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
})


app.get('/', (req, res) => {
  res.json('Welcome to the backend');
});

app.get('/mediathek', (req, res) => {
    const q = `
      select
      'movie' as media_type,
      concat('film_', film_id) as id,
      titel as title,
      date_format(erscheinungsdatum, "%d.%m.%y") as release_date,
      laenge as length
      from film
      union
      select
      'series' as media_type,
      concat('serie_', serie_id) as id,
      titel as title,
      date_format(erscheinungsdatum, "%d.%m.%y") as release_date,
      laenge as length
      from serie
      order by media_type, id;
    `;
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    })
  })

app.post('/', (req, res) => {
    const { media_type, title, release_date, length, staffeln } = req.body;
  
    if (media_type === 'film') {
      // Handle adding a film to the database
      const q = 'INSERT INTO film (titel, erscheinungsdatum, laenge) VALUES (?, ?, ?)';
      const values = [title, release_date, length];
  
      db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    } else if (media_type === 'serie') {
      // Handle adding a series to the database
      const q = 'INSERT INTO serie (titel, erscheinungsdatum, staffeln, laenge) VALUES (?, ?, ?, ?)';
      const values = [title, release_date, staffeln, length];
  
      db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    } else {
      return res.status(400).json({ error: 'Invalid media_type' });
    }
  })

app.listen(8800, () => {
  console.log('Backend is running on port 8800');
})
