import express from 'express'

const app = express()
app.use(express.json())
const students = []
let nextId = 1

app.get("/students", getStudentsHandler)

app.get("/students/:id", getStudentHandler)

app.post("/students", createStudentHandler)

app.put("/students/:id", updateStudentHandler)

app.delete("/students/:id", deleteStudentHandler)

app.listen(3000, () => console.log("Listening on port 3000"))

function getStudentsHandler(req, resp) {
    const limit = req.query.limit
    if (limit === undefined) {
        return resp.json(students)
    }
    const n = Number(limit)
    if (!Number.isInteger(n) || n < 0) {
        return resp.status(400).json({ error: "Invalid limit" })
    }
    resp.json(students.slice(0, n))
}

function getStudentHandler(req, resp) {
    const id = Number(req.params.id)
    const student = students.find(s => s.id === id)
    if (!student) {
        return resp.status(404).json({ error: "Student not found" })
    }
    resp.json(student)
}

function createStudentHandler(req, resp) {
    const body = req.body ?? {}
    const name = body.name
    const number = body.number
    if (typeof name !== "string" || name.trim() === "" || typeof number !== "number") {
        return resp.status(400).json({ error: "Invalid data" })
    }
    const student = { id: nextId, name: name, number: number }
    nextId++
    students.push(student)
    resp.status(201).json(student)
}

function updateStudentHandler(req, resp) {
    const id = Number(req.params.id)
    const body = req.body ?? {}
    const name = body.name
    const number = body.number
    if(typeof name !== "string" || name.trim() === "" || typeof number !== "number") {
        return resp.status(400).json({ error: "Invalid data" })
    }
    const index = students.findIndex(s => s.id === id)
    if(index === -1) {
        return resp.status(404).json({ error: "Student not found" })
    }
    students[index] = { id, name, number }
    resp.json(students[index])
}

function deleteStudentHandler(req, resp) {
    const id = Number(req.params.id)
    const index = students.findIndex(s => s.id === id)
    if(index === -1) {
        return resp.status(404).json({ error: "Student not found" })
    }
    students.splice(index, 1)
    resp.status(204).end()
}