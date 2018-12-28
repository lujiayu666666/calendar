
$(document).ready(function () {

    var objArr = [
        { startDate: '2018-12-01', endDate: '2018-12-08', startTime: '03:00', endTime: '08:50' },
        { startDate: '2018-12-03', endDate: '2018-12-05', startTime: '09:00', endTime: '14:50' },
        { startDate: '2018-12-01', endDate: '2018-12-16', startTime: '17:00', endTime: '20:50' },
        { startDate: '2018-12-03', endDate: '2018-12-12', startTime: '21:00', endTime: '22:00' },
        { startDate: '2018-12-03', endDate: '2018-12-12', startTime: '22:00', endTime: '24:00' },
    ];

    calendar(objArr)
    $('.calendar-other-month').unbind('click');
    $(document).on('click', '.calendar-prevmonth, .calendar-nextmonth, .calendar-prevyear, .calendar-nextyear', function () {
        $('.calendar-other-month').unbind('click');
        calendar(objArr)
    })

    $(document).on('click', 'table tbody tr td', function () {
        console.log($(this).attr('abbr'));
        $('.panel-body').removeClass('clickBox1').addClass('clickBox');
        $(this).removeClass('clickDate1').addClass('clickDate');
    })

    $(document).on('click', '.clickDate', function () {
        $('.panel-body').removeClass('clickBox').addClass('clickBox1');
        $('table tbody tr td').removeClass('clickDate').addClass('clickDate1');   
    })


})
