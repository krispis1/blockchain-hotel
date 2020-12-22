$(document).ready(function () {
    $('#modal1').modal();

    let disabledDays = [
        "2020-12-21",
        "2020-12-22",
        "2020-12-23"
    ];

    let currentType = "";

    checkDate = (dateToCheck) => {
        for (let i = 0; i < disabledDays.length; i++) {
            if (disabledDays[i] == dateToCheck) {
                return false;
            }
        }
        return true;
    }

    $('.datepicker').datepicker({
        firstDay: 1,
        minDate: new Date(),
        format: "yyyy-mm-dd",
        disableDayFn: function(date) {
            if (checkDate(date.toLocaleDateString())) {
                return false;
            } else {
                return true;
            }
        },
        onClose: function() {
            let dateFrom = $('#date_from').val();
            let dateTo = $('#date_to').val();
            if (dateFrom && dateTo) {
                let pricePerNight = 0;
                let numberOfNights = getDaysArray(new Date(dateFrom),new Date(dateTo)).length;
                if (currentType == 1) {
                    pricePerNight = $('#pricePerNightBasic').html().split(" ")[0];
                } else if (currentType == 2) {
                    pricePerNight = $('#pricePerNightDeluxe').html().split(" ")[0];
                }
                let price = numberOfNights * pricePerNight;
                $('#price').removeClass("text-darken-5").addClass("text-darken-4 font-size-22")
                $('#price').html(price + " ETH");
            }
        }
    });

    getDaysArray = function(start, end) {
        for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt).toLocaleDateString());
        }
        return arr;
    };

    checkIfDisabledDaysInInterval = (dateFrom, dateTo) => {
        var daylist = getDaysArray(new Date(dateFrom),new Date(dateTo));

        for (let i=0; i<daylist.length; i++) {
            for (let j=0; j<disabledDays.length; j++) {
                if (daylist[i] == disabledDays[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    $('.reserveButton').click (function() {

        if (this.id == "typeBasic") {
            currentType = 1;
            $('#pricePerNightDeluxe').addClass("displayNone");
            $('#pricePerNightBasic').removeClass("displayNone");

            disabledDays = $('#reservedDatesBasic').val().split(",");
        } else {
            currentType = 2;
            $('#pricePerNightBasic').addClass("displayNone");
            $('#pricePerNightDeluxe').removeClass("displayNone");
            
            disabledDays = $('#reservedDatesDeluxe').val().split(",");
        }
    });

    $('#submitReservationBtn').click (() => {
        let dateFrom = $('#date_from').val();
        let dateTo = $('#date_to').val();

        if (!dateFrom || !dateTo) {
            M.toast({html: 'Please fill in all required inputs.', classes: 'rounded errorToast'});
            $('#date_from').addClass("invalid");
            $('#date_to').addClass("invalid");
        } else if (dateFrom == dateTo) {
            M.toast({html: 'The dates are identical.', classes: 'rounded errorToast'});
            $('#date_from').addClass("invalid");
            $('#date_to').addClass("invalid");
        } else if (new Date(dateFrom) > new Date(dateTo)) {
            M.toast({html: 'Date To is earlier than Date From.', classes: 'rounded errorToast'});
            $('#date_from').addClass("invalid");
            $('#date_to').addClass("invalid");
        } else if (checkIfDisabledDaysInInterval(dateFrom, dateTo)) {
            M.toast({html: 'There are disabled dates in the interval.', classes: 'rounded errorToast'});
            $('#date_from').addClass("invalid");
            $('#date_to').addClass("invalid");
        } else {
            let daylistString = getDaysArray(new Date(dateFrom),new Date(dateTo)).toString() + ',';
            M.toast({html: 'Success!', classes: 'rounded successToast'});
            $('#date_from').addClass("valid");
            $('#date_to').addClass("valid");
            $('#modal1').modal('close');
            $('#sendToContract').attr('onClick', 'App.toggleReserved({type: ' + currentType + ', reservedDates: "' + daylistString + '"});').trigger("click");

        }
    });
});


function initMap() {
    const hotelCoords = {
        lat: 5.744511,
        lng: 73.323440
    };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: hotelCoords,
    });
    const marker = new google.maps.Marker({
        position: hotelCoords,
        map: map,
    });
}