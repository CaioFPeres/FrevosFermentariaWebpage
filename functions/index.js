const functions = require('firebase-functions');
const admin = require('firebase-admin');
const logg = require("firebase-functions/lib/logger/compat");
var app = admin.initializeApp();




exports.verificacao = functions.database.ref("Reservas/{pushId}").onUpdate((change, context) => {
        
        if( change.before.child("Timestamp").val() === change.after.child("Timestamp").val() ){
            return null;
        }

        else{

            if(change.before.child("Vendido").val()){

                //pegando valores antes de ocorrer a alteração:
                var dados = {
                    Nome: change.before.child("Nome").val(),
                    Idade: change.before.child("Idade").val(),
                    Celular: change.before.child("Celular").val(),
                    hBouchet: change.before.child("hBouchet").val(),
                    hTradicional: change.before.child("hTradicional").val(),
                    Timestamp: change.before.child("Timestamp").val(),
                    Vendedor: change.before.child("Vendedor").val(),
                    Vendido: change.before.child("Vendido").val(),
                };
    

                return admin.database().ref("Reservas").once('value').then( snap => {
                    let underline = "_";
                    let num = 1;

                    snap.forEach( child => {
                    
                        let celular = "";

                            for(let i=0;i<child.key.length;i++){

                                if(child.key[i] === underline){


                                    if( celular === change.before.key){

                                        num++;

                                    }


                                }
                                else{
                                    celular = celular + child.key[i];
                                }

                            }

                        
                    
                    });



                    dados.Nome = dados.Nome + underline + num;
                    dados.Celular = dados.Celular + underline + num;
                    //backup da reserva vendida
                    return admin.database().ref("Reservas").child(dados.Celular).set(dados);



                    /*

                return admin.database().ref("Reservas").once('value').then( snap => {
                    let stringBackup = "_V";

                    snap.forEach( child => {
                    
                        if( child.key === (change.before.key + stringBackup) ){
                            stringBackup = stringBackup + "_V";
                        }
                    
                    });

                    dados.Nome = dados.Nome + stringBackup;
                    dados.Celular = dados.Celular + stringBackup;


                    //backup da reserva vendida
                    return admin.database().ref("Reservas").child(dados.Celular).set(dados);


                    */



                });

    
            }
            else{
                return null;
            }            



        }
    

});

exports.pushNotification = functions.database.ref("Reservas/{pushId}").onCreate((change, context) => {

    var message = {
        data: {
            title: 'Reserva feita!',
            body: 'Alguem reservou pelo site!'
        },
        topic: 'FERMENTARIA'
    };



    admin.messaging().send(message).then((response) => {
        console.log("Mensagem enviada: ", response);
        return null;
    })
    .catch((error) => {
        console.log("Error: ", error);
    });


    return null;

});