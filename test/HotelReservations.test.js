const HotelReservations = artifacts.require('./HotelReservations.sol');

contract('HotelReservations', (accounts) => {
    before(async () => {
      this.hotelReservations = await HotelReservations.deployed()
    })
  
    it('deploys successfully', async () => {
      const address = await this.hotelReservations.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  
    it('lists rooms', async () => {
      const roomCount = await this.hotelReservations.hotelCount()
      const room = await this.hotelReservations.hotels(roomCount)
      assert.equal(room.id.toNumber(), roomCount.toNumber())
      assert.equal(room.price, '1')
      assert.equal(room.reservedDates, '')
      assert.equal(roomCount.toNumber(), 2)
    })
  
    it('creates room', async () => {
      const result = await this.hotelReservations.addRoom('1.5','')
      const roomCount = await this.hotelReservations.hotelCount()
      assert.equal(roomCount, 3)
      const event = result.logs[0].args
      assert.equal(event.price, '1.5')
      assert.equal(event.reservedDates, '')
    })

    it('reserves room', async () => {
      const result = await this.hotelReservations.reserveRoom(2,'2020-12-25,2020-12-26')
      const event = result.logs[0].args
      assert.equal(event.id, 2)
      assert.equal(event.reservedDates, '2020-12-25,2020-12-26')
    })
  
  })