const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shortCode: { type: String, required: true, unique: true, index: true },
    originalUrl: { type: String, required: true },
    title: { type: String },
    clickCount: { type: Number, default: 0 },
    lastClickedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

linkSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Link', linkSchema);
