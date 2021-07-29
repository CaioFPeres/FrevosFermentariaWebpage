function setTemp(){
    let temp = parseInt(document.getElementById("setTempField").value);

    firebase.database().ref('iSpindel1Control').child('/SetTemp').set(temp);
}