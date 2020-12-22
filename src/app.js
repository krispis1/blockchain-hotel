App = {

    loading: false,
    contracts: {},
  
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
    },
  
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
          } else {
            window.alert("Please connect to Metamask.")
          }
          // Modern dapp browsers...
          if (window.ethereum) {
            window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
            console.log(ethereum);
            try {
              // Request account access if needed
              await ethereum.enable()
              // Acccounts now exposed
              web3.eth.sendTransaction({/* ... */})
            } catch (error) {
              // User denied account access...
            }
          }
          // Legacy dapp browsers...
          else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */})
          }
          // Non-dapp browsers...
          else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
          }
    },
  
    loadAccount: async () => {
      // Set the current blockchain account
      App.account = web3.eth.accounts[0];
      console.log(App.account);
    },
  
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const hotelReservations = await $.getJSON('HotelReservations.json')
      App.contracts.HotelReservations = TruffleContract(hotelReservations)
      App.contracts.HotelReservations.setProvider(App.web3Provider)
      App.contracts.defaultAccount = web3.eth.accounts[0];
  
      // Hydrate the smart contract with values from the blockchain
      App.hotelReservations = await App.contracts.HotelReservations.deployed()
    },
  
    render: async () => {
      await App.renderHotels()
    },
  
    renderHotels: async () => {
      // Load the total task count from the blockchain
      //const hotelCount = await App.hotelReservations.hotelCount()
      //const $taskTemplate = $('.taskTemplate')

        // Fetch the task data from the blockchain
      const hotel1 = await App.hotelReservations.hotels(1);
      const hotelId1 = hotel1[0].toNumber();
      const hotelPrice1 = hotel1[1];
      const reservedDates1 = hotel1[2];

      $('#reservedDatesBasic').val(reservedDates1);
      $('#pricePerNightBasic').html(hotelPrice1 + ' ETH');

      const hotel2 = await App.hotelReservations.hotels(2);
      const hotelId2 = hotel2[0].toNumber();
      const hotelPrice2 = hotel2[1];
      const reservedDates2 = hotel2[2];

      $('#reservedDatesDeluxe').val(reservedDates2);
      $('#pricePerNightDeluxe').html(hotelPrice2 + ' ETH');
    },
  
    toggleReserved: async (data) => {
      console.log("reserved!");
      console.log(data);
      await App.hotelReservations.toggleReserved(data.type,data.reservedDates, {
        from: App.account,
        //to: '0x0C0e12680fAc14a80B0910D862336CEE07203565',
        value: '0x00',
        gasPrice: '0x4A817C800',
        gas: '0x6691B7'
      });
      window.location.reload();
    }
}
  
$(() => {
    $(window).load(() => {
      App.load();
    });
});
  