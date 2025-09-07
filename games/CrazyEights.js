export default {
    name: 'Crazy Eights',
    description: 'Match suit or rank. Eights are wild!',
    minPlayers: 2,
    maxPlayers: 5,
    initialHandSize: 5,
    deck: function() {
        const deck = [];
        const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
        const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        for (const suit of SUITS) {
            for (const rank of RANKS) {
                deck.push({ suit, rank });
            }
        }
        return deck;
    },
    getDisplayInfo: function(card) {
        const suitSymbols = { hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠' };
        const textColor = (card.suit === 'hearts' || card.suit === 'diamonds') ? 'text-red-500' : 'text-black';
        return {
            backgroundColor: 'bg-white',
            content: `<div>${card.rank}<div class="${textColor}">${suitSymbols[card.suit]}</div></div>`,
            textColor: textColor
        };
    },
    rules: {
        isPlayable: function(card, topCard, activeValue) { // activeValue is the current suit
            return card.rank === '8' || card.suit === activeValue || card.rank === topCard.rank;
        },
        getWildCardChoices: function() {
            return { title: "Choose a suit", choices: [
                { value: 'hearts', display: '♥', textColor: 'text-red-500' },
                { value: 'diamonds', display: '♦', textColor: 'text-red-500' },
                { value: 'clubs', display: '♣', textColor: 'text-black' },
                { value: 'spades', display: '♠', textColor: 'text-black' }
            ]};
        },
        onPlay: async function(transaction, gameState, card, chosenValue, player, playerHandRef, gameRef) {
            // This function would define the logic for card effects
        }
    }
};
