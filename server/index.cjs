const express = require('express');
const { mkdirSync } = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const resources = require('./resources.json');

const normalize = (value) => value.trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');

function openCatalog(filename) {
  if (filename !== ':memory:') {
    mkdirSync(path.dirname(filename), { recursive: true });
  }
  const db = new DatabaseSync(filename);
  db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      search_text TEXT NOT NULL
    )
  `);
  const insert = db.prepare(`
    INSERT OR IGNORE INTO resources (id, title, category, description, search_text)
    VALUES (?, ?, ?, ?, ?)
  `);
  db.exec('BEGIN');
  try {
    for (const { id, title, category, description } of resources) {
      insert.run(id, title, category, description, normalize(title + ' ' + category));
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    db.close();
    throw error;
  }
  return db;
}

function createApp(db) {
  const app = express();
  app.disable('x-powered-by');
  const search = db.prepare(`
    SELECT id, title, category, description FROM resources
    WHERE instr(search_text, ?) > 0
    ORDER BY title, id
  `);

  app.get('/api/resources', (req, res) => {
    const query = req.query.q ?? '';
    if (typeof query !== 'string' || query.length > 100) {
      return res.status(400).json({ error: 'q debe ser un texto de hasta 100 caracteres.' });
    }
    res.json(search.all(normalize(query)));
  });
  return app;
}

if (require.main === module) {
  const filename = process.env.DB_PATH || path.join(__dirname, 'data', 'catalog.sqlite');
  const port = process.env.PORT || 3000;
  const db = openCatalog(filename);
  createApp(db).listen(Number(port), '127.0.0.1', () => {
    console.log(`Catálogo disponible en http://127.0.0.1:${port}/api/resources`);
  });
}

module.exports = { openCatalog, createApp };
