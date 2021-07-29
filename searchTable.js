function searchTable(){

    var input = document.getElementById("buscar");
        
    var linha = document.getElementsByTagName("tr");
    
    for(let j = 1; j<linha.length ; j++){
        var substring = "";


        if(input.value.length == 0)
            linha[j].style.display = "";

            
        for(let i = 0; i<input.value.length; i++){

            if(input.value.length <= linha[j].getElementsByTagName("td")[1].innerHTML.length){

                substring = substring + linha[j].getElementsByTagName("td")[1].innerHTML[i].toLowerCase();


                if( substring == input.value.toLowerCase() ){

                    linha[j].style.display = "";
                }
                else{
                    linha[j].style.display = "none";
                }

            }

        }


    }


}



///////forma mais facil, mas eu quis ser hardcore

/*

      if (linha[i].getElementsByTagName("td")[1].innerHTML.toLowerCase().indexOf(filter) > -1) {
        linha[i].style.display = "";
      } else {
        linha[i].style.display = "none";
      }


*/