const express = require('express');
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = 5000;
// const defaultImage = '/assets/img/Gambar-1.png';




// app.set
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

// ini untuk assets
app.use("/assets", express.static(path.join(__dirname, "src/assets")));

// Middleware to process form input
app.use(express.urlencoded({ extended: false }));

// Route untuk menampilkan halaman utama dengan daftar heroes
app.get('/', async (req, res) => {
    const typeQuery = `SELECT * FROM "type_tb" ORDER BY id ASC`;
    const types = await sequelize.query(typeQuery, { type: QueryTypes.SELECT });

    const heroQuery = `SELECT heroes_tb.id, heroes_tb.name as heroName, heroes_tb.photo, type_tb.name as typeName 
                       FROM "heroes_tb"
                       JOIN "type_tb" ON heroes_tb.type_id = type_tb.id
                       ORDER BY heroes_tb.id ASC`;
    const heroes = await sequelize.query(heroQuery, { type: QueryTypes.SELECT });

    console.log('Types:', types); // Debugging
    console.log('Heroes:', heroes); // Debugging

    res.render('index', { types, heroes });
});



// Route untuk menambahkan type hero
app.post('/add-type', async (req, res) => {
    const { name } = req.body;
  
    const date = new Date();
    const dateString = date.toISOString().slice(0, 19).replace("T", " ");
  
    const query = `INSERT INTO "type_tb"(name, "createdAt", "updatedAt") VALUES (:name, :createdAt, :updatedAt)`;
  
    const replacements = {
      name,
      createdAt: dateString,
      updatedAt: dateString
    };
  

    await sequelize.query(query, {
      replacements: replacements,
      type: QueryTypes.INSERT
    });

        // Log 
        console.log(query);
        console.log(replacements);
        console.log("\n");
  
    res.redirect('/add-type');
  });
  
// Route untuk menampilkan halaman add-type
app.get('/add-type', async (req, res) => {
    // Query untuk mengambil data dari tabel type_tb dan mengurutkannya berdasarkan id
    const query = `SELECT * FROM "type_tb" ORDER BY id ASC`;
    // Mengirim query ke database
    const types = await sequelize.query(query, { type: QueryTypes.SELECT });
    // Menampung obj ke data dan mengirimkannya ke template
    res.render('add-type', { types });
});


// GET DATA DARI TABEL TYPE_TB
app.get('/add-hero', async (req, res) => {
    // Query untuk mengambil data dari tabel type_tb
    const typeQuery = `SELECT * FROM "type_tb" ORDER BY id ASC`;
    const types = await sequelize.query(typeQuery, { type: QueryTypes.SELECT });

    // Query untuk mengambil data dari tabel heroes_tb dengan join ke type_tb
    const heroQuery = `
        SELECT heroes_tb.id, heroes_tb.name as heroName, heroes_tb.photo, type_tb.name as typeName, heroes_tb.type_id
        FROM "heroes_tb" 
        JOIN "type_tb" ON heroes_tb.type_id = type_tb.id 
        ORDER BY heroes_tb.id ASC
    `;
    const heroes = await sequelize.query(heroQuery, { type: QueryTypes.SELECT });

    // Log data yang dikirim ke template
    console.log('Types:', JSON.stringify(types));
    console.log('Heroes:', JSON.stringify(heroes));

    res.render('add-hero', { types, heroes });
});

// Route untuk menambahkan hero
app.post('/add-hero', async (req, res) => {
    const { heroName, type_id } = req.body;

    const date = new Date();
    const dateString = date.toISOString().slice(0, 19).replace("T", " ");

    const query = `INSERT INTO "heroes_tb"(name, type_id, photo, "createdAt", "updatedAt") VALUES (:heroName, :type_id, :photo, :createdAt, :updatedAt)`;

    const replacements = {
        heroName,
        type_id,
        photo: 'https://static.wikia.nocookie.net/mobile-legends/images/8/88/Hero041-portrait.png', // Placeholder photo
        createdAt: dateString,
        updatedAt: dateString
    };

    await sequelize.query(query, {
        replacements: replacements,
        type: QueryTypes.INSERT
    });

    // Log
    console.log(query);
    console.log(replacements);
    console.log("\n");

    res.redirect('/');
});


