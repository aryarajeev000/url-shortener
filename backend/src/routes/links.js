const express = require('express');
const Link = require('../models/Link');
const generateShortCode = require('../utils/shortCode');

const router = express.Router();

router.post('/', async (req, res) => {
  const userId = req.user.id;
  const { originalUrl, title } = req.body;

  if (!originalUrl) return res.status(400).json({ message: 'originalUrl is required' });

  try {
    let shortCode;
    let exists;
    do {
      shortCode = generateShortCode();
      exists = await Link.findOne({ shortCode });
    } while (exists);

    const link = await Link.create({ userId, originalUrl, title, shortCode });

    return res.status(201).json({
      ...link.toObject(),
      shortUrl: `${process.env.BASE_URL}/${link.shortCode}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  const userId = req.user.id;
  try {
    const links = await Link.find({ userId, isDeleted: false }).sort({ createdAt: -1 });
    return res.json(links);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id', async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { originalUrl, title } = req.body;

  try {
    const link = await Link.findOneAndUpdate(
      { _id: id, userId },
      { originalUrl, title },
      { new: true }
    );

    if (!link) return res.status(404).json({ message: 'Link not found' });
    return res.json(link);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const link = await Link.findOneAndUpdate(
      { _id: id, userId },
      { isDeleted: true },
      { new: true }
    );

    if (!link) return res.status(404).json({ message: 'Link not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
