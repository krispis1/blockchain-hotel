// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract HotelReservations {
    uint public hotelCount = 0;

    struct Hotel {
        uint id;
        string price;
        string reservedDates;
    }

    mapping(uint => Hotel) public hotels;

    constructor() public {
        addRoom("0.25","");
        addRoom("1","");
    }

    event RoomAdded(
        string price,
        string reservedDates
    );

    event RoomReserved(
        uint id,
        string reservedDates
    );

    function append(string memory _a, string memory _b) internal pure returns (string memory) {
        return string(abi.encodePacked(_a, _b));
    }

    function addRoom(string memory _price, string memory _reservedDates) public {
        hotelCount++;
        hotels[hotelCount] = Hotel(hotelCount, _price, _reservedDates);
        emit RoomAdded(hotels[hotelCount].price, hotels[hotelCount].reservedDates);
    }

    function reserveRoom(uint _id, string memory _reservedDates) public {
        hotels[_id].reservedDates = append(hotels[_id].reservedDates, _reservedDates);
        emit RoomReserved(_id, hotels[_id].reservedDates);
    }

    // function toggleCancelReservation(uint _id, string memory _reservedDates) public {
    //     uint currentLength = hotels[_id].reservedDates.length;
    //     uint givenLength = _reservedDates.length;
    //     string[] memory newReservations = new string[](currentLength-givenLength);
    //     uint newIndex = 0;
    //     for (uint i=0; i<currentLength; i++) {
    //         string storage currentDate = hotels[_id].reservedDates[i];
    //         for (uint j=0; j<givenLength; j++) {
    //             string memory givenDate = _reservedDates[j];
    //             if (keccak256(abi.encodePacked(currentDate)) != keccak256(abi.encodePacked(givenDate))) {
    //                 newReservations[newIndex] = currentDate;
    //                 newIndex++;
    //             }
    //         }
    //     }
    //     hotels[_id].reservedDates = newReservations;
    //     emit HotelReserved(_id, hotels[_id].reservedDates);
    // }
}