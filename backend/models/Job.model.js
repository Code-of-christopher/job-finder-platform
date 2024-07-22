import { Schema, model } from 'mongoose';

const JobSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }});

const Job = model('Job', JobSchema);
export default Job;
