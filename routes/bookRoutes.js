const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");

const router = express.Router();

// CREATE
// POST /api/books
router.post("/", async (req, res) => {
    try {
        const book = new Book(req.body);

        const savedBook = await book.save();

        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// READ ALL
// GET /api/books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// READ ONE
// GET /api/books/:id
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: "Invalid book ID"
            });
        }

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                error: "Book not found"
            });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE
// PUT /api/books/:id
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: "Invalid book ID"
            });
        }

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                error: "Book not found"
            });
        }

        Object.assign(book, req.body);

        const updatedBook = await book.save();

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// DELETE
// DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: "Invalid book ID"
            });
        }

        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({
                error: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully",
            book: deletedBook
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;