export default {
    name: 'Pixel Cards',
    description: 'Match colors and numbers to empty your hand.',
    minPlayers: 2,
    maxPlayers: 4,
    initialHandSize: 7,
    deck: function() {
        const deck = [];
        const COLORS = ['red', 'green', 'blue', 'yellow'];
        const VALUES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'draw2'];
        for (const color of COLORS) {
            for (const value of VALUES) {
                deck.push({ color, value });
                if (value !== '0') deck.push({ color, value });
            }
        }
        for (let i = 0; i < 4; i++) {
            deck.push({ color: 'wild', value: 'wild' });
            deck.push({ color: 'wild', value: 'wild4' });
        }
        return deck;
    },
    getDisplayInfo: function(card) {
        const colorMap = { red: 'bg-red-500', green: 'bg-green-500', blue: 'bg-blue-500', yellow: 'bg-yellow-500', wild: 'bg-gray-700'};
        const symbolMap = { skip: '🚫', reverse: '🔄', draw2: '+2', wild: '🎨', wild4: '+4' };
        return {
            backgroundColor: colorMap[card.color] || 'bg-gray-600',
            content: `<span class="${card.value.length > 2 ? 'text-xl' : ''}">${symbolMap[card.value] || card.value}</span>`,
            textColor: 'text-white'
        };
    },
    rules: {
        isPlayable: function(card, topCard, activeValue) { // activeValue is the current color
            return card.color === 'wild' || card.color === activeValue || card.value === topCard.value;
        },
        getWildCardChoices: function() {
            return { title: "Choose a color", choices: [
                { value: 'red', display: '<div class="w-full h-full bg-red-500 rounded-full"></div>' },
                { value: 'green', display: '<div class="w-full h-full bg-green-500 rounded-full"></div>' },
                { value: 'blue', display: '<div class="w-full h-full bg-blue-500 rounded-full"></div>' },
                { value: 'yellow', display: '<div class="w-full h-full bg-yellow-500 rounded-full"></div>' }
            ]};
        },
        onPlay: async function(transaction, gameState, card, chosenValue, player, playerHandRef, gameRef) {
            // This function would define the logic for card effects
        }
    }
};
