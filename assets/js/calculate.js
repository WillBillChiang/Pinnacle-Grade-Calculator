// Setting up all the global variables and buttons before.
var categories = document.getElementById("Categories")
var gradesArray = document.getElementsByTagName('tbody')[2];
if (categories != null) {
    gradesArray = document.getElementsByTagName('tbody')[3];
}
var firstTime = true
var button = document.createElement("button");
button.innerHTML = "Add Assignment";
button.setAttribute("class", "calcbutton");
var body = document.getElementsByTagName('h2')[1];
var body0 = document.getElementsByTagName('h2')[0];
body.innerHTML += `<div class='form12'> <form id='mainForm'> <input type='text' id='name123' placeholder='Assignment Name'> <input type='number' id='receivedPoints' placeholder='Received Points' step="0.01"> <input type='number' id='totalPoints' placeholder='Total Points' step = "0.01"> </form> </div> <br>`
calculatePoints()
button.setAttribute("type", "reset")
body.appendChild(button);
var category = false
var arrPoints = []

function calculatePoints(){
    var received = 0
    var total = 0
    var grade = 0
    var weirdCategories = false;
    if (categories != null){
        var descrip = categories.getElementsByClassName("description")
        arrPoints = new Array(descrip.length)
        for (i = 0; i < descrip.length; i++) {
            let temp = new Array(3)
            temp[0] = descrip[i].getElementsByClassName("numeric")[0].getElementsByClassName("points")[0].innerHTML
            temp[0] = temp[0].replace(",","")
            temp[1] = descrip[i].getElementsByClassName("numeric")[0].getElementsByClassName("text-muted")[0].innerHTML
            temp[1] = temp[1].replace(",","")
            try {
                temp[2] = descrip[i].getElementsByClassName("percent")[0].innerHTML
                temp[2] = temp[2].substring(0, temp[2].indexOf("%"))
            } catch {
                weirdCategories = true
                received += parseFloat(temp[0])
                total += parseFloat(temp[1])
                console.log(received + " " + total)
            }
            temp[3] = descrip[i].innerHTML
            temp[3] = temp[3].substring(temp[3].indexOf("\n"), temp[3].indexOf("<"))
            temp[3] = temp[3].trim(" ")
            console.log(temp[0] + " " + temp[1] + " " + temp[2] + " " + temp[3])
            arrPoints[i] = temp
            if (!(weirdCategories)) {
                grade += (parseFloat(temp[0])/parseFloat(temp[1])) * (parseFloat(temp[2])/100)
            }
        }
        if (weirdCategories){
            grade = received/total;
        }
        if (firstTime) {
            let selectCategory = document.createElement("select")
            selectCategory.setAttribute("id", "category123")
            for (let ansh = 0; ansh < arrPoints.length; ansh++) {
                options = document.createElement("option")
                options.innerHTML = arrPoints[ansh][3]
                options.setAttribute("value", arrPoints[ansh][3])
                selectCategory.appendChild(options)
            }
            document.getElementsByClassName("form12")[0].appendChild(selectCategory)
            category = true
            firstTime = false
        }
        let letterProperties = createRawLetter(grade, 1);
        var originGrade = document.getElementsByClassName("letter")[0];
        
        var newDiv = document.createElement('div');
        newDiv.innerHTML=letterProperties[1];
        
        var newSpan = document.createElement('span');
        newSpan.innerHTML = letterProperties[2] +"%";
        newSpan.setAttribute("class", "percent");
    
        newDiv.appendChild(newSpan);
        originGrade.innerHTML="";
        originGrade.appendChild(newDiv);
        originGrade.setAttribute("style", "margin-left:1rem;" + letterProperties[0]);

    } else {
        var assignments = document.getElementsByClassName("assignment")
    
        for (i = 0; i < assignments.length; i++) {
            let rTemp = assignments[i].getElementsByClassName("points")[0].innerHTML
            let excused = assignments[i].getElementsByClassName("letter")[1].getElementsByTagName("div")[1].innerHTML
            console.log(excused)
            if (!(rTemp === ("")) && !(excused == "X")) {
                let tTemp = assignments[i].getElementsByClassName("max")[0].innerHTML
                let weight = assignments[i].getElementsByClassName("weight")[0]
                if (weight == null) {
                    weight = 1
                } else {
                    weight = weight.innerHTML
                    weight = weight.substring(2, weight.length)
                    weight = parseFloat(weight)
                    console.log(weight)
                }
                tTemp = tTemp.substring(tTemp.indexOf(" "), tTemp.length)
                console.log(weight)
                received = received + parseFloat(rTemp.replace(",",""))*weight
                total = total + parseFloat(tTemp.replace(",",""))*weight
            }
        }
        console.log(received + " " + total)
        let letterProperties = createRawLetter(received, total);
        var originGrade = document.getElementsByClassName("letter")[0];
        
        var newDiv = document.createElement('div');
        newDiv.innerHTML=letterProperties[1];
        
        var newSpan = document.createElement('span');
        newSpan.innerHTML = letterProperties[2] +"%";
        newSpan.setAttribute("class", "percent");
    
        newDiv.appendChild(newSpan);
        originGrade.innerHTML="";
        originGrade.appendChild(newDiv);
        originGrade.setAttribute("style", "margin-left:1rem;" + letterProperties[0]);
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

function createRawLetter(achieved, max){
    let style = "color:#007F00;background-color:#E6F2E6"; // Green background for 90 and above
    let letterGrade = "A";
    let percent = Math.round(achieved / max * 100);

    if (percent < 90) {
        style = "color:#237F00;background-color:#E9F2E6"
        letterGrade = "B+"
    }
    if (percent < 87) {
        style = "color:#487F00;background-color:#EDF2E6";
        letterGrade = "B";
    }
    if (percent < 80) {
        style = "color:#6D7F00;background-color:#F0F2E6";
        letterGrade = "C+";
    }
    if (percent < 77){
        style = "color:#7F6D00;background-color:#F2F0E6";
        letterGrade = "C";
    }
    if (percent < 70) {
        style = "color:#7F4800;background-color:#F2EDE6";
        letterGrade = "D+";
    }
    if (percent < 67) {
        style = "color:#7F2400;background-color:#F2E9E6";
        letterGrade = "D";
    }
    if (percent < 60){
        style = "color:#7F0000;background-color:#F2E6E6";
        letterGrade = "F";
    }

    return [style, letterGrade, percent];
}
// CALCULATE THE PERCENT LETTER AND ADJUST COLOR ACCORDINGLY.
function createLetter(achieved, max){

    let letterProperties = createRawLetter(achieved, max);
    let style = letterProperties[0];
    let letterGrade = letterProperties[1];
    let percent = letterProperties[2];
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
    let rec = document.getElementById("receivedPoints").value
    console.log(rec)
    if (rec == "") {
        rec = 0
    }
    let tot = document.getElementById("totalPoints").value
    if (tot == "") {
        tot = 0
    }
    let nam = document.getElementById("name123").value
    var namCat = ""
    if (categories != null) {
        namCat = document.getElementById("category123").value
    }
    if (nam == "") {
        nam = "Added Assignment"
    }

    // We need to create a new grade in order to append it to the grade array.
    var newGrade = document.createElement("tr");
    newGrade.setAttribute("class", "assignment")
    // Creating the TDs
    var date = createTime();
    var desc = createDescription(nam);
    if (categories != null) {
        let catAttr = document.createElement("div")
        catAttr.setAttribute("class", "category")
        catAttr.innerHTML = namCat
        desc.appendChild(catAttr)
        var descrip = categories.getElementsByClassName("description")
        arrPoints = new Array(descrip.length)
        for (i = 0; i < descrip.length; i++) {
            catValue = descrip[i].innerHTML
            catValue = catValue.substring(catValue.indexOf("\n"), catValue.indexOf("<"))
            catValue = catValue.trim(" ")
            if (catValue == namCat) {
                let temp = []
                temp[0] = descrip[i].getElementsByClassName("numeric")[0].getElementsByClassName("points")[0].innerHTML
                temp[0] = temp[0].replace(",","")
                temp[1] = descrip[i].getElementsByClassName("numeric")[0].getElementsByClassName("text-muted")[0].innerHTML
                temp[1] = temp[1].replace(",","")
                descrip[i].getElementsByClassName("numeric")[0].getElementsByClassName("points")[0].innerHTML = parseFloat(temp[0]) + parseFloat(rec)
                descrip[i].getElementsByClassName("numeric")[0].getElementsByClassName("text-muted")[0].innerHTML = parseFloat(temp[1]) + parseFloat(tot)
                let changeLetter = document.getElementsByClassName("letter")[i*2+1]
                changeLetter.replaceWith(createLetter(parseFloat(descrip[i].getElementsByClassName("numeric")[0].getElementsByClassName("points")[0].innerHTML), parseFloat(descrip[i].getElementsByClassName("numeric")[0].getElementsByClassName("text-muted")[0].innerHTML)))
                break
            }
        
        }
    }
    var numeric = createNumeric(rec, tot);
    var letter = createLetter(rec, tot);

    newGrade.appendChild(date);
    newGrade.appendChild(desc);
    newGrade.appendChild(numeric);
    newGrade.appendChild(letter);
    gradesArray.prepend(newGrade);
    console.log(newGrade);
    console.log(gradesArray);
    calculatePoints();
  });
