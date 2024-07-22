import { Schema, model } from 'mongoose';

const ApplicationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resume: { type: String, required: true },
  coverLetter: { type: String, required: true },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Application = model('Application', ApplicationSchema);
export default Application;
