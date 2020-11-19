import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDJJc_H6oZy9ZroG0Vrn5QN9RcaER-X5n4",
    authDomain: "realchaves-97f24.firebaseapp.com",
    databaseURL: "https://realchaves-97f24.firebaseio.com",
    projectId: "realchaves-97f24",
    storageBucket: "realchaves-97f24.appspot.com",
    messagingSenderId: "366416557676",
    appId: "1:366416557676:web:61c889d0c774779aadca49"
};

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        this.app = app.database();
    }

    GetChaves = async() => {
        await app.database().ref('Chave').once('value', (snapshot) => {

            let chaves = [];
            snapshot.forEach((x) => {
                chaves.push({
                    Id: x.key,
                    Marca: x.val().Marca,
                    NumeroSerie: x.val().NumeroSerie,
                    Quantidade: x.val().Quantidade,
                    Tipo: x.val().Tipo
                })
            })
            return chaves;
        });
    }
}

export default new Firebase();