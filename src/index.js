const players = [
    {
        NOME: "Mario",
        VELOCIDADE: 4,
        MANOBRABILIDADE: 3,
        PODER: 3,
        PONTOS: 0,
    },
    {
        NOME: "Luigi",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 4,
        PONTOS: 0,
    },
    {
        NOME: "Peach",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 2,
        PONTOS: 0,
    },
    {
        NOME: "Yoshi",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 4,
        PODER: 3,
        PONTOS: 0,
    },
    {
        NOME: "Bowser",
        VELOCIDADE: 5,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
    },
    {
        NOME: "Donkey Kong",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
    },
]

const ROUNDS = 5;

const BLOCK_ATTRIBUTE = {
    RETA: "VELOCIDADE",
    CURVA: "MANOBRABILIDADE",
    CONFRONTO: "PODER",
};

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
    const random = Math.random();

    if (random < 0.33) {
        return "RETA";
    } else if (random < 0.66) {
        return "CURVA";
    } else {
        return "CONFRONTO";
    }
}

function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

function selectRandomPlayers(count) {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function playRaceEngine(character1, character2) {
    for (let round = 1; round <= ROUNDS; round++) {
        console.log(`🏁 Rodada ${round}`);

        const block = getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);

        const diceResult1 = rollDice();
        const diceResult2 = rollDice();

        const attribute = BLOCK_ATTRIBUTE[block];
        const totalTestSkill1 = diceResult1 + character1[attribute];
        const totalTestSkill2 = diceResult2 + character2[attribute];

        if (block === "CONFRONTO") {
            console.log(`${character1.NOME} 🗡️ confrontou com ${character2.NOME}!`);
        }

        logRollResult(character1.NOME, attribute.toLowerCase(), diceResult1, character1[attribute]);
        logRollResult(character2.NOME, attribute.toLowerCase(), diceResult2, character2[attribute]);

        if (block === "CONFRONTO") {
            if (totalTestSkill1 === totalTestSkill2) {
                console.log("Empate no confronto! Ninguém perde ponto!");
            } else if (totalTestSkill1 > totalTestSkill2) {
                console.log(`${character1.NOME} venceu o confronto!`);
                if (character2.PONTOS > 0) {
                    console.log(`${character2.NOME} perdeu um ponto 💔!`);
                    character2.PONTOS--;
                } else {
                    console.log(`${character2.NOME} não tem pontos para perder.`);
                }
            } else {
                console.log(`${character2.NOME} venceu o confronto!`);
                if (character1.PONTOS > 0) {
                    console.log(`${character1.NOME} perdeu um ponto 💔!`);
                    character1.PONTOS--;
                } else {
                    console.log(`${character1.NOME} não tem pontos para perder.`);
                }
            }
        } else {
            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`${character1.NOME} ✅ Marcou um ponto!`);
                character1.PONTOS++;
            } else if (totalTestSkill2 > totalTestSkill1) {
                console.log(`${character2.NOME} ✅ Marcou um ponto!`);
                character2.PONTOS++;
            }
        }

        console.log("---------------------------------------------------------");
    }
}

function declareWinner(character1, character2) {
    console.log("Resultado Final: \n");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n🏆 Parabéns, ${character1.NOME} venceu a corrida!`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n🏆 Parabéns, ${character2.NOME} venceu a corrida!`);
    } else {
        console.log(`\n🤝 A corrida terminou empatada!`);
    }
}

function main() {
    const [player1, player2] = selectRandomPlayers(2);
    console.log(`🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    playRaceEngine(player1, player2);
    declareWinner(player1, player2);
}

main();
