import Profile from '../models/Profile.model.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, location } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      { firstName, lastName, bio, location },
      { new: true, runValidators: true, upsert: true } 
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

