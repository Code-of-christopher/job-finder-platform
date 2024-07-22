import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use('/api/users', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/profiles', profileRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'home.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

app.get('/addJob', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'addJob.html'));
});

app.get('/myJobs', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'myJobs.html'));
});

app.get('/jobList', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'jobList.html'));
});

app.get('/job-details', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'job-details.html'));
});

app.get('/apply', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'apply.html'));
});

app.get('/applications', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'applications.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
