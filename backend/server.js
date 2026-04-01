const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// In a real app we would use process.env.MONGO_URI, but for this demo portfolio
// we'll just log if it's connected or not, or use an in-memory dummy structure if mongodb isn't provided.
// Since we don't know if the user has a local MongoDB running, we won't strictly require it to boot.
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio').then(() => {
    console.log("Connected to MongoDB.");
}).catch((err) => {
    console.error("Failed to connect to MongoDB. (This is expected if no local instance is running).", err.message);
});

// A simple Contact schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// A simple Project schema
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    githubLink: String,
    liveLink: String,
    skills: [String]
});
const Project = mongoose.model('Project', projectSchema);

// Routes
app.get('/api/projects', async (req, res) => {
    try {
        let projects = await Project.find();

        // Seed database if empty
        if (projects.length === 0) {
            const defaultProjects = [
                {
                    title: 'Medical Stock Management',
                    description: 'A full-stack medical stock management application with React and Node.js',
                    imageUrl: 'https://media.sortly.com/wp-content/uploads/2018/07/12130452/Flat-lay-of-various-medical-supplies-on-gray-background-624567292_2125x1416.jpeg',
                    githubLink: 'https://github.com/saralbatt65-bit/medical_stock_management',
                    liveLink: 'https://medical-stock-management-frontend.vercel.app/',
                    skills: ['React', 'Node.js', 'MongoDB', 'Redux', 'Tailwind']
                },
                {
                    title: 'AI Chat Dashboard',
                    description: 'A modern chat interface built with React and advanced AI integrations.',
                    imageUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    githubLink: '#',
                    liveLink: '#',
                    skills: ['React', 'CSS3', 'OpenAI API']
                },
                {
                    title: 'Task Management App',
                    description: 'Kanban style task manager with drag and drop capabilities.',
                    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    githubLink: '#',
                    liveLink: '#',
                    skills: ['React', 'TypeScript', 'Node.js']
                }
            ];
            await Project.insertMany(defaultProjects);
            projects = await Project.find();
        }

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        console.log("New contact saved to DB:", { name, email, message });
        res.status(200).json({ message: "Thank you for reaching out! I'll get back to you soon." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Backend server is running on port ${PORT}`);
    });
}
module.exports = app;
