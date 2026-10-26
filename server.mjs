import express from "express";

const app = express();
app.use(express.json());   // para conseguir ler o JSON do corpo dos pedidos POST

const students = [];
let nextId = 1;

// GET /students  (com ?limit=N opcional)
app.get("/students", (req, res) => {
    const limit = Number(req.query.limit);
    if (req.query.limit !== undefined && (!Number.isInteger(limit) || limit < 0)) {
        return res.status(400).json({ error: "Invalid limit" });
    }
    const result = req.query.limit !== undefined ? students.slice(0, limit) : students;
    res.json(result);
});

// GET /students/:id
app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
});

// POST /students
app.post("/students", (req, res) => {
        const { name, number } = req.body ?? {};
    if (typeof name !== "string" || typeof number !== "number" || name.trim() === "") {
        return res.status(400).json({ error: "Invalid data"});
    }
    const id = nextId++;
    const student = { id, name, number };
    students.push(student);
    res.status(201).json(student);
});

app.listen(3000, () => console.log("Servidor a correr em http://localhost:3000"));