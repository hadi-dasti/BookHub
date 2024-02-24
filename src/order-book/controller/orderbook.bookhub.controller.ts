import { Request, Response } from "express";
import { OrderBook } from "../model/schema/orderbook.bookhub.schema";
import { IOrderBook } from "../model/interface/orderbook.bookhub.interface";
import { User } from "./../../user/model/schema/user.bookhub.schema";
import { IUser } from "./../../user/model/interface/user.bookhub.interface";


export class OrderBookController {
    
    public async buildOrderBook(req: Request, res: Response): Promise<Response> {
        try {
            const { user, book, quantity, totalPrice, status } = req.body;

            // Create new OrderBook instance
            const createOrderBook: IOrderBook = new OrderBook({
                user,
                book,
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
            const updatedUser: IUser = await User.findByIdAndUpdate(
                user,
                { $push: { orders: newOrderBook._id } },
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
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: "$user",
                },
                {
                    $lookup: {
                        from: "books",
                        localField: "book",
                        foreignField: "_id",
                        as: "book",
                    },
                },
                {
                    $unwind: "$book",
                },
                {
                    $facet: {
                        data: [
                            { $sort: { createdAt: -1 } }, // Sort by createdAt field in descending order
                            { $skip: 0 }, // Skip 0 documents
                            { $limit: 10 }, // Limit the results to 10 documents
                        ],
                        totalCount: [{ $count: "total" }],
                    },
                },
                {
                    $project: {
                        _id: 1,
                        quantity: 1,
                        totalPrice: 1,
                        status: 1,
                        "user._id": 1,
                        "user.fullName": 1,
                        "book._id": 1,
                        "book.title": 1,
                    },
                },
            ]);

            return res.status(200).json({
                success: true,
                data: orderBooks,
                msg: "Order books retrieved successfully",
            });
        } catch (err) {
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
                    msg: "Order ID is required",
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

            const orderBookToDelete = await OrderBook.findById(orderBookId);

            if (!orderBookToDelete) {
                return res.status(404).json({
                    success: false,
                    msg: "Order book not found",
                });
            }
        
            const updatedUser = await User.findByIdAndUpdate(
                orderBookToDelete.user,
                { $pull: { orders: orderBookToDelete } },
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