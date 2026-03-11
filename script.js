console.log("Site Identidade Subestimada carregado");

// Seleciona o formulário de contato pelo ID
const formContato = document.getElementById('formContato');

// Verifica se o formulário existe na página para evitar erros
if (formContato) {
    formContato.addEventListener('submit', function(event) {
        // Evita o comportamento padrão do formulário (que é recarregar a página)
        event.preventDefault(); 
        
        // Aqui você futuramente poderia conectar com uma API (como Formspree ou EmailJS) para receber e-mails reais.
        // Por enquanto, exibimos um alerta de sucesso na tela:
        alert("Obrigado pelo contato! Sua mensagem foi enviada com sucesso para a banda.");
        
        // Limpa os campos do formulário após o envio
        formContato.reset();
    });
}