/**
 * EcoTrip - Motor Matemático e Computação Ambiental
 * Executa as equações de física de deslocamento e métricas de impacto ecológico.
 */

const EcoCalculator = {
    /**
     * Calcula o tempo estimado de viagem baseado na distância e velocidade.
     * @param {number} distancia - Distância em km.
     * @param {number} velocidade - Velocidade média em km/h.
     * @returns {Object} Objeto contendo o total de horas e minutos formatados.
     */
    calcularTempo(distancia, velocidade) {
        if (!distancia || !velocidade) return { horas: 0, minutos: 0 };
        
        const tempoTotalHoras = distancia / velocidade;
        const horas = Math.floor(tempoTotalHoras);
        const minutos = Math.round((tempoTotalHoras - horas) * 60);
        
        return { horas, minutos };
    },

    /**
     * Calcula a massa total de CO2 emitida em kg.
     * @param {number} distancia - Distância em km.
     * @param {number} fatorEmissao - Fator de emissão em g/km.
     * @returns {number} Massa de CO2 em kg (arredondada em duas casas decimais).
     */
    calcularEmissao(distancia, fatorEmissao) {
        if (!distancia || !fatorEmissao) return 0;
        
        // Equação: (km * g/km) / 1000 = kg de CO2
        const emissaoKg = (distancia * fatorEmissao) / 1000;
        return parseFloat(emissaoKg.toFixed(2));
    },

    /**
     * Calcula o passivo ambiental: quantidade de árvores e o tempo de recuperação biológica.
     * @param {number} emissaoKg - Massa de CO2 calculada em kg.
     * @returns {Object} Árvores necessárias e tempo de recuperação passiva em anos.
     */
    calcularRecuperacao(emissaoKg) {
        if (emissaoKg <= 0) return { arvores: 0, anosRecuperacao: 0 };

        // 1. Árvores necessárias para compensar em 1 ano (Massa CO2 / absorção anual de 1 árvore)
        const arvoresNecessarias = Math.ceil(emissaoKg / ECO_CONFIG.ABSORCAO_CO2_ARVORE_ANO);

        /**
         * 2. Tempo de Recuperação Passiva (Anos): 
         * Se o usuário não plantar árvores novas, estimamos o tempo que a infraestrutura 
         * vegetal local existente levaria para digerir esse excedente com base em uma 
         * escala proporcional de estresse ambiental.
         */
        let anosRecuperacao = parseFloat((emissaoKg / ECO_CONFIG.ABSORCAO_CO2_ARVORE_ANO).toFixed(1));
        
        // Garante um piso mínimo de tempo para emissões reais
        if (anosRecuperacao < 1 && emissaoKg > 0) {
            anosRecuperacao = 0.5; 
        }

        return {
            arvores: arvoresNecessarias,
            anosRecuperacao: anosRecuperacao
        };
    }
};