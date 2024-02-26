/**
 * @swagger
 *   /book-order/build-book-order:
 *     post:
 *       tags:
 *         - order-book
 *       summary: Create a new order book
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   format: ObjectId
 *                   description: ID of the user placing the order
 *                   example: "613c8e192e95c7c8dc1b772a"
 *                 bookId:
 *                   type: string
 *                   format: ObjectId
 *                   description: ID of the book being ordered
 *                   example: "613c8e192e95c7c8dc1b772b"
 *                 quantity:
 *                   type: number
 *                   description: Number of books being ordered
 *                   example: 2
 *                 totalPrice:
 *                   type: number
 *                   description: Total price of the order
 *                   example: 30.5
 *                 status:
 *                   type: string
 *                   description: Status of the order
 *                   enum: [pending, confirmed, shipped, delivered]
 *                   example: "pending"
 *       responses:
 *         '201':
 *           description: Order book created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         format: ObjectId
 *                         description: ID of the created order book
 *                       userId:
 *                         type: string
 *                         format: ObjectId
 *                         description: ID of the user placing the order
 *                       bookId:
 *                         type: string
 *                         format: ObjectId
 *                         description: ID of the book being ordered
 *                       quantity:
 *                         type: number
 *                         description: Number of books being ordered
 *                       totalPrice:
 *                         type: number
 *                         description: Total price of the order
 *                       status:
 *                         type: string
 *                         description: Status of the order
 *                   msg:
 *                     type: string
 *                     example: Order book created successfully
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   msg:
 *                     type: string
 *                     example: Failed to create order book
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   msg:
 *                     type: string
 *                     example: Internal Server Error
 */


/**
 * @swagger
 *   /book-order/show-book-order:
 *     get:
 *       tags:
 *         - order-book
 *       summary: Retrieve order books
 *       description: Returns a list of order books with pending status
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Order books retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: ID of the order book
 *                         userId:
 *                           type: string
 *                           description: ID of the user placing the order
 *                         bookId:
 *                           type: string
 *                           description: ID of the book being ordered
 *                         quantity:
 *                           type: number
 *                           description: Number of books being ordered
 *                         totalPrice:
 *                           type: number
 *                           description: Total price of the order
 *                         status:
 *                           type: string
 *                           description: Status of the order
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: Date and time when the order book was created
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           description: Date and time when the order book was last updated
 *                   msg:
 *                     type: string
 *                     example: Order books retrieved successfully
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   msg:
 *                     type: string
 *                     example: Internal Server Error
 */


/**
 * @swagger
 *   /book-order/update-order-book/{orderBookId}:
 *     put:
 *       tags:
 *         - order-book
 *       summary: Update an order book
 *       description: Update an existing order book by its ID
 *       parameters:
 *         - in: path
 *           name: orderBookId
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the order book to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantity:
 *                   type: number
 *                   description: New quantity of the order book
 *                 totalPrice:
 *                   type: number
 *                   description: New total price of the order book
 *                 status:
 *                   type: string
 *                   description: New status of the order book
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Order book updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     type: object
 *                     description: Updated order book object
 *                   msg:
 *                     type: string
 *                     example: Order book updated successfully
 *         '400':
 *           description: Bad Request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   msg:
 *                     type: string
 *                     example: Order Book ID is required
 *         '404':
 *           description: Order book not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   msg:
 *                     type: string
 *                     example: Order book not found
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   msg:
 *                     type: string
 *                     example: Internal Server Error
 */

/**
 * @swagger
 *   /book-order/delete-order-book/{orderBookId}:
 *     delete:
 *       tags:
 *         - order-book
 *       summary: Delete an order book
 *       description: Delete an existing order book by its ID
 *       parameters:
 *         - in: path
 *           name: orderBookId
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the order book to delete
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: ID of the user associated with the order book
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Order book deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   msg:
 *                     type: string
 *                     example: Order book deleted successfully
 *         '400':
 *           description: Bad Request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   msg:
 *                     type: string
 *                     example: orderBookId is required
 *         '404':
 *           description: Order book not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   msg:
 *                     type: string
 *                     example: Order book not found
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   msg:
 *                     type: string
 *                     example: Internal Server Error
 */


