var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

var hours = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
};

var sethours = function() {
    localStorage.setItem("hours", JSON.stringify(hours));
}

var gethours = function() {


    var loadedhours = JSON.parse(localStorage.getItem("hours"));
    if (loadedhours) {
        hours = loadedhours


        $.each(hours, function(hour, hours) {
            var hourDiv = $("#" + hour);
            createhours(hours, hourDiv);
        })
    }


    audithours()
}

var createhours = function(hoursText, hourDiv) {


    var hoursDiv = hourDiv.find(".hours");
    var hoursP = $("<p>")
        .addClass("description")
        .text(hoursText)
    hoursDiv.html(hoursP);
}

var audithours = function() {


    var currentHour = moment().hour();
    $(".hours-info").each( function() {
        var elementHour = parseInt($(this).attr("id"));

        if ( elementHour < currentHour ) {
            $(this).removeClass(["present", "future"]).addClass("past");
        }
        else if ( elementHour === currentHour ) {
            $(this).removeClass(["past", "future"]).addClass("present");
        }
        else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
};

var replaceTextarea = function(textareaElement) {



    var hoursInfo = textareaElement.closest(".hours-info");
    var textArea = hoursInfo.find("textarea");


    var time = hoursInfo.attr("id");
    var text = textArea.val();


    hours[time] = [text]; 
    sethours();


    createhours(text, hoursInfo);
}




$(".hours").click(function() {


    $("textarea").each(function() {
        replaceTextarea($(this));
    })


    var time = $(this).closest(".hours-info").attr("id");
    if (parseInt(time) >= moment().hour()) {


        var text = $(this).text();
        var textInput = $("<textarea>")
            .addClass("form-control")
            .val(text);


        $(this).html(textInput);
        textInput.trigger("focus");
    }
})


$(".saveBtn").click(function() {
    replaceTextarea($(this));
})


timeToHour = 3600000 - today.milliseconds(); 
setTimeout(function() {
    setInterval(audithours, 3600000)
}, timeToHour);


gethours();