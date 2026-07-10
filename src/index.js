const player1 = {
    NOME : "Mario",
    VELOCIDADE : 4,
    MANOBRABILIDADE : 3,
    PODER : 3,
    PONTOS : 0,
}

const player2 = {
    NOME : "Luigi",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 4,
    PONTOS : 0,
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
        let random = Math.random()
        let result

        switch (true) {
            case random < 0.33:
                result = "RETA"
                break;
            case random < 0.66:
                result = "CURVA"
                break;
            default:
                result = "CONFRONTO";
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {

        console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(charactere1, charactere2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);
        
            //rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + charactere1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + charactere2.VELOCIDADE;

            await logRollResult(
                charactere1.NOME,
                "velocidade",
                diceResult1,
                charactere1.VELOCIDADE
            );
            await logRollResult(
                charactere2.NOME,
                "velocidade",
                diceResult2,
                charactere2.VELOCIDADE
            );
        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + charactere1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + charactere2.MANOBRABILIDADE;

            await logRollResult(
                charactere1.NOME,
                "manobralidade",
                diceResult1,
                charactere1.MANOBRABILIDADE
            );
            await logRollResult(
                charactere2.NOME,
                "manobralidade",
                diceResult2,
                charactere2.MANOBRABILIDADE
            );
        }
        if (block === "CONFRONTO") {
            totalTestSkill1 = diceResult1 + charactere1.PODER;
            totalTestSkill2 = diceResult2 + charactere2.PODER;

            console.log(`${charactere1.NOME} 🗡  confrontou com ${charactere2.NOME}!`)

            await logRollResult(
                charactere1.NOME,
                "poder",
                diceResult1,
                charactere1.PODER
            );
            await logRollResult(
                charactere2.NOME,
                "poder",
                diceResult2,
                charactere2.PODER
            );

            if (totalTestSkill1 > totalTestSkill2 && charactere2.PONTOS > 0) {
                console.log(`${charactere1.NOME} venceu o confronto! ${charactere2.NOME} perdeu um ponto 💔 !`)
                charactere2.PONTOS--;
            }
            if (totalTestSkill2 > totalTestSkill1 && charactere1.PONTOS > 0) {
                console.log(`${charactere2.NOME} venceu o confronto! ${charactere1.NOME} perdeu um ponto 💔 !`)
                charactere1.PONTOS--;
            }

            console.log(totalTestSkill2 === totalTestSkill1 ? "Empate no confronto! Ninguém perde ponto!" : "");
        }

        //verificando o vencedor
        if(totalTestSkill1 > totalTestSkill2) {
            console.log(`${charactere1.NOME} ✅ Marcou um ponto!`);
            charactere1.PONTOS++;
        }else if(totalTestSkill2 > totalTestSkill1) {
            console.log(`${charactere2.NOME} ✅ Marcou um ponto!`);
            charactere2.PONTOS++;
        }

        console.log("---------------------------------------------------------")

    }
}

async function declareWinner(charactere1, charactere2) {
    console.log("Resultado Final: \n")
    console.log(`${charactere1.NOME}: ${charactere1.PONTOS} ponto(s)`);
    console.log(`${charactere2.NOME}: ${charactere2.PONTOS} ponto(s)`);

    if(charactere1.PONTOS > charactere2.PONTOS) {
        console.log(`\n🏆 Parabéns, ${charactere1.NOME} venceu a corrida!`);
    }else if(charactere2.PONTOS > charactere1.PONTOS) {
        console.log(`\n🏆 Parabéns, ${charactere2.NOME} venceu a corrida!`);
    }else{
        console.log(`\n🤝 A corrida terminou empatada!`);
    }
}

(async function main() {
    console.log(`🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})(); //função auto-invocada