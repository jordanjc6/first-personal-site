var days = document.getElementsByClassName("day"); //the 7 calender days on main screen

var backButton = document.getElementById("back"); //to leave the current day and return to main screen
backButton.addEventListener("click", exitSchedule);
backButton.addEventListener("click", hideDay);

var newEventButton = document.getElementById("newEvent"); //to open the form and prompt for event details
newEventButton.addEventListener("click", showEventForm);

var xButton = document.getElementById("exit"); //to exit the event form
xButton.addEventListener("click", exitEventForm);

var delEventBut = document.getElementById("deleteEvent"); //to delete events individually from the day
delEventBut.addEventListener("click", setDelState);
var deleteActive = false;

var morningEvents = document.getElementById("mornEvents"); //the containers where the day's events are displayed
var afternoonEvents = document.getElementById("aftEvents");
var mEvents = morningEvents.getElementsByTagName("div"); //the events from each respective container
var aEvents = afternoonEvents.getElementsByTagName("div");

var submitButton = document.getElementById("submit"); //submit button on event form
submitButton.addEventListener("click", validateForm);

var startTimeInput = document.getElementById("startTime"); //these select the input fields on the event form
var endTimeInput = document.getElementById("endTime");
var eventTypeInput = document.getElementById("eventType");
var eventNameInput = document.getElementById("eventName");

var clearBut = document.getElementById("clearEvents"); //to clear all the events of the day
clearBut.addEventListener("click", clearEvents);

var fwdBut = document.getElementById("fwd"); //to scroll through days
var bwdBut = document.getElementById("bwd");
fwdBut.addEventListener("click", scrollDay);
bwdBut.addEventListener("click", scrollDay);

var firstRow = 1; //for help setting the grid-row css property in order to align events with times
var lastRow = 53; 

var dayClass; //used to set events on a specific day

var eventTypeColors = new Array("rgb(223, 0, 254)", "rgb(255, 165, 0)", "rgb(13, 213, 252)", "rgb(253, 53, 13)", "rgb(253, 255, 50)", "rgb(140, 255, 50)"); //the colors in order

var date = new Date(); //for accessing and highlighting the real world current day on the calendar screen
var currentDay = date.getDay();
var week = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];
var today = week[currentDay];
document.getElementById("calendar").getElementsByTagName("span")[currentDay].style.color = "#FFD700";

var eventObjects; //the array of stored events
if(window.localStorage.getItem("events")) {
    eventObjects = JSON.parse(window.localStorage.getItem("events"));
    for(var i = 0; i < eventObjects.length; i++) {
        displayEvent(eventObjects[i]);
    }
} else {
    eventObjects = new Array();
}

//clicking any day from the main screen or scrolling between days displays the corresponding day schedule
for(var i = 0; i < days.length; i++) {
    days[i].addEventListener("click", showSchedule);
    days[i].addEventListener("click", function(event) {
        dayClass = event.target.id;
    });
    days[i].addEventListener("click", showDay);
    days[i].addEventListener("mouseover", dotsHover);
    days[i].addEventListener("mouseleave", dotsLeave);
}
function showDay() {
    var dayEvents = document.getElementsByClassName(dayClass);
    for(var i = 0; i < dayEvents.length; i++) {
        dayEvents[i].classList.remove("hide");
    }
    document.getElementById("filler").innerHTML = dayClass;
}
function scrollDay(e) {
    var currentIndex = week.indexOf(dayClass);
    var nextIndex = currentIndex;
    if(e.target.id === "fwd")
        nextIndex += 1;
    else
        nextIndex -= 1;
    hideDay();
    if(nextIndex < 0)
        dayClass = week[week.length - 1];
    else if(nextIndex === week.length)
        dayClass = week[0];
    else
        dayClass = week[nextIndex];
    showDay();
}
function showSchedule() {
    document.getElementById("title").style.display= "none";
    document.getElementById("calendar").style.display = "none";
    document.getElementById("schedule").style.display = "grid";
    document.getElementById("back").style.display = "inline-block";
    document.getElementById("newEvent").style.display = "inline-block";
    document.getElementById("deleteEvent").style.display = "inline-block";
    document.getElementById("clearEvents").style.display = "inline-block";
    document.getElementById("fwd").style.display = "inline-block";
    document.getElementById("bwd").style.display = "inline-block";
}

