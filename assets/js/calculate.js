var categories = document.getElementById("Categories")
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
    chrome.storage.local.set({category: true}, function() {
    });
    chrome.storage.local.set({catInfo: arrPoints}, function() {
    });
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
    chrome.storage.local.set({category: false}, function() {
    });
    chrome.storage.local.set({received: received}, function() {
    });
    chrome.storage.local.set({total: total}, function() {
    });
}
var button = document.createElement("button");
button.innerHTML = "Add Assignment";
button.setAttribute("class", "calcbutton");
var body = document.getElementsByTagName('h2')[1];
body.appendChild(button);

button.addEventListener ("click", function() {
    alert("did something");
  });
