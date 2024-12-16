const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/users');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://dejidmaamunkhjargal:SW1VBeT2oIhjmYfn@webuser.fntoa.mongodb.net/")
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {

                    res.json({ status: "Success", name: user.name });
                } else {
                    res.json({ status: 'Error', message: 'Нууц үг буруу байна' });
                }
            } else {
                res.json({ status: "Error", message: "Хэрэглэгчийн мэдээлэл олдсонгүй" });

            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Internal Server Error');
        });
});



app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    UserModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                console.log('Хаяг өмнө нь үүссэн байн');
                return res.status(400).json({ message: 'Хаяг өмнө нь үүссэн байн' });
            }


            UserModel.create(req.body)
                .then(user => res.json(user))
                .catch(err => res.status(500).json({ message: 'Хэрэглэгч үүсгэхэд алдаа гарлаа', error: err }));
        })
        .catch(err => res.status(500).json({ message: 'Майл шалгахад алдаа гарлаа', error: err }));
});

app.listen(3001, () => {
    console.log('server is running');
});
