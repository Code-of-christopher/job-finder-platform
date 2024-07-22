import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String },
  location: { type: String }
});

const Profile = model('Profile', ProfileSchema);
export default Profile;
