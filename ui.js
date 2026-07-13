/**
 * EcoTrip - Camada de Interface e Manipulação do DOM
 * Gerencia a renderização dos resultados, filtros dinâmicos e estados visuais.
 */

const EcoUI = {
    // Cache de elementos do DOM para otimização de performance
    elementos: {
        veiculo: document.getElementById('selecao-veiculo'),
        modelo: document.getElementById('selecao-modelo'),
        resultados: document.getElementById('secao-resultados'),
        solucoes: document.getElementById('secao-solucoes'),
        tempo: document.getElementById('resultado-tempo'),
        co2: document.getElementById('resultado-co2'),
        recuperacao: document.getElementById('resultado-tempo-recuperacao'),
        descricaoEfeito: document.getElementById('efeito-descricao'),
        arvores: document.getElementById('solucao-arvores'),
        comparativo: document.getElementById('solucao-comparativo')
    },

    /**
     * Filtra dinamicamente o campo de modelos com base na categoria de veículo selecionada.
     */
    inicializarFiltroVeiculos() {
        const { veiculo, modelo } = this.elementos;

        veiculo.addEventListener('change', () => {
            const categoriaSelecionada = veiculo.value;

            if (!categoriaSelecionada) {
                modelo.disabled = true;
                modelo.value = "";
                return;
            }

            // Ativa o select de modelos
            modelo.disabled = false;
            
            // Vasculha todos os optgroups nativos do HTML
            const grupos = modelo.querySelectorAll('optgroup');
            let primeiraOpcaoVisivel = null;

            grupos.forEach(grupo => {
                // Se o grupo for do veículo selecionado, exibe nativamente. Se não, esconde.
                if (grupo.getAttribute('data-grupo') === categoriaSelecionada) {
                    grupo.style.display = "";
                    if (!primeiraOpcaoVisivel) {
                        primeiraOpcaoVisivel = grupo.querySelector('option');
                    }
                } else {
                    grupo.style.display = "none";
                }
            });

            // Auto-seleciona o primeiro modelo do grupo visível para melhorar a UX
            if (primeiraOpcaoVisivel) {
                modelo.value = primeiraOpcaoVisivel.value;
            }
        });
    },

    /**
     * Atualiza a interface gráfica com os resultados processados e os cartões de alerta.
     */
    exibirResultados(dados) {
        const { resultados, solucoes, tempo, co2, recuperacao, descricaoEfeito, arvores, comparativo } = this.elementos;

        // 1. Injeta os dados brutos nos respectivos campos
        tempo.textContent = `${dados.tempo.horas}h ${dados.tempo.minutos}min`;
        co2.textContent = `${dados.emissao.toLocaleString('pt-BR')} kg`;
        
        // Formata o tempo de recuperação (plural ou singular)
        recuperacao.textContent = dados.recuperacao.anosRecuperacao === 1 
            ? "1 ano" 
            : `${dados.recuperacao.anosRecuperacao.toLocaleString('pt-BR')} anos`;

        arvores.textContent = dados.recuperacao.arvores === 1
            ? "1 árvore nativa"
            : `${dados.recuperacao.arvores.toLocaleString('pt-BR')} árvores nativas`;

        // 2. Determina a gravidade do impacto e altera as classes CSS dinamicamente
        const cardCo2 = co2.closest('.card-resultado');
        const cardRecuperacao = recuperacao.closest('.card-resultado');

        // Reseta estados anteriores
        cardCo2.className = "card-resultado";
        cardRecuperacao.className = "card-resultado";

        if (dados.emissao >= ECO_CONFIG.LIMITES_IMPACTO.CRITICO) {
            cardCo2.classList.add('Alerta');
            cardRecuperacao.classList.add('Urgente');
            descricaoEfeito.textContent = ECO_CONFIG.MENSAGENS_EFEITO.CRITICO;
        } else if (dados.emissao >= ECO_CONFIG.LIMITES_IMPACTO.ALERTA) {
            cardCo2.classList.add('Alerta');
            descricaoEfeito.textContent = ECO_CONFIG.MENSAGENS_EFEITO.ALERTA;
        } else {
            descricaoEfeito.textContent = ECO_CONFIG.MENSAGENS_EFEITO.LEVE;
        }

        // 3. Renderiza uma alternativa inteligente de mobilidade para o usuário
        if (dados.emissao === 0) {
            comparativo.textContent = "Parabéns! Sua escolha de transporte atual não gera passivo de carbono na atmosfera.";
        } else {
            comparativo.textContent = `Se você realizasse essa mesma jornada de ${dados.distancia} km utilizando uma alternativa sustentável, como um Metrô ou Carro Elétrico, sua emissão poderia cair para menos de ${(dados.distancia * 0.03).toFixed(1)} kg de CO₂.`;
        }

        // 4. Remove a classe que esconde as seções de feedback
        resultados.classList.remove('escondido');
        solucoes.classList.remove('escondido');
        
        // Rola a página suavemente para o início do diagnóstico
        resultados.scrollIntoView({ behavior: 'smooth' });
    }
};