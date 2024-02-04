const axios = require("axios");

const { BookingRepository } = require("../repository/index");
const { FLIGHT_SEVICE_PATH } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const { flightId } = data;
      const getFlightRequestURl = `${FLIGHT_SEVICE_PATH}/api/v1/flights/${flightId}`;
      const flight = await axios.get(getFlightRequestURl);
      const flightData = flight.data.data;
      let priceOfFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in booking Process",
          "Insufficient Seats"
        );
      }
      const totalCost = data.noOfSeats * priceOfFlight;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightRequestURL = `${FLIGHT_SEVICE_PATH}/api/v1/flights/${flightId}`;
      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      const finalBooking = this.bookingRepository.update(booking.id, {
        status: "Booked",
      });
      return finalBooking;
    } catch (error) {
      if (
        error.name == "Validation error" ||
        error.name == "Repository Error"
      ) {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
