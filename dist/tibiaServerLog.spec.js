"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tibiaServerLog_1 = require("./tibiaServerLog");
describe('generateJson', () => {
    it('deve gerar o JSON corretamente', () => {
        var mockServerLog = `
    18:46 You healed yourself for 282 hitpoints.
    18:46 You healed yourself for 22 hitpoints.
    `;
        const resultado = (0, tibiaServerLog_1.getOutputData)(mockServerLog);
        expect(resultado.hitpointsHealed).toBe(304);
    });
});
