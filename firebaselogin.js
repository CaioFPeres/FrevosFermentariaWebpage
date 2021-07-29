function login(){

//////////////////// A persistencia do usuario se dá no firebase
//////////////////// Ao identificar que vc está logando do mesmo navegador,
//////////////////// O firebase retorna a sessão ao usuario.


    const email = document.getElementById('userLogin');
    const password = document.getElementById('userPass');

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
    
        return firebase.auth().signInWithEmailAndPassword(email.value, password.value);
    });

}


function logout(){

    firebase.auth().signOut().then(function() {
        

    }).catch(function(error) {
    
        alert(error);

    });

}

function enter(e){
    if (e.keyCode == 13)
        login();
}