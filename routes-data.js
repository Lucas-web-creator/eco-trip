/**
 * EcoTrip - Banco de Dados e Utilitários de Rotas
 * Captura as informações das rotas reais mapeadas no HTML.
 */

const RotasSustentaveis = {
    /**
     * Obtém os dados da rota atualmente selecionada no elemento select do HTML.
     * @param {string} idSelect - O ID do elemento <select> de rotas.
     * @returns {Object|null} Objeto contendo nome e distância em km, ou null se inválido.
     */
    obterDadosDaRota(idSelect) {
        const select = document.getElementById(idSelect);
        if (!select) return null;

        const opcaoSelecionada = select.options[select.selectedIndex];
        
        // Se não houver opção válida ou for a opção padrão/vazia
        if (!opcaoSelecionada || !opcaoSelecionada.value) {
            return null;
        }

        // Puxa o atributo data-distancia convertido para número flutuante/inteiro
        const distanciaKm = parseFloat(opcaoSelecionada.getAttribute('data-distancia'));

        return {
            id: opcaoSelecionada.value,
            nome: opcaoSelecionada.text.split('|')[0].trim(), // Pega apenas o nome das cidades
            distancia: distanciaKm
        };
    }
};