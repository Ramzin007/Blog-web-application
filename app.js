import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static folder setup
app.use(express.static(path.join(__dirname, 'public')));

// To read form data from search input
app.use(express.urlencoded({ extended: true }));

// 📰 Sample blog data
const blogs = [
    { id: 1, title: "Getting Started with JavaScript", content: "Learn the basics of JavaScript, the language of the web." },
    { id: 2, title: "Mastering CSS Grid & Flexbox", content: "A deep dive into modern layout techniques with CSS Grid and Flexbox." },
    { id: 3, title: "Understanding Node.js and Express", content: "How backend JavaScript works using Express framework." },
    { id: 4, title: "Frontend vs Backend: What's the Difference?", content: "Explore the differences and how they work together." },
    { id: 5, title: "Building Your First Full Stack Project", content: "Step-by-step guide to connecting frontend and backend." }
];

// 🏠 Home route
app.get("/", (req, res) => {
    res.render("home", { title: "Home", blogs });
});

// ℹ️ About route
app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

// 🔍 Search route
app.get("/search", (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : "";
    const results = blogs.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query)
    );
    res.render("search", { title: "Search Results", results, query });
});

app.listen(3000, () => {
    console.log('✅ Server running at http://localhost:3000');
});
