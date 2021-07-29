////////////////////tem q colocar tudo nessa função pq se não, fica fora de sincronia
function listarDados_CreateEvents(){

    limparTable();

    var table = document.getElementById("table");
    var checkboxes = {};
    var total = 0;
    let i = 0;
///////////// Pegar referencia da database

    let retrieve = firebase.database().ref("Reservas");

////////////once() pra ficar mais facil lidar com a database. Apenas once() usa promise.


    retrieve.orderByChild("Timestamp").once("value", snap => {


//// Tudo tem que estar dentro do forEach para repetir pra cada filho da database Reservas
       
////////////////// Função forEach() propria do firebase

        snap.forEach( function(child) {
            
            let backupVendido = false;

            i++

            var nome = child.child("Nome").val();
            let idade = child.child("Idade").val();
            let produto = child.child("Produto").val();
            let quantidade = child.child("Quantidade").val();
            let celular = child.child("Celular").val();
            let timestamp = child.child("Timestamp").val();
            let vendedor = child.child("Vendedor").val();
            let data = new Date(timestamp);


            checkboxes[i] = document.createElement("INPUT");
            checkboxes[i].setAttribute("type", "checkbox");

            checkboxes[i].checked = child.child("Vendido").val();




///////////////////////////////////// Nova variavel Valor Total

            if(produto == 'AdU_500'){
                total = quantidade*25;
            }
    
/////////////////////////////////////  Construir a tabela

            var newRow = table.insertRow(i);
        
            var cel0 = newRow.insertCell(0);
            var cel1 = newRow.insertCell(1);
            var cel2 = newRow.insertCell(2);
            var cel3 = newRow.insertCell(3);
            var cel4 = newRow.insertCell(4);
            var cel5 = newRow.insertCell(5);
            var cel6 = newRow.insertCell(6);
            var cel7 = newRow.insertCell(7);
            var cel8 = newRow.insertCell(8);
            var cel9 = newRow.insertCell(9);
        


            cel0.innerHTML = i;
            cel0.style.textAlign = "center";
            cel1.innerHTML = nome;
            cel1.style.textAlign = "center";
            cel2.innerHTML = idade;
            cel2.style.textAlign = "center";
            cel3.innerHTML = produto;
            cel3.style.textAlign = "center";
            cel4.innerHTML = quantidade;
            cel4.style.textAlign = "center";
            cel5.innerHTML = total;
            cel5.style.textAlign = "center";
            cel6.innerHTML = celular;
            cel6.style.textAlign = "center";
            cel7.innerHTML = data;
            cel7.style.textAlign = "center";
            cel8.innerHTML = vendedor;
            cel8.style.textAlign = "center";



//////////////////////////////////////////verificar se é venda finalizada
            for(let j=0;j<child.key.length;j++){
                
                if(child.key[j] == "_"){
                    backupVendido = true;
                }

            }   

            if(!backupVendido){
                cel9.appendChild(checkboxes[i]);
                cel9.style.textAlign = "center";
            }


//////////////////////////////////////// Colorir pela primeira vez, quando pega os valores
            if(checkboxes[i].checked == true){
                document.getElementById("table").rows[i].style.backgroundColor = '#66EE27';
            }


/////////////////// chamando função para criar evento de inserir check na database
////////////////// tem que estar dentro de uma função, se não, buga os eventos por causa de nova atribuição a variavel

            CreateCheckEvent(i, celular, checkboxes);
        
        
        });



/////////////////// chamando função para confirmar que a inserção foi bem sucedida, colorindo a linha e outras coisas
        OnChildChangedEvent();


    });


}





///////////// Criação do evento para ver se cada checkbox mudou, e inserir novo valor na database
function CreateCheckEvent(i, celular, checkboxes){
    
    checkboxes[i].addEventListener('change', function(){
                        
        firebase.database().ref('Reservas').child(celular + '/Vendido').set(checkboxes[i].checked);

        //dependendo do estado da checkbox eu coloco um valor diferente
        if(checkboxes[i].checked == true)
            firebase.database().ref('Reservas').child(celular + '/Vendedor').set(firebase.auth().currentUser.displayName);
        else
            firebase.database().ref('Reservas').child(celular + '/Vendedor').set("-");
    });

}






