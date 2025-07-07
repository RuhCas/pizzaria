document.addEventListener('DOMContentLoaded', () => {
    // Tabela de preços (equivalente aos seus ifs no Python)
    const prices = {
        'PS': { 'P': 30.00, 'M': 45.00, 'G': 60.00 },
        'PD': { 'P': 34.00, 'M': 48.00, 'G': 66.00 }
    };

    let total = 0; // Variável para o valor total do pedido
    const orderList = document.getElementById('order-list');
    const totalPriceSpan = document.getElementById('total-price');
    const addToCartButton = document.getElementById('add-to-cart');
    const finishOrderButton = document.getElementById('finish-order');
    const saborSelect = document.getElementById('sabor');
    const tamanhoSelect = document.getElementById('tamanho');

    // Função para atualizar o total exibido
    const updateTotalDisplay = () => {
        totalPriceSpan.textContent = `R$ ${total.toFixed(2)}`;
    };

    // Evento para adicionar pizza ao pedido
    addToCartButton.addEventListener('click', () => {
        const sabor = saborSelect.value;
        const tamanho = tamanhoSelect.value;

        // Verifica se o sabor e tamanho são válidos (embora os selects já ajudem nisso)
        if (!prices[sabor] || !prices[sabor][tamanho]) {
            alert('Por favor, selecione um sabor e tamanho válidos.');
            return;
        }

        const preco = prices[sabor][tamanho];

        // Cria o item da lista para o pedido
        const listItem = document.createElement('li');
        const saborText = sabor === 'PS' ? 'Pizza Salgada' : 'Pizza Doce';
        listItem.innerHTML = `
            <span>${saborText} (Tam: ${tamanho})</span>
            <span>R$ ${preco.toFixed(2)}</span>
        `;
        orderList.appendChild(listItem);

        // Soma ao total
        total += preco;
        updateTotalDisplay();
    });

    // Evento para finalizar o pedido
    finishOrderButton.addEventListener('click', () => {
        if (total === 0) {
            alert('Seu carrinho está vazio! Adicione algumas pizzas antes de finalizar.');
            return;
        }
        alert(`O valor total a ser pago: R$ ${total.toFixed(2)}\nObrigado por seu pedido!`);
        // Opcional: Limpar o carrinho após finalizar
        total = 0;
        orderList.innerHTML = '';
        updateTotalDisplay();
    });

    // Inicializa o display do total
    updateTotalDisplay();
});