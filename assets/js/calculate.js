// Setting up all the global variables and buttons before.
var categories = document.getElementById("Categories")
var gradesArray = document.getElementsByTagName('tbody')[2];

var button = document.createElement("button");
button.innerHTML = "Add Assignment";
button.setAttribute("class", "calcbutton");
var body = document.getElementsByTagName('h2')[1];
body.appendChild(button);

function calculatePoints(){
    if (categories != null){
        var descrip = categories.getElementsByClassName("description")
        var arrPoints = new Array(descrip.length)
        for (i = 0; i < descrip.length; i++) {
            let temp = new Array(3)
            temp[0] = descrip[i].getElementsByClassName("numeric")[0].getElementsByClassName("points")[0].innerHTML
            temp[1] = descrip[i].getElementsByClassName("numeric")[0].getElementsByClassName("text-muted")[0].innerHTML
            temp[2] = descrip[i].getElementsByClassName("percent")[0].innerHTML
            temp[2] = temp[2].substring(0, temp[2].indexOf("%"))
            temp[3] = descrip[i].innerHTML
            temp[3] = temp[3].substring(temp[3].indexOf("\n"), temp[3].indexOf("<"))
            temp[3] = temp[3].trim(" ")
            console.log(temp[0] + " " + temp[1] + " " + temp[2] + " " + temp[3])
            arrPoints[i] = temp
        }
        category = true
    } else {
        var assignments = document.getElementsByClassName("assignment")
        var received = 0
        var total = 0
        for (i = 0; i < assignments.length; i++) {
            let rTemp = assignments[i].getElementsByClassName("points")[0].innerHTML
            if (!(rTemp === (""))) {
                let tTemp = assignments[i].getElementsByClassName("max")[0].innerHTML
                tTemp = tTemp.substring(tTemp.indexOf(" "), tTemp.length)
                received = received + parseInt(rTemp)
                total = total + parseInt(tTemp)
            }
        }
        console.log(received + " " + total)
    }
}

// *****************************************************************************************************************************************************************
// THESE ARE THE FUNCTIONS TO CREATE THE HTML ELEMENTS THAT MOCK THE STYLE OF THE ORIGINAL WEBSITE'S ROWS
// WE NEED TO CREATE A <td> TAG WITH ALL THE NECESSARY ELEMENTS AND ADD THEM TO A <tr>
// CREATE THE CALENDAR AND DATE ICON
function createTime(){
    let d = new Date()
    // First creating the date icon
    let icon = document.createElement("td");
    icon.setAttribute("class", "icon-date");

    let timeAttr = document.createElement("time");
    timeAttr.setAttribute('class', 'date-due');
    timeAttr.setAttribute("datetime", "2019-04-29T00:00:00");
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"," Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    timeAttr.innerHTML = "<span>" + months[d.getMonth()] + "</span>" + d.getDate();
    
    icon.appendChild(timeAttr);
    return icon;
}

// CREATE THE DESCRIPTION FOR THE GRADE
function createDescription(descParam){
    let desc = document.createElement("td");
    desc.setAttribute("class", "description");

    let titleAttr = document.createElement("div");
    titleAttr.innerHTML = descParam;
    titleAttr.setAttribute("class", "title");

    desc.appendChild(titleAttr);
    return desc;
}

// CREATE THE NUMERIC VALUE OF THE GRADE. EX: 1.5 / 2
function createNumeric(achieved, max){
    let numeric = document.createElement("td");
    numeric.setAttribute("class", "numeric");

    let divAttr = document.createElement("div");
    divAttr.setAttribute("class", "numeric");

    let achievedAttr = document.createElement("span");
    achievedAttr.innerHTML = achieved;
    achievedAttr.setAttribute("class", "points")

    let maxAttr = document.createElement("span");
    maxAttr.innerHTML = "max " + max;
    maxAttr.setAttribute("class", "max");

    divAttr.appendChild(achievedAttr);
    divAttr.appendChild(maxAttr);
    numeric.appendChild(divAttr);
    
    return numeric;
}

// CALCULATE THE PERCENT LETTER AND ADJUST COLOR ACCORDINGLY.
function createLetter(achieved, max){
    let style = "color:#007F00;background-color:#E6F2E6"; // Green background for 90 and above
    let letterGrade = "A";
    let percent = Math.round(achieved / max * 100);


    if (percent < 90){
        style = "color:#487F00;background-color:#EDF2E6";
        letterGrade = "B";
    }
    if (percent < 80){
        style = "color:#7F6D00;background-color:#F2F0E6";
        letterGrade = "C";
    }
    if (percent < 70){
        style = "color:#7F2400;background-color:#F2E9E6";
        letterGrade = "D";
    }
    if (percent < 60){
        style = "color:#7F0000;background-color:#F2E6E6";
        letterGrade = "F";
    }

    let letter = document.createElement("td");
    letter.setAttribute("class", "letter");

    let divAttr = document.createElement("div");
    divAttr.setAttribute("class", "letter");
    divAttr.setAttribute("style", style);
    
    let divAttr2 = document.createElement("div");

    let divAttr3 = document.createElement("div");
    divAttr3.innerHTML = letterGrade;

    let percentAttr = document.createElement("span");
    percentAttr.innerHTML = percent + "%";
    percentAttr.setAttribute("class", "percent");

    divAttr3.appendChild(percentAttr);
    divAttr2.appendChild(divAttr3);
    divAttr.appendChild(divAttr2);
    letter.appendChild(divAttr);

    return letter;
}
// *****************************************************************************************************************************************************************
// END <td> TAGS

// CONNECT THE BUTTON TO ADDING A NEW ROW
button.addEventListener ("click", function() {
    // We need to create a new grade in order to append it to the grade array.
    var newGrade = document.createElement("tr");
    newGrade.setAttribute("class", "assignment")
    // Creating the TDs
    var date = createTime();
    var desc = createDescription("Added Assignment");
    var numeric = createNumeric(1.5, 2);
    var letter = createLetter(1.5, 2);

    newGrade.appendChild(date);
    newGrade.appendChild(desc);
    newGrade.appendChild(numeric);
    newGrade.appendChild(letter);
    


    gradesArray.prepend(newGrade);
    console.log(newGrade);
    console.log(gradesArray);
    calculatePoints();
  });
