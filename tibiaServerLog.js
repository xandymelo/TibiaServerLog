"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJSON = exports.getOutputData = void 0;
var fs = require("fs");
// Função para ler um arquivo de texto
function readTextFile(caminhoArquivo) {
    return new Promise(function (resolve, reject) {
        fs.readFile(caminhoArquivo, 'utf-8', function (err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
function getOutputData(text) {
    var outputData = {
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
    var lines = text.split('\n');
    lines.forEach(function (line) {
        line = line.substring(5); // remover o horário
        if (line.includes("healed yourself")) {
            outputData.hitpointsHealed += parseInt(line.substring(24).replace(" hitpoints.", ''));
        }
        else if (line.includes("You lose")) {
            var valueTaken = parseInt(line.replace(/\D/g, ''));
            outputData.damageTaken.total += valueTaken;
            if (line.includes("by")) {
                var words = line.split(" ").filter(Boolean);
                var creatureKind = words[words.length - 1].replace(".", "");
                if (outputData.damageTaken.byCreatureKind[creatureKind] == undefined) {
                    outputData.damageTaken.byCreatureKind[creatureKind] = 0;
                }
                outputData.damageTaken.byCreatureKind[creatureKind] += valueTaken;
            }
            else {
                outputData.damageTaken.totalUnknown += valueTaken;
            }
        }
        else if (line.includes("You gained")) {
            outputData.experienceGained += parseInt(line.replace(/\D/g, ''));
        }
        else if (line.includes("Loot of")) {
            var words = line.split(":").filter(Boolean);
            var itemList = words[words.length - 1].replace(".", "").split(",");
            itemList.forEach(function (string) {
                var name = string.replace(/\d+/g, '').replace("a ", "").trim();
                if (name == "nothing") {
                    return;
                }
                else if (name == "gold coin" || name == "gold coins") {
                    name = "gold";
                }
                var quantity = isNaN(parseInt(string.replace(/\D/g, ''))) ? 1 : parseInt(string.replace(/\D/g, ''));
                if (outputData.loot[name] == undefined) {
                    outputData.loot[name] = 0;
                }
                outputData.loot[name] += quantity;
            });
        }
        else if (line.includes("A Black Knight loses")) {
            outputData.blackKnightHealth += parseInt(line.replace(/\D/g, ''));
        }
    });
    return outputData;
}
exports.getOutputData = getOutputData;
function generateJSON() {
    var path = 'Server_Log_1_1.txt';
    return readTextFile(path)
        .then(function (conteudo) {
        return getOutputData(conteudo);
    });
}
exports.generateJSON = generateJSON;
generateJSON().then(function (result) { });
"\n{\n  hitpointsHealed: 8048,\n  damageTaken: {        \n    total: 7683,        \n    totalUnknown: 2137, \n    byCreatureKind: {   \n      cyclops: 101,     \n      ghoul: 2,\n      smith: 29,        \n      soldier: 17,\n      dragon: 2427,\n      wyvern: 47,\n      scorpion: 470,\n      lord: 1770,\n      bonelord: 234,\n      Knight: 449\n    }\n  },\n  experienceGained: 31363,\n  loot: {\n    gold: 1177,\n    'cyclops trophy': 1,\n    'cyclops toe': 1,\n    meat: 6,\n    hatchet: 2,\n    letter: 1,\n    'dragon ham': 26,\n    'plate legs': 3,\n    'strong health potion': 1,\n    'steel shield': 4,\n    crossbow: 2,\n    'green dragon leather': 1,\n    'steel helmet': 2,\n    'small diamond': 2,\n    ham: 1,\n    'copper shield': 1,\n    'leather legs': 1,\n    bolts: 7,\n    'soldier helmet': 2,\n    'white mushrooms': 2,\n    pick: 1,\n    'scorpion tail': 3,\n    'burst arrows': 2,\n    \"dragon's tail\": 3,\n    'royal spear': 1,\n    longsword: 2,\n    bone: 1,\n    spellbook: 1,\n    'two handed sword': 1\n  },\n  blackKnightHealth: 1800\n}\n";
