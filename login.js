const usuarioInput = document.getElementById('usuario');
const senhaInput = document.getElementById('senha');
const botaoLogin = document.getElementById('botaoLogin');

function mostrarMensagem(texto, tipo) { 
    let mensagem = document.getElementById('loginMessage');
    
    if (!mensagem) {
        mensagem = document.createElement('div');
        mensagem.id = 'loginMessage';
        mensagem.classList.add('mensagem-estilizada');
        botaoLogin.parentNode.insertBefore(mensagem, botaoLogin.nextSibling);
    }
    
    // Define o texto
    mensagem.textContent = texto;

    // Lógica para alternar entre erro e sucesso visualmente
    if (tipo === 'erro') {
        mensagem.classList.add('mensagem-erro');
        mensagem.classList.remove('mensagem-sucesso');
    } else {
        mensagem.classList.add('mensagem-sucesso');
        mensagem.classList.remove('mensagem-erro');
    }
}

const adminUsuario = 'admin';
const adminSenha = 'admin';



botaoLogin.addEventListener('click', function (event) {
    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value.trim();
    
    if (!usuario || !senha) {
        event.preventDefault();   
        mostrarMensagem('Usuario ou senha não informado','erro');
        return;
    }

    if (usuario !== adminUsuario || senha !== adminSenha) {
        event.preventDefault();
        mostrarMensagem('Usuario ou senha inválidos','erro');
        return;
    }

    const mensagem = document.getElementById('loginMessage');
    if (mensagem) {
        mensagem.remove();
    }

    mostrarMensagem('Login bem-sucedido');
    alert('🔓 Login bem-sucedido! Redirecionando para o painel de eventos...');
    window.location.href = "admin_eventos.html"; 
});