// FORM EDIT HERO
app.get('/edit-hero/:id', async (req, res) => {
    const { id } = req.params;
    const heroQuery = `SELECT * FROM "heroes_tb" WHERE id = :id`;
    const hero = await sequelize.query(heroQuery, {
        replacements: { id: id },
        type: QueryTypes.SELECT,
        plain: true
    });

    const typeQuery = `SELECT * FROM "type_tb" ORDER BY id ASC`;
    const types = await sequelize.query(typeQuery, { type: QueryTypes.SELECT });

    res.render('edit-hero', { hero, types });
});

// UPDATE HERO
app.post('/update-hero/:id', async (req, res) => {
    const { id } = req.params;
    const { heroName, type_id } = req.body;

    console.log('Received data:', { id, heroName, type_id });  // Tambahkan log ini untuk debug

    const query = `UPDATE "heroes_tb" SET name = :heroName, type_id = :type_id, "updatedAt" = :updatedAt WHERE id = :id`;
    await sequelize.query(query, {
        replacements: {
            id: id,
            heroName: heroName,
            type_id: type_id,
            updatedAt: new Date()
        },
        type: QueryTypes.UPDATE
    });

    console.log('Hero Updated:', { id: id, heroName: heroName });
    res.redirect(`/heroDetail/${id}`);
});




// DELETE TYPE
app.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Cek data sebelum hapus
        const fetchQuery = `SELECT * FROM "type_tb" WHERE id = :id`;
        const project = await sequelize.query(fetchQuery, {
            replacements: { id: id },
            type: QueryTypes.SELECT,
            plain: true
        });

        if (project) {
            console.log('Hero Type:', project);
            console.log("\n");
        } else {
            console.log(`Hero Type id ${id} not found`);
        }

        // Hapus Project
        const deleteQuery = `DELETE FROM "type_tb" WHERE id = :id`;
        await sequelize.query(deleteQuery, {
            replacements: { id: id },
            type: QueryTypes.DELETE
        });
        
        console.log(`Hero Type with id ${id} deleted successfully`);
    } catch (error) {
        console.error(`Error deleting project with id ${id}:`, error);
    }
    res.redirect('/add-type');
});

// DELETE HERO heroes_tb
app.post('/delete-hero/:id', async (req, res) => {
    const { id } = req.params;

    // Cek data sebelum hapus
    const fetchQuery = `SELECT * FROM "heroes_tb" WHERE id = :id`;
    const hero = await sequelize.query(fetchQuery, {
        replacements: { id: id },
        type: QueryTypes.SELECT,
        plain: true
    });

    if (hero) {
        console.log('Hero:', hero);
        console.log("\n");

        // Hapus Hero
        const deleteQuery = `DELETE FROM "heroes_tb" WHERE id = :id`;
        await sequelize.query(deleteQuery, {
            replacements: { id: id },
            type: QueryTypes.DELETE
        });

        console.log(`Hero with id ${id} deleted successfully`);
    } else {
        console.log(`Hero with id ${id} not found`);
    }

    res.redirect('/');
});



// Update
app.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const query = `UPDATE "type_tb" SET name = :name, "updatedAt" = :updatedAt WHERE id = :id`;
    await sequelize.query(query, {
        replacements: {
            id: id,
            name: name,
            updatedAt: new Date()
        },
        type: QueryTypes.UPDATE
    });

    console.log('Hero Type Updated:', { id: id, name: name });
    res.redirect('/add-type');
});



// Route untuk menampilkan detail hero berdasarkan ID
app.get('/heroDetail/:id', async (req, res) => {
    const { id } = req.params;
    const query = `SELECT heroes_tb.id, heroes_tb.name as heroName, heroes_tb.photo, type_tb.name as typeName
                   FROM "heroes_tb"
                   JOIN "type_tb" ON heroes_tb.type_id = type_tb.id
                   WHERE heroes_tb.id = :id`;
    const hero = await sequelize.query(query, {
      replacements: { id: id },
      type: QueryTypes.SELECT,
      plain: true
    });
  
    console.log('Hero:', hero); // Tambahkan log ini untuk debug
  
    if (hero) {
      res.render('heroDetail', { hero });
    } else {
      res.redirect('/add-hero');
    }
  });

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
