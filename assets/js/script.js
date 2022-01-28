// Using moment to set time and date
let today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

// Hour variables
let hours = {
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

// Adds to localstorage
let sethours = function () {
    localStorage.setItem("hours", JSON.stringify(hours));
}

// Loads from localstorage and creates in the proper row
let gethours = function () {
    let loadedhours = JSON.parse(localStorage.getItem("hours"));
    if (loadedhours) {
        hours = loadedhours


        $.each(hours, function (hour, hours) {
            let hourDiv = $("#" + hour);
            createhours(hours, hourDiv);
        })
    }

    audithours()
}
// Creates a text box in corresponding hour
let createhours = function (hoursText, hourDiv) {
    let hoursDiv = hourDiv.find(".hours");
    let hoursP = $("<p>")
        .addClass("description")
        .text(hoursText)
    hoursDiv.html(hoursP);
}

// Chnages the background colour based on current time
let audithours = function () {
    let currentHour = moment().hour();
    $(".hours-info").each(function () {
        let elementHour = parseInt($(this).attr("id"));

        if (elementHour < currentHour) {
            $(this).removeClass(["present", "future"]).addClass("past");
        }
        else if (elementHour === currentHour) {
            $(this).removeClass(["past", "future"]).addClass("present");
        }
        else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
};

// Replace textarea element with a p element 
let replaceTextarea = function (textareaElement) {

    let hoursInfo = textareaElement.closest(".hours-info");
    let textArea = hoursInfo.find("textarea");


    let time = hoursInfo.attr("id");
    let text = textArea.val();


    hours[time] = [text];
    sethours(); //stores in localstorage

    createhours(text, hoursInfo);
}



$(".hours").click(function () {

    $("textarea").each(function () {
        replaceTextarea($(this));
    })
    // Becomes text area if time is valid
    let time = $(this).closest(".hours-info").attr("id");
    if (parseInt(time) >= moment().hour()) {

        //Creates textInput element 
        let text = $(this).text();
        let textInput = $("<textarea>")
            .addClass("form-control")
            .val(text);

        // Adds textInput element to parent 
        $(this).html(textInput);
        textInput.trigger("focus");
    }
})

// Save Button Click
$(".saveBtn").click(function () {
    replaceTextarea($(this));
})

// Chnages clolour depending on current hour
timeToHour = 3600000 - today.milliseconds();
setTimeout(function () {
    setInterval(audithours, 3600000)
}, timeToHour);

// Grabs from localstorage on load
gethours();