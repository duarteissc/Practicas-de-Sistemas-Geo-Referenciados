auth.onAuthStateChanged(user =>{
    if(user){

        configurarMenu(user);
        
    }
    else{
        configurarMenu();
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





const salir = document.getElementById('salir');
salir.addEventListener('click', (e) =>{
    e.preventDefault();

    auth.signOut().then(() => {
        alert('El usuario ha salido del sistema');
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
