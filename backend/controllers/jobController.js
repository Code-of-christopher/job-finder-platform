import Job from '../models/Job.model.js';

export const createJob = async (req, res) => {
  try {
    const { title, company, location, type, description, postedBy } = req.body;
    const job = new Job({ title, company, location, type, description, postedBy });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.id });
    if (!jobs.length) {
      return res.status(404).json({ error: 'No jobs found' });
    }
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { title, company, location, type, description } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { title, company, location, type, description },
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