//returns to the main screen
function exitSchedule() {
    document.getElementById("title").style.display = null;
    document.getElementById("calendar").style.display = null;
    document.getElementById("schedule").style.display = "none";
    document.getElementById("back").style.display = "none";
    document.getElementById("newEvent").style.display = "none";
    document.getElementById("deleteEvent").style.display = "none";
    document.getElementById("clearEvents").style.display = "none";
    document.getElementById("fwd").style.display = "none";
    document.getElementById("bwd").style.display = "none";
}
function hideDay() {
    var dayEvents = document.getElementsByClassName(dayClass);
    for(var i = 0; i < dayEvents.length; i++) {
        dayEvents[i].classList.add("hide");
    }
}

//displays/hides form for creating events
function showEventForm() {
    backButton.removeEventListener("click", exitSchedule);
    document.getElementById("eventForm").style.display = "grid";
}
function exitEventForm() {
    backButton.addEventListener("click", exitSchedule);
    document.getElementById("eventForm").style.display = "none";
}

//deals with deleting individual events
function setDelState() {
    if(deleteActive === false)
        deleteActive = true;
    else
        deleteActive = false;
    if(deleteActive) {
        delEventBut.style.backgroundColor = "red";
        delEventBut.style.color = "white";
        for(var i = 0; i < mEvents.length; i++) {
            mEvents[i].addEventListener("click", deleteEventM);
        }
        for(var i = 0; i < aEvents.length; i++) {
            aEvents[i].addEventListener("click", deleteEventA);
        }
    }
    else {
        delEventBut.style.backgroundColor = null;
        delEventBut.style.color = null;
        for(var i = 0; i < mEvents.length; i++) {
            mEvents[i].removeEventListener("click", deleteEventM);
        }
        for(var i = 0; i < aEvents.length; i++) {
            aEvents[i].removeEventListener("click", deleteEventA);
        }
    }
}
function deleteEventM(event) {
     var eventType = event.target.className.split(" ")[0];
     delCalendarDecor(eventType);
     for(var i = 0; i < eventObjects.length; i++) {
        var eventTime = event.target.getElementsByTagName("p")[0].innerText;
        if(eventTime.substring(0,5) == eventObjects[i].start.substring(0,5)) {
            if(eventTime.slice(-2) == eventObjects[i].end.slice(-2)) {
                event.target.removeChild(event.target.getElementsByTagName("p")[0]);
                if(event.target.innerText.substring(0, 5) == eventObjects[i].name.substring(0, 5)) {
                    if(eventType == eventObjects[i].type) {
                        if(event.target.className.split(" ")[1] == eventObjects[i].day) {
                            eventObjects.splice(i, 1);
                        }
                    }
                }
             }
        }
     }
     window.localStorage.setItem("events", JSON.stringify(eventObjects));
     morningEvents.removeChild(event.target);   
}
function deleteEventA(event) {
    var eventType = event.target.className.split(" ")[0];
    delCalendarDecor(eventType);
     for(var i = 0; i < eventObjects.length; i++) {
        var eventTime = event.target.getElementsByTagName("p")[0].innerText;
        if(eventTime.substring(0,5) == eventObjects[i].start.substring(0,5)) {
            if(eventTime.slice(-2) == eventObjects[i].end.slice(-2)) {
                event.target.removeChild(event.target.getElementsByTagName("p")[0]);
                if(event.target.innerText.substring(0, 5) == eventObjects[i].name.substring(0, 5)) {
                    if(eventType == eventObjects[i].type) {
                        if(event.target.className.split(" ")[1] == eventObjects[i].day) {
                            eventObjects.splice(i, 1);
                        }
                    }
                }
             }
        }
     }
     window.localStorage.setItem("events", JSON.stringify(eventObjects));
     afternoonEvents.removeChild(event.target);  
}

