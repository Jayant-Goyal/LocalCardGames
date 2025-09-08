export default {
    name: 'UNO',
    description: 'The classic card game. Be the first to play all of your cards!',
    minPlayers: 2,
    maxPlayers: 10,
    initialHandSize: 7,
    deck: function() {
        const deck = [];
        const COLORS = ['red', 'green', 'blue', 'yellow'];
        let cardIdCounter = 0;

        const getCardIdentifier = (color, value) => `${color}-${value}-${cardIdCounter}`;

        for (const color of COLORS) {
            deck.push({ id: cardIdCounter++, color, value: '0', image: getCardIdentifier(color, '0') });
            for (let i = 1; i <= 9; i++) {
                const valStr = i.toString();
                deck.push({ id: cardIdCounter++, color, value: valStr, image: getCardIdentifier(color, valStr) });
                deck.push({ id: cardIdCounter++, color, value: valStr, image: getCardIdentifier(color, valStr) });
            }
            ['skip', 'reverse', 'draw2'].forEach(action => {
                deck.push({ id: cardIdCounter++, color, value: action, image: getCardIdentifier(color, action) });
                deck.push({ id: cardIdCounter++, color, value: action, image: getCardIdentifier(color, action) });
            });
        }

        for (let i = 0; i < 4; i++) {
            deck.push({ id: cardIdCounter++, color: 'wild', value: 'wild', image: getCardIdentifier('wild', 'wild') });
            deck.push({ id: cardIdCounter++, color: 'wild', value: 'wild4', image: getCardIdentifier('wild', 'wild4') });
        }

        return deck;
    },
    getDisplayInfo: function(card) {
        const colorMap = { 
            red: 'bg-red-500', 
            green: 'bg-green-500', 
            blue: 'bg-blue-500', 
            yellow: 'bg-yellow-400', 
            wild: 'bg-gray-800'
        };
        const symbolMap = { skip: '🚫', reverse: '🔄', draw2: '+2', wild: '🎨', wild4: '+4' };
        
        const cardColorClass = colorMap[card.color] || 'bg-gray-500';
        const cardSymbol = symbolMap[card.value] || card.value;

        // A more modern card design with a main symbol and a corner symbol
        return {
            backgroundColorClass: cardColorClass,
            content: `
                <div class="relative w-full h-full rounded-lg p-2 flex flex-col justify-between text-white">
                    <div class="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
                    <div class="font-bold text-xl self-start">${cardSymbol}</div>
                    <div class="font-bold text-5xl self-center">${cardSymbol}</div>
                    <div class="font-bold text-xl self-end transform rotate-180">${cardSymbol}</div>
                </div>
            `
        };
    },
    rules: {
        isPlayable: function(card, topCard, activeColor) {
            if (!topCard) return true; // Can play any card if discard is empty (shouldn't happen)
            if (card.color === 'wild') return true;
            if (card.color === activeColor) return true;
            if (card.value === topCard.value) return true;
            return false;
        },
        getWildCardChoices: function() {
            return { title: "Choose a color", choices: [
                { value: 'red', display: '<div class="w-full h-full bg-red-500 rounded-full shadow-lg"></div>' },
                { value: 'green', display: '<div class="w-full h-full bg-green-500 rounded-full shadow-lg"></div>' },
                { value: 'blue', display: '<div class="w-full h-full bg-blue-500 rounded-full shadow-lg"></div>' },
                { value: 'yellow', display: '<div class="w-full h-full bg-yellow-400 rounded-full shadow-lg"></div>' }
            ]};
        },
        onPlay: function(card, chosenValue, playerName) {
            const effects = {
                drawCards: 0,
                skipNextPlayer: false,
                reverseTurn: false,
                setNextColor: null,
                logMessage: `${playerName} played a ${card.color === 'wild' ? '' : card.color} ${card.value}.`
            };

            switch (card.value) {
                case 'skip':
                    effects.skipNextPlayer = true;
                    effects.logMessage = ` ${playerName} skipped the next player!`;
                    break;
                case 'reverse':
                    effects.reverseTurn = true;
                    effects.logMessage = `${playerName} reversed the turn order!`;
                    break;
                case 'draw2':
                    effects.drawCards = 2;
                    effects.skipNextPlayer = true;
                    effects.logMessage = `${playerName} made the next player draw 2!`;
                    break;
                case 'wild':
                    effects.setNextColor = chosenValue;
                    effects.logMessage = `${playerName} chose ${chosenValue}.`;
                    break;
                case 'wild4':
                    effects.drawCards = 4;
                    effects.skipNextPlayer = true;
                    effects.setNextColor = chosenValue;
                    effects.logMessage = `${playerName} made the next player draw 4 and chose ${chosenValue}!`;
                    break;
            }
            return effects;
        }
    }
};

