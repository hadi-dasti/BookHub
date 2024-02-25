import { Request, Response } from "express";
import { OrderBook } from "../model/schema/orderbook.bookhub.schema";
import { IOrderBook } from "../model/interface/orderbook.bookhub.interface";
import { User } from "./../../user/model/schema/user.bookhub.schema";




export class OrderBookController {
    
    public async buildOrderBook(req: Request, res: Response): Promise<Response> {
        try {
          const { userId, bookId, quantity, totalPrice, status } = req.body;

         

          // Create new OrderBook instance
          const createOrderBook: IOrderBook = new OrderBook({
            userId,
            bookId,
            quantity,
            totalPrice,
            status,
          });

          // Save the new OrderBook
          const newOrderBook = await createOrderBook.save();

          if (!newOrderBook) {
            return res.status(400).json({
              success: false,
              msg: "Failed to create order book",
            });
          }

          // Update user's orders
          const updatedUser = await User.findByIdAndUpdate(userId,
              {
                  $push: { orders: newOrderBook._id }
              },
            { new: true }
          );

          if (!updatedUser) {
            return res.status(404).json({
              success: false,
              msg: "Failed to update user's orders",
            });
          }

          return res.status(201).json({
            success: true,
            data: newOrderBook,
            msg: "Order book created successfully",
          });
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error",
            });
        }
    }

    public async getOrderBook(req: Request, res: Response): Promise<Response> {
        try {
            const orderBooks: IOrderBook[] = await OrderBook.aggregate([
              {
                $match: {
                  status: "pending",
                },
              },
              {
                $lookup: {
                  from: "users",
                  localField: "orders",
                  foreignField: "userId",
                  as: "user",
                },
              },
              {
                $unwind: "$user",
              },
              {
                $lookup: {
                  from: "books",
                  localField: "orders",
                  foreignField: "bookId",
                  as: "book",
                },
              },
              {
                $group: {
                  _id: "$_id",
                  userId: { $first: "$userId" },
                  bookId: { $first: "$bookId" },
                  quantity: { $first: "$quantity" },
                  totalPrice: { $first: "$totalPrice" },
                  status: { $first: "$status" },
                  createdAt: { $first: "$createdAt" },
                  updatedAt: { $first: "$updatedAt" },
                  user: { $first: "$user" },
                  book: { $first: "$book" },
                },
              },
              {
                $project: {
                  _id: 1,
                  userId: "$user._id",
                  bookId: "$book._id",
                  quantity: 1,
                  totalPrice: 1,
                  status: 1,
                  createdAt: 1,
                  updatedAt: 1,
                  user: {
                    _id: 1,
                    fullName: 1,
                    email: 1,
                    nationalCode: 1,
                    gender: 1,
                    createdAt: 1,
                    updatedAt: 1,
                  },
                  book: {
                    _id: 1,
                    title: 1,
                    author: 1,
                    genre: 1,
                    description: 1,
                    countBook: 1,
                    createdAt: 1,
                    updatedAt: 1,
                  },
                },
              },
                {
                    $facet: {
                        data: [
                            { $sort: { createdAt: -1 } }, 
                            { $skip: 0 }, 
                            { $limit: 10 }, 
                        ],
                        totalCount: [{ $count: "total" }],
                    },
                },
            ]);

            return res.status(200).json({
                success: true,
                data: orderBooks,
                msg: "Order books retrieved successfully",
            });
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error",
            });
        }
    }

    public async updateOrderBook(req: Request, res: Response): Promise<Response> {
        try {
            const { orderBookId } = req.params;
            const { quantity, totalPrice, status } = req.body;

            // Validate orderId
            if (!orderBookId) {
                return res.status(400).json({
                    success: false,
                    msg: "Order Book ID is required",
                });
            }
            const updatedOrderBook: IOrderBook = await OrderBook.findByIdAndUpdate(
                orderBookId,
                {
                    quantity,
                    totalPrice,
                    status,
                },
                {
                    new: true,
                }
            );
            if (!updatedOrderBook) {
                return res.status(404).json({
                    success: false,
                    msg: "Order book not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: updatedOrderBook,
                msg: "Order book updated successfully",
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error",
            });
        }
    }

    public async deleteOrderBook(req: Request, res: Response): Promise<Response> {
        try {
          const { orderBookId } = req.params;
          const { userId } = req.body;

            const orderBookToDelete = await OrderBook.findById(orderBookId);

            if (!orderBookToDelete) {
                return res.status(404).json({
                    success: false,
                    msg: "Order book not found",
                });
            }
        
          const updatedUser = await User.findByIdAndUpdate(userId,
            { $pull: { orders: orderBookToDelete._id } },
            { new: true }
          );

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found or failed to update user",
                });
            }
          
            await OrderBook.findByIdAndDelete(orderBookId);

            return res.status(200).json({
                success: true,
                msg: "Order book deleted successfully",
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error",
            });
        }
    }
};