//checks the user input on event form
function validateForm() {
    if(startTimeInput.value[startTimeInput.value.length - 3] === " " || endTimeInput.value[endTimeInput.value.length - 3] === " ") {
        alert("Spaces between time inputs are not permitted.");
        return;
    }
    else if(startTimeInput.value === endTimeInput.value) {
        alert("The start and end times of the event cannot be the same.");
        return;
    }
    storeEvent();
    exitEventForm();
}

//event object factory function
function event(name, type, start, end, day) {
    this.name = name;
    this.type = type;
    this.start = start;
    this.end = end;
    this.day = day;
}

//creates event object with user's event form input and stores it in an array and local storage
function storeEvent() {
    var eventObject = new event(eventNameInput.value, eventTypeInput.value, startTimeInput.value, endTimeInput.value, dayClass);
    eventObjects.push(eventObject);
    window.localStorage.setItem("events", JSON.stringify(eventObjects));
    displayEvent(eventObject);
}

//displays the event upon creation
function displayEvent(event) { 
    var text = document.createTextNode(event.name);
    var element = document.createElement("div");
    element.appendChild(text);
    element.classList.add(event.type);
    var gridRows = setRows(event);
    var color = setColor(event, element);
    styleEvent(element, gridRows, color, event); 
    var elementCopy = checkMeridiem(event, element, gridRows);
    calendarDecor(event, color); 
    setHoverColor(element, elementCopy, color);
    addPopup(event, element, elementCopy);
    showDay();
}

//sets css styles and classes for the event's element
function styleEvent(element, rows, color, event) {
    element.style.gridRow = rows;
    element.style.margin = "0";
    element.style.color = "black";
    element.style.backgroundColor = color;
    element.style.fontFamily = "Hind Madurai, sans-serif";
    if(dayClass === undefined) 
        element.classList.add(event.day); 
    else
        element.classList.add(dayClass);
    element.classList.add("hide");
}

//deletes all of the day's events and removes colored dots on calendar screen
function clearEvents() {
    var clear = confirm("Are you sure you want to clear today's events?");
    if(clear) {
        var queryArg = "." + dayClass;
        document.querySelectorAll(queryArg).forEach(function(e) {
            e.remove();
        });
        var currentDay = document.getElementById(dayClass);
        currentDay.querySelectorAll(".dot").forEach(function(e) {
            e.style.backgroundColor = "#BFEFFF";
        });
        for(var i = 0; i < eventObjects.length; i++) {
            if(eventObjects[i].day == dayClass) {
                eventObjects.splice(i, 1);
                window.localStorage.setItem("events", JSON.stringify(eventObjects));
            }
        }
    }
}

//determines grid-row css property based on event's time span
function setRows(eventObj) {
    var startHour = Number(eventObj.start.slice(0, -5));
    var startMinute = Number((eventObj.start.slice(0, -2)).slice(-2));
    var endHour = Number(eventObj.end.slice(0, -5));
    var endMinute = Number((eventObj.end.slice(0, -2)).slice(-2));
    
    var rowStart = firstRow;
    if(startHour !== 12) {
        rowStart = (startHour * 4) + 1; 
    } 
    if(startMinute < 15) { 
        if((15 - startMinute) < 8)
            startMinute = 15;
        else
            startMinute = 0;
    }
    else if(startMinute < 30) {
        if((30 - startMinute) < 8)
            startMinute = 30;
        else
            startMinute = 15;
    }
    else if(startMinute < 45) {
        if((45 - startMinute) < 8)
            startMinute = 45;
        else
            startMinute = 30;
    }
    else if(startMinute > 45) {
        if((startMinute - 45) < 8)
            startMinute = 60;
        else
            startMinute = 45;
    }
    rowStart += (startMinute / 15);
    
    //deals with event times that range from morning to afternoon
    var rowEnd;
    if(endHour === 12 && eventObj.end.slice(-2) === "am") {
        eventObj.end = eventObj.end.substring(0, 5) + "pm"; 
        rowEnd = lastRow - 4;
    } else if(endHour === 12 && eventObj.end.slice(-2) === "pm") {
        eventObj.end = eventObj.end.substring(0, 5) + "am"; 
        rowEnd = lastRow - 4;
    }
    if(endHour !== 12) {
        rowEnd = (endHour * 4) + 1; 
    } 
    if(endMinute < 15) {
        if((15 - endMinute) < 8)
            endMinute = 15;
        else
            endMinute = 0;
    }
    else if(endMinute < 30) {
        if((30 - endMinute) < 8)
            endMinute = 30;
        else
            endMinute = 15;
    }
    else if(endMinute < 45) {
        if((45 - endMinute) < 8)
            endMinute = 45;
        else
            endMinute = 30;
    }
    else if(endMinute < 60) {
        if((60 - endMinute) < 8)
            endMinute = 60;
        else
            endMinute = 45;
    }
    rowEnd += (endMinute / 15);
    
    return rowStart.toString() + " / " + rowEnd.toString();
}

