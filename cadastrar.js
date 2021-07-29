function cadastrar(){

    var dados = {
        Nome: document.getElementById('nameInput').value,
        Idade: document.getElementById('ageInput').value,
        Produto: document.getElementById('produto').value,
        Quantidade: document.getElementById('quantidade').value,
        Celular: document.getElementById('celular').value,
        Timestamp: firebase.database.ServerValue.TIMESTAMP,
        Vendedor: "-",
        Vendido: false,
    };

    if(dados.Nome.length > 0 && dados.Idade.length > 0 && dados.Quantidade.length > 0 && dados.Celular.length > 0){

        firebase.database().ref("Reservas").child(dados.Celular).set(dados);

        document.getElementById("reservado").className = "reservaFeita";

        
        document.getElementById("reservado").addEventListener("animationend", () => {
        document.getElementById("reservado").className = "reservaEscondida";
        document.getElementById("reservado").removeEventListener("animationend", arguments.callee);

        });
        

    }
    else{

        document.getElementById("validacao").className = "validacao";

        document.getElementById("validacao").addEventListener("animationend", () => {
        document.getElementById("validacao").className = "validacaoEscondida";
        document.getElementById("validacao").removeEventListener("animationend", arguments.callee);

        });

    }



        
}





function KeyEvent(e){

   
    
    if (e.keyCode == 13)
        cadastrar();

    if (document.getElementById('celular').value.length > 11){

        let celular = "";
        
        for(let i=0; i< document.getElementById('celular').value.length - 1; i++){

            
            celular = celular + document.getElementById('celular').value[i];
    
        
    
        }

        
        document.getElementById('celular').value = celular ;

    }

    


}