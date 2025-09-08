export default {
    name: 'UNO',
    description: 'The classic card game. Be the first to play all of your cards!',
    minPlayers: 2,
    maxPlayers: 10,
    initialHandSize: 7,
    deck: function() {
        const deck = [];
        const COLORS = ['red', 'green', 'blue', 'yellow'];
        const WILD_VALUES = ['wild', 'wild4'];

        // Helper to generate a placeholder image path.
        // Replace 'images/uno/' with the actual path to your card images.
        const getImagePath = (color, value) => `images/uno/${color}_${value.toLowerCase().replace(' ', '')}.png`;

        for (const color of COLORS) {
            // One '0' card
            deck.push({ color, value: '0', image: getImagePath(color, '0') });
            // Two of each card from 1-9
            for (let i = 1; i <= 9; i++) {
                const valStr = i.toString();
                deck.push({ color, value: valStr, image: getImagePath(color, valStr) });
                deck.push({ color, value: valStr, image: getImagePath(color, valStr) });
            }
            // Two of each action card
            ['skip', 'reverse', 'draw2'].forEach(action => {
                deck.push({ color, value: action, image: getImagePath(color, action) });
                deck.push({ color, value: action, image: getImagePath(color, action) });
            });
        }

        // Four of each wild card
        for (let i = 0; i < 4; i++) {
            deck.push({ color: 'wild', value: 'wild', image: getImagePath('wild', 'wild') });
            deck.push({ color: 'wild', value: 'wild4', image: getImagePath('wild', 'wild4') });
        }

        return deck;
    },
    getDisplayInfo: function(card) {
        // This function generates the HTML for a card, using an image.
        // It includes a fallback in case the image fails to load.
        const colorMap = { red: '#EF4444', green: '#22C55E', blue: '#3B82F6', yellow: '#EAB308', wild: '#374151'};
        const symbolMap = { skip: '🚫', reverse: '🔄', draw2: '+2', wild: '🎨', wild4: '+4' };
        const fallbackColor = colorMap[card.color] || '#6B7280';
        const fallbackSymbol = symbolMap[card.value] || card.value;

        return {
            backgroundColor: 'bg-gray-800', // Initial fallback color
            content: `<img src="${card.image}" alt="${card.color} ${card.value}" class="w-full h-full object-contain rounded-lg" onerror="this.style.display='none'; this.parentElement.style.backgroundColor='${fallbackColor}'; this.parentElement.innerHTML='<span class=\\'text-white\\'>${fallbackSymbol}</span>';">`
        };
    },
    rules: {
        isPlayable: function(card, topCard, activeValue) { // activeValue is the current color
            if (card.color === 'wild') return true;
            if (card.color === activeValue) return true;
            if (card.value === topCard.value) return true;
            return false;
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
            // This function defines the special effects of cards (e.g., skip, draw two).
            // NOTE: The main game logic needs to be updated to fully use this function for complex
            // actions like making another player draw cards.
            // For now, this is a conceptual placeholder for the game's logic.
        }
    }
};
