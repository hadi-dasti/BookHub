import { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "./../model/schema/book.bookhub.schema";
import { IBook } from "./../model/interface/book.bookhub.interface";




export class BookController {
  // Create a new Book
  public async createBook(req: Request, res: Response): Promise<Response> {
    try {
      const { title, author, genre, description, countBook } = req.body;

      const newBook: IBook = new Book({
        title,
        author,
        genre,
        description,
        countBook: countBook || 1,
      });

      const saveBook: IBook = await newBook.save();

      if (!saveBook) {
        return res.status(400).json({
          success: false,
          msg: "Failed to create book",
        });
      }
      return res.status(201).json({
        success: true,
        msg: "Book created successfully",
        data: saveBook,
      });

    } catch (err) {
      console.error("Error creating book:", err);
      return res.status(500).json({
        success: false,
        msg: "Internal Server Error",
      });
    }
  }

  // Get all books grouped by genre
  public async getAllBooks(req: Request, res: Response): Promise<Response> {
    try {
      const allBooks: IBook[] = await Book.aggregate([
        {
          $group: {
            _id: "$genre",
            books: {
              $push: {
                title: "$title",
                author: "$author",
                countBook: "$countBook",
              },
            },
            totalBooks: { $sum: "$countBook" },
          },
        },
        {
          $project: {
            _id: 0,
            genre: "$_id",
            books: 1,
            totalBooks: 1,
          },
        },
        {
          $sort: { genre: 1 },
        },
      ]);

      if (!allBooks.length) {
        return res.status(404).json({
          success: false,
          msg: "No books found",
        });
      }

      return res.status(200).json({
        success: true,
        msg: "Books fetched successfully",
        data: allBooks,
      });
    } catch (err) {
      console.log("Error fetching books:", err);
      return res.status(500).json({
        success: false,
        msg: "Internal Server Error",
      });
    }
  }
  
  // Get a single book by ID
  public async getOneBook(req: Request, res: Response): Promise<Response> {
    try {
      const { bookId } = req.params;

      const oneBook = await Book.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(bookId) },
        },
        {
          $limit: 1
        },
        {
          $project: {
            _id: 0,
            __v: 0
          }
        }
      ]);
      
      if (!oneBook.length) {
        return res.status(404).json({
          success: false,
          msg: "Book not found",
        });
      }

      return res.status(200).json({
        success: true,
        msg: "Book retrieved successfully",
        data: oneBook,
      });
    } catch (err) {
      console.log("Error retrieving book:", err);
      return res.status(500).json({
        success: false,
        msg: "Internal Server Error",
      });
    }
  }

  // Update a book by ID
  public async updateBook(req: Request, res: Response): Promise<Response> {
    try {
      const { bookId } = req.params;

      const { title, author, genre, description, countBook } = req.body;

      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        {
          title,
          author,
          genre,
          description,
          countBook,
        },
        {
          new: true,
        }
      );

      if (!updatedBook) {
        return res.status(404).json({
          success: false,
          msg: "Book not found",
        });
      }

      return res.status(200).json({
        success: true,
        msg: "Book updated successfully",
        data: updatedBook,
      });
    } catch (err) {
      console.error("Error updating book:", err);
      return res.status(500).json({
        success: false,
        msg: "Internal Server Error",
      });
    }
  }
  
  // Delete a book by ID
  public async deletBook(req: Request, res: Response): Promise<void> {
    try {
      const { bookId } = req.params;

      const deletedBook = await Book.findByIdAndDelete(bookId);
      if (deletedBook) {
        res.status(200).json({
          success: true,
          msg: "Delete book successfully ",
        });
      } else {
        res.status(404).json({
          success: false,
          msg: "Book not found for deletion",
        });
      }
    } catch (err) {
      console.error("Error deleting book:", err);
      res.status(500).json({
        success: false,
        msg: "Internal Server Error",
      });
    }
  }
}