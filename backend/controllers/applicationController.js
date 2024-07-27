import Application from '../models/Application.model.js';
import Job from '../models/Job.model.js';

export const submitApplication = async (req, res) => {
  try {
    const { name, email, resume, coverLetter, jobId, userId } = req.body;
    let application = new Application({ name, email, resume, coverLetter, jobId, userId });
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(400).json({ errr: error.message });
  }
};

export const getApplications = async (req, res) => {
  try{
    const applications = await Application.find({userId: req.params.id});
    if (!applications.length) {
      return res.status(404).json({ error: 'Applications not found' });
    }
    res.json(applications);
  } catch (error){
    res.status(500).json({ error: error.message });
  }
}

export const getClientsForEmployer = async (req, res) => {
  try {
    const employerId = req.params.employerId;
    const jobs = await Job.find({ postedBy: employerId }).select('_id');
    const jobIds = jobs.map(job => job._id);
    const clients = await Application.find({ jobId: { $in: jobIds } });

    if (!clients.length) {
      return res.status(404).json({ error: 'No applications found for your jobs' });
    }
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
