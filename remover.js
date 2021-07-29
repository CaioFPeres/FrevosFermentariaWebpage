function deleteRecord(){

    let i = 1;
    let naoEncontrado = 0;
    let celular = document.getElementById('deleteInput').value;
    let linha = document.getElementsByTagName("tr");

    firebase.database().ref("Reservas").once("value", snap => {

        snap.forEach( child => {

            if(celular == child.key){
                firebase.database().ref("Reservas").child(child.key).remove();
            }
            else{
                naoEncontrado++;
            }


            if(celular == linha[i].getElementsByTagName("td")[6].innerHTML){
                document.getElementById("table").deleteRow(i);
                return;
            }


            i++;


        });

        if(naoEncontrado == snap.numChildren()){
            alert("Numero não encontrado!");
        }


    });

}


//firebase.database().ref("Reservas").child(snap.key).remove();

/*
var ref = firebase.database().ref('user');
ref.orderByChild('email').equalTo('wal@aol.com').on("value", function(snapshot) {
  snapshot.forEach((function(child) { console.log(child.key) }); 
});

*/