//sets the color of the event's element
function setColor(event, element) {
    switch(event.type) {
        case("work"):
            element.style.border = "solid #32174d 1px";
            return "#DF00FE";
        case("education"):
            element.style.border = "solid #CC7000 1px";
            return "#FFA500";
        case("hobby"):
            element.style.border = "solid #00008b 1px";
            return "#0dd5fc";
        case("people"):
            element.style.border = "solid #8b0000 1px";
            return "#fd350d";
        case("celebration"):
            element.style.border = "solid #9b870c 1px";
            return "#fdff32";
        case("other"):
            element.style.border = "solid #013220 1px";
            return "#8CFF32";
    }
}

//sets color change for when event is hovered over
function setHoverColor(event, eventCopy, color) {
    switch(color) {
        case("#DF00FE"):
            event.addEventListener("mouseover", function() {
                event.style.backgroundColor = "#EE82EE";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#EE82EE";
            });
            event.addEventListener("mouseleave", function() {
                event.style.backgroundColor = "#DF00FE";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#DF00FE";
            });
            if(eventCopy) {
                eventCopy.addEventListener("mouseover", function() {
                    eventCopy.style.backgroundColor = "#EE82EE";
                    event.style.backgroundColor = "#EE82EE";
                });
                eventCopy.addEventListener("mouseleave", function() {
                    eventCopy.style.backgroundColor = "#DF00FE";
                    event.style.backgroundColor = "#DF00FE";
                });
            }
            return;
        case("#FFA500"):
            event.addEventListener("mouseover", function() {
                event.style.backgroundColor = "#ffba00";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#ffba00";
            });
            event.addEventListener("mouseleave", function() {
                event.style.backgroundColor = "#FFA500";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#FFA500";
            });
            if(eventCopy) {
                eventCopy.addEventListener("mouseover", function() {
                    eventCopy.style.backgroundColor = "#ffba00";
                    event.style.backgroundColor = "#ffba00";
                });
                eventCopy.addEventListener("mouseleave", function() {
                    eventCopy.style.backgroundColor = "#FFA500";
                    event.style.backgroundColor = "#FFA500";
                });
            }
            return;
        case("#0dd5fc"):
            event.addEventListener("mouseover", function() {
                event.style.backgroundColor = "#98F5FF";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#98F5FF";
            });
            event.addEventListener("mouseleave", function() {
                event.style.backgroundColor = "#0dd5fc";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#0dd5fc";
            });
            if(eventCopy) {
                eventCopy.addEventListener("mouseover", function() {
                    eventCopy.style.backgroundColor = "#98F5FF";
                    event.style.backgroundColor = "#98F5FF";
                });
                eventCopy.addEventListener("mouseleave", function() {
                    eventCopy.style.backgroundColor = "#0dd5fc";
                    event.style.backgroundColor = "#0dd5fc";
                });
            }
            return;
        case("#fd350d"):
            event.addEventListener("mouseover", function() {
                event.style.backgroundColor = "#FF6666";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#FF6666";
            });
            event.addEventListener("mouseleave", function() {
                event.style.backgroundColor = "#fd350d";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#fd350d";
            });
            if(eventCopy) {
                eventCopy.addEventListener("mouseover", function() {
                    eventCopy.style.backgroundColor = "#FF6666";
                    event.style.backgroundColor = "#FF6666";
                });
                eventCopy.addEventListener("mouseleave", function() {
                    eventCopy.style.backgroundColor = "#fd350d";
                    event.style.backgroundColor = "#fd350d";
                });
            }
            return;
        case("#fdff32"):
            event.addEventListener("mouseover", function() {
                event.style.backgroundColor = "#FFFACD";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#FFFACD";
            });
            event.addEventListener("mouseleave", function() {
                event.style.backgroundColor = "#fdff32";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#fdff32";
            });
            if(eventCopy) {
                eventCopy.addEventListener("mouseover", function() {
                    eventCopy.style.backgroundColor = "#FFFACD";
                    event.style.backgroundColor = "#FFFACD";
                });
                eventCopy.addEventListener("mouseleave", function() {
                    eventCopy.style.backgroundColor = "#fdff32";
                    event.style.backgroundColor = "#fdff32";
                });
            }
            return;
        case("#8CFF32"):
            event.addEventListener("mouseover", function() {
                event.style.backgroundColor = "#98FB98";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#98FB98";
            });
            event.addEventListener("mouseleave", function() {
                event.style.backgroundColor = "#8CFF32";
                if(eventCopy)
                    eventCopy.style.backgroundColor = "#8CFF32";
            });
            if(eventCopy) {
                eventCopy.addEventListener("mouseover", function() {
                    eventCopy.style.backgroundColor = "#98FB98";
                    event.style.backgroundColor = "#98FB98";
                });
                eventCopy.addEventListener("mouseleave", function() {
                    eventCopy.style.backgroundColor = "#8CFF32";
                    event.style.backgroundColor = "#8CFF32";
                });
            }
            return;
    }
}

