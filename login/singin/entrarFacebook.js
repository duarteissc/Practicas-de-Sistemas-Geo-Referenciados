
entrarFacebook= () => {
  
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {

        var token = result.credential.accessToken;
        console.log(token);

        var user = result.user;

            console.log(user);
            const html3 = `
                <p>Nombre: ${ user.displayName }</p>
                <p>Correo: ${ user.email}</p>
                <img src="${ user.photoURL }" width="50px">
            `;
            datosdelacuenta.innerHTML = html3;

            $('#ingresarmodal').modal('hide');
            formaingresar.reset();
            formaingresar.querySelector('.error').innerHTML = '';


        // ...
        }).catch(function(error) {
            console.log(error);
    });
}