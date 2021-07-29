function downloadCSV(){

    var total = 0;
    var i = 0;
    var text;
///////////// Pegar referencia da database

    let retrieve = firebase.database().ref("Reservas");


///////////// Criar blob (um arquivo, que pode ser qualquer coisa)
//////////// Alem disso, tambem cria a URL para o blob

    urlTextFile = function (text) {
        /* If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        var urlTextFile = null;
        if (urlTextFile !== null) {
            window.URL.revokeObjectURL(urlTextFile);
        }
        */
       var blob = new Blob([text], {type: 'text/plain'});
        
        return window.URL.createObjectURL(blob);
    };


//////////// metodo de criar botão invisivel, se nao, nao funciona

    var a = document.createElement("a");

    document.body.appendChild(a);
    a.style = "display: none";
    a.download = "Reservas.csv";

    text = ["ID, Nome, Idade, Produto, Quantidade, Total, Celular, Data, Vendedor, Vendido\n"];

////////////once() pra ficar mais facil lidar com a database. Apenas once() usa promise.

    retrieve.orderByChild("Timestamp").once("value", snap => {


//// Tudo tem que estar dentro do forEach para repetir pra cada filho da database Reservas
       
////////////////// Função forEach() propria do firebase

        

        snap.forEach( function(child) {

            i++

            let nome = child.child("Nome").val();
            let idade = child.child("Idade").val();
            let produto = child.child("Produto").val();
            let quantidade = child.child("Quantidade").val();
            let celular = child.child("Celular").val();
            let vendedor = child.child("Vendedor").val();
            let vendido = child.child("Vendido").val();
            let timestamp = child.child("Timestamp").val();
            let data = new Date(timestamp);


//////////////////////////////////// Nova variavel Valor Total

            if(produto == 'AdU_500'){
                total = quantidade*25;
            }
 
        

//////////////////////////////////// Montando CSV

            text = text + i + "," + nome + "," + idade + "," + produto + "," + quantidade + "," + total + "," + celular + "," + data + "," + vendedor + "," + vendido + "\n";


        
        });

//////////////// Colocando a referencia da url no link e clicando
        a.href = urlTextFile(text);
        a.click();
        window.URL.revokeObjectURL(urlTextFile(text));
        a.remove();

    });


}