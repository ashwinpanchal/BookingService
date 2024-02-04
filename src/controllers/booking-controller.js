const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index");
const { ServiceError } = require("../utils/errors");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully Created a Booking",
      err: {},
      data: response,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      err: error.explanation,
      data: {},
    });
  }
};

module.exports = {
  create,
};
