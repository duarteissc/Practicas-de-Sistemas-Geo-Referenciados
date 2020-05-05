const listaloggedout = document.querySelectorAll('.logged-out');
const listaloggedin = document.querySelectorAll('.logged-in');
const datosdelacuenta = document.querySelector('.datosdelacuenta');

const configurarMenu = (user) => {
if(user){
    const html3 = `
                <p>Nombre: ${ user.displayName }</p>
                <p>Correo: ${ user.email}</p>
                <img src="${ user.photoURL }" width="50px">
            `;
            datosdelacuenta.innerHTML = html3;
    const html2 = `
                <p>Nombre: ${ user.displayName }</p>
                <p>Correo: ${ user.email}</p>
                <img src="${ user.photoURL }" width="50px">
            `;
            datosdelacuenta.innerHTML = html2;
    
    db.collection('usuarios').doc(user.uid).get().then( doc =>{
        const html = `
        <p>Nombre: ${doc.data().nombre}</p>
        <p>Correo: ${user.email}</p>
        <p>Telefono: ${doc.data().telefono}</p>
        <p>Direccion: ${doc.data().direccion}</p>
        
        `
        ;
        datosdelacuenta.innerHTML = html;
    });

    listaloggedin.forEach( item => item.style.display = 'block');
    listaloggedout.forEach( item => item.style.display = 'none');
}else{
    listaloggedin.forEach( item => item.style.display = 'none');
    listaloggedout.forEach( item => item.style.display = 'block');
}

};
