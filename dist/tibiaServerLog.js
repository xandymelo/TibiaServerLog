"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJSON = exports.getOutputData = void 0;
const fs = require("fs");
// Função para ler um arquivo de texto
function readTextFile(caminhoArquivo) {
    return new Promise((resolve, reject) => {
        fs.readFile(caminhoArquivo, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
function getOutputData(text) {
    var playerData = {
        hitpointsHealed: 0,
        damageTaken: {
            total: 0,
            totalUnknown: 0,
            byCreatureKind: {}
        },
        experienceGained: 0,
        loot: {},
        blackKnightHealth: 0
    };
    const lines = text.split('\n');
    lines.forEach((line) => {
        line = line.substring(5); // remover o horário
        if (line.includes("healed yourself")) {
            playerData.hitpointsHealed += parseInt(line.substring(24).replace(" hitpoints.", ''));
        }
        else if (line.includes("You lose")) {
            const valueTaken = parseInt(line.replace(/\D/g, ''));
            playerData.damageTaken.total += valueTaken;
            if (line.includes("by")) {
                var words = line.split(" ").filter(Boolean);
                var creatureKind = words[words.length - 1].replace(".", "");
                if (playerData.damageTaken.byCreatureKind[creatureKind] == undefined) {
                    playerData.damageTaken.byCreatureKind[creatureKind] = 0;
                }
                playerData.damageTaken.byCreatureKind[creatureKind] += valueTaken;
            }
            else {
                playerData.damageTaken.totalUnknown += valueTaken;
            }
        }
        else if (line.includes("You gained")) {
            playerData.experienceGained += parseInt(line.replace(/\D/g, ''));
        }
        else if (line.includes("Loot of")) {
            var words = line.split(":").filter(Boolean);
            var itemList = words[words.length - 1].replace(".", "").split(",");
            itemList.forEach((string) => {
                var name = string.replace(/\d+/g, '').replace("a ", "").trim();
                if (name == "nothing") {
                    return;
                }
                else if (name == "gold coin" || name == "gold coins") {
                    name = "gold";
                }
                const quantity = isNaN(parseInt(string.replace(/\D/g, ''))) ? 1 : parseInt(string.replace(/\D/g, ''));
                if (playerData.loot[name] == undefined) {
                    playerData.loot[name] = 0;
                }
                playerData.loot[name] += quantity;
            });
        }
        else if (line.includes("A Black Knight loses")) {
            playerData.blackKnightHealth += parseInt(line.replace(/\D/g, ''));
        }
    });
    return playerData;
}
exports.getOutputData = getOutputData;
function generateJSON() {
    const path = 'Server_Log_1_1.txt';
    return readTextFile(path)
        .then((conteudo) => {
        return getOutputData(conteudo);
    });
}
exports.generateJSON = generateJSON;
generateJSON().then((result) => console.log(result));
`
  {
    hitpointsHealed: 8048,
    damageTaken: {
      total: 7683,
      totalUnknown: 2137,
      byCreatureKind: {
        cyclops: 101,
        ghoul: 2,
        smith: 29,
        soldier: 17,
        dragon: 2427,
        wyvern: 47,
        scorpion: 470,
        lord: 1770,
        bonelord: 234,
        Knight: 449
      }
    },
    experienceGained: 31363,
    loot: {
      gold: 1177,
      'cyclops trophy': 1,
      'cyclops toe': 1,
      meat: 6,
      hatchet: 2,
      letter: 1,
      'dragon ham': 26,
      'plate legs': 3,
      'strong health potion': 1,
      'steel shield': 4,
      crossbow: 2,
      'green dragon leather': 1,
      'steel helmet': 2,
      'small diamond': 2,
      ham: 1,
      'copper shield': 1,
      'leather legs': 1,
      bolts: 7,
      'soldier helmet': 2,
      'white mushrooms': 2,
      pick: 1,
      'scorpion tail': 3,
      'burst arrows': 2,
      "dragon's tail": 3,
      'royal spear': 1,
      longsword: 2,
      bone: 1,
      spellbook: 1,
      'two handed sword': 1
    },
    blackKnightHealth: 1800
  }
`;