//determines if event occurs in morning or afternoon and displays accordingly
function checkMeridiem(event, element, rows) {
    var startMeridiem = event.start.slice(-2);
    var endMeridiem = event.end.slice(-2);
    if(startMeridiem === endMeridiem && startMeridiem === "am") {
        morningEvents.appendChild(element);
        return false;
    } else if(startMeridiem === endMeridiem && startMeridiem === "pm") {
        afternoonEvents.appendChild(element);
        return false;
    } else { 
        morningEvents.appendChild(element);
        var duplicate = element.cloneNode();
        if(rows.length === 5) { 
            element.style.gridRow = rows.charAt(0) + " / " + lastRow.toString();
            afternoonEvents.appendChild(duplicate);
            duplicate.style.gridRow = firstRow.toString() + " / " + rows.charAt(4);
            return duplicate;
        } else if(rows.length === 6) {
            if(rows.charAt(1) == " ") {
                element.style.gridRow = rows.charAt(0) + " / " + lastRow.toString();
                afternoonEvents.appendChild(duplicate);
                duplicate.style.gridRow = firstRow.toString() + " / "+ rows.substring(4, 6);
                return duplicate;
            } else {
                element.style.gridRow = rows.substring(0, 2) + " / " + lastRow.toString();
                afternoonEvents.appendChild(duplicate);
                duplicate.style.gridRow = firstRow.toString() + " / " + rows.charAt(5);
                return duplicate;
            }
        } else if(rows.length === 7) {
            element.style.gridRow = rows.substring(0, 2) + " / " + lastRow.toString();
            afternoonEvents.appendChild(duplicate);
            duplicate.style.gridRow = firstRow.toString() + " / " + rows.substring(5, 7);
            return duplicate;
        }
    }
}