function OnChildChangedEvent(){

    firebase.database().ref("Reservas").on("child_changed", snap2 => {

        var linha;
        
        linha = document.getElementsByTagName("tr");

        
        for(let i = 1; i<=linha.length -1; i++){

        //////////procurar o nome na tabela pra mudar a cor da linha toda

            if( linha[i].getElementsByTagName("td")[6].innerHTML == snap2.key){


                ////alteração da checkbox, sendo outra pessoa que alterou ou não
                linha[i].getElementsByTagName("td")[9].firstChild.checked = snap2.child("Vendido").val();

                ////alteração do vendedor, sendo outra pessoa ou não
                linha[i].getElementsByTagName("td")[8].innerHTML = snap2.child("Vendedor").val();


                
                if(snap2.child("Vendido").val() == true){

                    //// alteração da cor da tabela
                    document.getElementById("table").rows[i].style.backgroundColor = '#66EE27';

                }
                else{
                    
                    //// alteração da cor da tabela
                    document.getElementById("table").rows[i].style.backgroundColor ='rgba(255, 255, 255, 0)';
                }

            }



        }    

    
    });


}

////////////////// Só uma certificação de que a tabela é resetada antes de colocar os valores
function limparTable(){

    while ( table.rows.length > 1 )
    {
     table.deleteRow(1);
    }

}



////////////////// funcao para atualizar perfil de usuario autenticado
/*
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: "Caio",
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });


    console.log(firebase.auth().currentUser.displayName);

*/



/*
/////////////////////////////////////////////// Função antiga para consulta
function limparTable(){

    //Await(Sync);

    listarDados().then(function(checkboxes){
        
        checkbox = checkboxes;
        FazerCopia();

    });


}
*/
//////////////////////////////////////////////




///////////////////// função antiga como exemplo usando promise pra tirar valor do evento
///////////////////// da chamada da database


/*
function listarDados(){

    var databaseLength = 0;
    var checkboxes = [];

    var retriev = firebase.database().ref("Reservas");

    let listener = retriev.on("child_added", snap => {

        databaseLength++;

        var nome = snap.child("Nome").val();
        var idade = snap.child("Idade").val();
        var produto = snap.child("Produto").val();
        var quantidade = snap.child("Quantidade").val();
        var celular = snap.child("Celular").val();
        var data = snap.child("Data").val();
        var id = snap.child("Id").val();

        



        checkboxes[databaseLength] = document.createElement("INPUT");
        checkboxes[databaseLength].setAttribute("type", "checkbox");

        checkboxes[databaseLength].checked = snap.child("Vendido").val();


        
        var total;
        if(produto == 'AdU_500'){
            total = quantidade*25;}

        
        var table = document.getElementById("table");

        var newRow = table.insertRow(databaseLength);
    
        var cel0 = newRow.insertCell(0);
        var cel1 = newRow.insertCell(1);
        var cel2 = newRow.insertCell(2);
        var cel3 = newRow.insertCell(3);
        var cel4 = newRow.insertCell(4);
        var cel5 = newRow.insertCell(5);
        var cel6 = newRow.insertCell(6);
        var cel7 = newRow.insertCell(7);
        var cel8 = newRow.insertCell(8);
    


        cel0.innerHTML = id;
        cel0.style.textAlign = "center";
        cel1.innerHTML = nome;
        cel1.style.textAlign = "center";
        cel2.innerHTML = idade;
        cel2.style.textAlign = "center";
        cel3.innerHTML = produto;
        cel3.style.textAlign = "center";
        cel4.innerHTML = quantidade;
        cel4.style.textAlign = "center";
        cel5.innerHTML = total;
        cel5.style.textAlign = "center";
        cel6.innerHTML = celular;
        cel6.style.textAlign = "center";
        cel7.innerHTML = data;
        cel7.style.textAlign = "center";
        cel8.appendChild(checkboxes[databaseLength]);
        cel8.style.textAlign = "center";

        
        if(checkboxes[databaseLength].checked == true){
            document.getElementById("table").rows[databaseLength].style.backgroundColor = '#66EE27';
        }

        
    });


    var promise = new Promise(function(resolve, reject) {
        
        window.setTimeout(() => {
        resolve(checkboxes);}, 1000);
        
    });

    window.setTimeout(() => { retriev.off("child_added", listener); }, 1100);


    return promise;

}
///////////////////////////////////////////////////////////////////////////////////////////





//////////////////////////////exemplo de função async
/*
async function Await(){

    let promise = new Promise(function(resolve, reject) {
        resolve();
      });

      await promise;

}
*/
