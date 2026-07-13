/**
 * EcoTrip - Ponto de Entrada e Orquestração do Sistema
 * Gerencia o ciclo de vida da aplicação, escuta eventos e conecta a UI aos Cálculos.
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-calculadora');
    const selectModelo = document.getElementById('selecao-modelo');

    // 1. Inicializa o comportamento dinâmico de filtrar modelos por veículo
    EcoUI.inicializarFiltroVeiculos();

    // 2. Monitora o disparo de simulação do formulário
    form.addEventListener('submit', (evento) => {
        // Previne o recarregamento padrão da página
        evento.preventDefault();

        // 3. Captura os dados da rota diretamente do utilitário de rotas
        const dadosRota = RotasSustentaveis.obterDadosDaRota('selecao-rota');
        if (!dadosRota) {
            alert('Por favor, selecione uma rota válida.');
            return;
        }

        // 4. Captura os atributos de engenharia do modelo selecionado no HTML
        const modeloSelecionado = selectModelo.options[selectModelo.selectedIndex];
        if (!modeloSelecionado || modeloSelecionado.disabled) {
            alert('Por favor, selecione um modelo específico.');
            return;
        }

        const fatorEmissao = parseFloat(modeloSelecionado.getAttribute('data-emissao'));
        const velocidadeMedia = parseFloat(modeloSelecionado.getAttribute('data-velocidade'));

        // 5. Executa o fluxo de processamento matemático
        const tempoViagem = EcoCalculator.calcularTempo(dadosRota.distancia, velocidadeMedia);
        const emissaoTotal = EcoCalculator.calcularEmissao(dadosRota.distancia, fatorEmissao);
        const recuperacaoEcologica = EcoCalculator.calcularRecuperacao(emissaoTotal);

        // 6. Consolida o pacote de telemetria
        const pacoteResultados = {
            distancia: dadosRota.distancia,
            nomeRota: dadosRota.nome,
            tempo: tempoViagem,
            emissao: emissaoTotal,
            recuperacao: recuperacaoEcologica
        };

        // 7. Envia os dados limpos para a interface renderizar na tela
        EcoUI.exibirResultados(pacoteResultados);
    });
});