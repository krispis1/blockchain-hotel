const HotelReservations = artifacts.require("HotelReservations");

module.exports = function (deployer) {
  deployer.deploy(HotelReservations);
};
