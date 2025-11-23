require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const auth = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const linkRoutes = require('./routes/links');
const Link = require('./models/Link');

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://url-shortener-frontend-n1pg.onrender.com",
    "url-shortener-sepia-tau.vercel.app"
  ],
  credentials: true
}));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/links', auth, linkRoutes);

app.get('/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const link = await Link.findOne({ shortCode: code, isDeleted: false });
    if (!link) return res.status(404).send('Link not found');

    link.clickCount += 1;
    link.lastClickedAt = new Date();
    await link.save();

    return res.redirect(302, link.originalUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
