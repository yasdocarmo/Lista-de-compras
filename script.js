// Carregar itens do local storage ao iniciar
document.addEventListener('DOMContentLoaded', loadItems);

// Variável para armazenar o emoji selecionado
let selectedEmoji = '';

// Adicionar evento ao botão de adicionar
document.getElementById('addButton').addEventListener('click', function() {
    const itemInput = document.getElementById('itemInput');
    const sectionSelect = document.getElementById('sectionSelect');
    const itemText = itemInput.value.trim();
    const sectionText = sectionSelect.value;

    if (itemText !== '') {
        const fullText = selectedEmoji ? `${selectedEmoji} ${itemText}` : itemText;
        const displayText = sectionText ? `${fullText} (Seção: ${sectionText})` : fullText;
        addItemToList(displayText);
        saveItemToLocalStorage(displayText);
        itemInput.value = ''; // Limpa o campo de entrada
        sectionSelect.value = ''; // Limpa a seleção de seção
        selectedEmoji = ''; // Limpa o emoji selecionado
        document.getElementById('emojiList').classList.add('hidden'); // Esconde a lista de emojis
    } else {
        alert('Por favor, adicione um item.');
    }
});

// Função para adicionar item à lista
function addItemToList(itemText) {
    const li = document.createElement('li');
    li.textContent = itemText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', function() {
        li.remove();
        removeItemFromLocalStorage(itemText);
    });

    li.appendChild(removeButton);
    document.getElementById('shoppingList').appendChild(li);
}

// Função para salvar item no local storage
function saveItemToLocalStorage(itemText) {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items.push(itemText);
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Função para remover item do local storage
function removeItemFromLocalStorage(itemText) {
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items = items.filter(item => item !== itemText);
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Função para carregar itens do local storage
function loadItems() {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items.forEach(item => addItemToList(item));
}

// Eventos para o botão de emoji
document.getElementById('emojiButton').addEventListener('click', function() {
    const emojiList = document.getElementById('emojiList');
    emojiList.classList.toggle('hidden');
});

// Adicionar evento de clique em cada emoji
document.querySelectorAll('.emoji').forEach(emoji => {
    emoji.addEventListener('click', function() {
        selectedEmoji = emoji.dataset.emoji; // Define o emoji selecionado
        document.getElementById('emojiList').classList.add('hidden'); // Esconde a lista após a seleção
    });
});
