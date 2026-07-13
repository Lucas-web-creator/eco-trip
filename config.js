/**
 * EcoTrip - Parâmetros e Diretrizes de Engenharia Climática
 * Define as constantes globais de impacto ambiental e limites de alerta.
 */

const ECO_CONFIG = {
    // Fator de absorção média de uma árvore nativa em crescimento (Mata Atlântica/EPA)
    // Uma árvore absorve cerca de 20 kg de CO2 por ano.
    ABSORCAO_CO2_ARVORE_ANO: 20,

    // Limites de emissão (em kg) para determinar a gravidade do impacto na interface
    LIMITES_IMPACTO: {
        ALERTA: 30,    // Acima disso, o impacto é considerado moderado (Alerta)
        CRITICO: 100   // Acima disso, o impacto é considerado severo (Urgente)
    },

    // Mensagens de efeitos climáticos injetadas dinamicamente com base na gravidade
    MENSAGENS_EFEITO: {
        LEVE: "Impacto mitigável. Gases de efeito estufa com baixa retenção na troposfera local.",
        ALERTA: "Alerta de pegada ecológica. Volume considerável de gases poluentes retidos na atmosfera.",
        CRITICO: "Impacto crítico severo. Alta concentração de poluentes que agravam as ilhas de calor urbanas."
    }
};