//sets popup for each event that displays its time range
function addPopup(event, element, elementCopy) {
    var timeRange = document.createTextNode(event.start + " - " + event.end);
    var paragraph = document.createElement("p");
    paragraph.appendChild(timeRange);
    element.appendChild(paragraph);
    element.addEventListener("mouseover", function() {
        paragraph.style.display = null;
    });
    element.addEventListener("mouseleave", function() {
        paragraph.style.display = "none";
    });
    if(elementCopy) {
        elementCopy.addEventListener("mouseover", function() { 
            paragraph.style.display = null;
        });
        elementCopy.addEventListener("mouseleave", function() { 
            paragraph.style.display = "none";
        });  
    }
    paragraph.style.display = "none";
    paragraph.style.backgroundColor = "white";
    paragraph.style.border = "solid black 1px";
    paragraph.style.position = "absolute";
    paragraph.style.bottom = "74%";
    paragraph.style.zIndex = "2";
}

//give visuals to the days in the week format
function calendarDecor(event, color) {
    var dayOfWeek;
    if(dayClass === undefined) { 
        storedCalendarDecor(); 
        return;
    } else {
        dayOfWeek = document.getElementById(dayClass);
    }
    var dotToShow = dayOfWeek.getElementsByClassName(event.type)[0];
    dotToShow.style.backgroundColor = color;
}
function storedCalendarDecor() {
    for(var i = 0; i < eventObjects.length; i++) {
        var type = eventObjects[i].type;
        var day = eventObjects[i].day;
        var dayOfWeek = document.getElementById(day);
        var dotToShow = dayOfWeek.getElementsByClassName(type)[0];
        var color;
        switch(type) {
            case("work"):
                color = "#DF00FE";
                break;
            case("education"):
                color = "#FFA500";
                break;
            case("hobby"):
                color = "#0dd5fc";
                break;
            case("people"):
                color = "#fd350d";
                break;
            case("celebration"):
                color = "#fdff32";
                break
            case("other"):
                color = "#8CFF32";
                break;
        }
        dotToShow.style.backgroundColor = color;
    }
}

//remove colored dot when all of its corresponding event types are deleted
function delCalendarDecor(eventType) {
    var containerM = document.getElementById("mornEvents");
    var containerA = document.getElementById("aftEvents");
    var eventsM = containerM.getElementsByClassName(eventType);
    var eventsA = containerA.getElementsByClassName(eventType);
    var day = document.getElementById(dayClass);
    var dots = day.getElementsByClassName("dot");
    if((eventsM.length + eventsA.length) === 1) {
        switch(eventType) {
            case("work"):
                dots[0].style.backgroundColor = "#BFEFFF";
                return;
            case("education"):
                dots[1].style.backgroundColor = "#BFEFFF";
                return;
            case("hobby"):
                dots[2].style.backgroundColor = "#BFEFFF";
                return;
            case("people"):
                dots[3].style.backgroundColor = "#BFEFFF";
                return;
            case("celebration"):
                dots[4].style.backgroundColor = "#BFEFFF";
                return;
            case("other"):
                dots[5].style.backgroundColor = "#BFEFFF";
                return;
        }
    }
}

//make the dots change color with the calender day on hover and leave
function dotsHover(event) {
    var day = document.getElementById(event.target.id);
    var dots = day.getElementsByClassName("dot");
    var colorMatchIndex;
    for(var i = 0; i < dots.length; i++) {    
        for(var j = 0; j < eventTypeColors.length; j++) {
            if(eventTypeColors[j] === dots[i].style.backgroundColor) {
                colorMatchIndex = i;
                break;
            }
        }
        if(i !== colorMatchIndex)
            dots[i].style.backgroundColor = "#87CEEB";
    }
}
function dotsLeave(event) {
    var day = document.getElementById(event.target.id);
    var dots = day.getElementsByClassName("dot");
    var colorMatchIndex;
    for(var i = 0; i < dots.length; i++) {    
        for(var j = 0; j < eventTypeColors.length; j++) {
            if(eventTypeColors[j] === dots[i].style.backgroundColor) {
                colorMatchIndex = i;
                break;
            }
        }
        if(i !== colorMatchIndex)
            dots[i].style.backgroundColor = "#BFEFFF";
    }
}