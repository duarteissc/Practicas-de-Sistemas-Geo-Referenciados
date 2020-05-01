auth.onAuthStateChanged( user =>{
    if(user){
        console.log('Usuario entró');
        db.collection('Restaurantes').onSnapshot(snapshot =>{
            obtienePlatillos(snapshot.docs);
            configuraMenu(user);
        }, err => {
            console.log(err.message);
        });


        var name, email, photoUrl, uid, emailVerified;

        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  
        
        console.log(name,email,photoUrl,emailVerified,uid);

    }
    else{
        console.log('Usuario salió');
        obtienePlatillos([]);
        configuraMenu();
    }

});


const formaingresar = document.getElementById('formaingresar');
formaingresar.addEventListener('submit', (e) =>{
    e.preventDefault();
    let correo = formaingresar['correo'].value;
    let contrasena = formaingresar['contrasena'].value;

    auth.signInWithEmailAndPassword(correo, contrasena).then( cred =>{
        console.log(cred);
        $('#ingresarModal').modal('hide');
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML='';

    }).catch(err =>{
        formaingresar.querySelector('.error').innerHTML=mensajeError(err.code);
        console.log( err)
    });
});

function mensajeError(codigo){
    let mensaje="";
    switch(codigo){
        case 'auth/wrong-password':
        mensaje  ='Su contraseña no es correcta';
        break;
        case 'auth/user-not-found':
            mensaje = 'Usuario no encontrado';
            break;
        case 'auth/weak-password':
            mensaje= 'Contraseña debil';
            break;
        default:
        mensaje = 'Ocurrio un error con este usuario';

    }
    return mensaje;
}

const formaregistrate = document.getElementById('formaregistrate');
formaregistrate.addEventListener('submit', (e) => {
    e.preventDefault();
    const correo = formaregistrate['rcorreo'].value;
    const contrasena = formaregistrate['rcontrasena'].value;

    auth.createUserWithEmailAndPassword(correo,contrasena).then(cred =>{
        return db.collection('usuarios').doc(cred.user.uid).set({
            nombre: formaregistrate['rnombre'].value,
            telefono: formaregistrate['rtelefono'].value,
            direccion: formaregistrate['rdireccion'].value
        });

    }).then( ()=>{
        $('#registrateModal').modal('hide');
        formaregistrate.reset();
        formaregistrate.querySelector('.error').innerHTML = '';
    }).catch( err =>{
        formaregistrate.querySelector('.error').innerHTML = mensajeError(err.code);
    });
});





const salir = document.getElementById('salir');
salir.addEventListener('click', (e) =>{
    e.preventDefault();

    auth.signOut().then(() => {
        alert('El usuario ha salido del sistema');
    });
});



entrarGoogle= ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then( function(result)
    {
        var token = result.credential.accessToken;
        console.log(token);
        var user = result.user;
        let html = `
        <p>Nombre: ${user.displayName}</p>
        <p>Correo: ${user.email}</p>
        <img src=" ${user.photoURL}">
        `;
        datosdelacuenta.innerHTML = html;
        $('#ingresarModal').modal('hide');
        formainfresar.reset();
        formaingresar.querySelector('.error').innerHTML = "";
    }).catch(function(error){
console.log(error);
    });
}








