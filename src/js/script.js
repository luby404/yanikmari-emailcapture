const firebaseConfig = {
    apiKey: "AIzaSyCSgYG067Q_X9oRcRa6d4UtJuHyIA56xWM",
    authDomain: "coleta-de-emails.firebaseapp.com",
    projectId: "coleta-de-emails",
    storageBucket: "coleta-de-emails.firebasestorage.app",
    messagingSenderId: "681766534585",
    appId: "1:681766534585:web:7b716a9de639ad49180a68"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Seleção de elementos do formulário
let inputNome = document.querySelector("#inputnome"),
    inputEmail = document.querySelector("#inputemail"),
    inputTelefone = document.querySelector("#inputtel")




// Evento de envio do formulário
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    

    // Validações de campos
    if (!inputNome.value.trim()) {
        alert("O nome é obrigatório.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputEmail.value.trim() || !emailPattern.test(inputEmail.value.trim())) {
        alert("Por favor, insira um email válido.");
        return;
    }

   

    // Verifica se o email e telefone já existem no Firestore
    db.collection("users_yanik").where("email", "==", inputEmail.value.trim()).get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                alert("O email já está em uso.");
                return;
            }
            return db.collection("users_yanik").where("telefone", "==", inputTelefone.value.trim()).get();
        })
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                alert("O telefone já está em uso.");
                return;
            }

            // Adiciona usuário ao Firestore
            return db.collection("users_yanik").add({
                email: inputEmail.value.trim(),
                telefone: inputTelefone.value.trim(),
                nome: inputNome.value.trim(),
            });
        })
        .then(() => {
            alert("Usuário adicionado com sucesso!");
            
            inputNome.value = '';
            inputEmail.value = '';
            inputTelefone.value = '';
        })
        .catch(error => {
            console.error("Erro:", error.message);
            alert("Houve um erro");
        });
});




