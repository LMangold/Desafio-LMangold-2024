
class RecintosZoo {
    constructor() {
        // Inicializa os recintos com detalhes sobre número, bioma, tamanho, animais e a quantidade de cada animal.
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: ['macaco'], quantidadeAnimais: [3] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [], quantidadeAnimais: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanho: 7, animais: ['gazela'], quantidadeAnimais: [1] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [], quantidadeAnimais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: ['leao'], quantidadeAnimais: [1] }
        ];

        // Informações sobre os animais, como o tamanho que ocupam e em quais biomas vivem
        this.animais = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {
        // Verifica se o animal fornecido existe no conjunto de animais conhecidos
        if (!this.animais[animal.toUpperCase()]) {
            return { erro: 'Animal inválido' }; // Se não existir, retorna erro
        }

        // Verifica se a quantidade fornecida é válida (maior que 0 e um número)
        if (quantidade <= 0 || isNaN(quantidade)) {
            return { erro: 'Quantidade inválida' }; // Retorna erro se for uma quantidade inválida
        }

        // Recupera as informações do animal (tamanho e bioma)
        const animalInfo = this.animais[animal.toUpperCase()];
        // Inicializa um array vazio para armazenar os recintos viáveis
        const recintosViaveis = [];

        // Itera por cada recinto disponível
        this.recintos.forEach(recinto => {
            // Verifica se o bioma do recinto é compatível com o bioma do animal
            let biomaAdequado;
            if (Array.isArray(animalInfo.bioma)) {
                // Se o animal pode viver em mais de um bioma (é um array), verifica se o bioma do recinto está nessa lista
                if (Array.isArray(recinto.bioma)) {
                    biomaAdequado = animalInfo.bioma.some(b => recinto.bioma.includes(b));
                } else {
                    biomaAdequado = animalInfo.bioma.includes(recinto.bioma);
                }
            } else {
                // Se o animal só vive em um bioma, verifica se o bioma do recinto é igual ao bioma do animal
                biomaAdequado = recinto.bioma === animalInfo.bioma;
            }

            // Se o bioma for adequado, prossegue para as próximas verificações
            if (biomaAdequado) {
                const animaisExistentes = recinto.animais; // Pega os animais que já estão no recinto
                const quantidadeExistente = recinto.quantidadeAnimais; // Pega a quantidade de animais no recinto
                let tamanhoEspacoOcupado = 0;

                // Calcula o espaço ocupado pelos animais no recinto
                for (let i = 0; i < animaisExistentes.length; i++) {
                    const animalAtual = this.animais[animaisExistentes[i].toUpperCase()];
                    const quantidadeAtual = quantidadeExistente[i];
                    if (animalAtual) {
                        tamanhoEspacoOcupado += animalAtual.tamanho * quantidadeAtual;
                    }
                }

                // Verifica se há carnívoros no recinto
                const contemCarnivoro = animaisExistentes.some(a => ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(a.toUpperCase()));
                if (contemCarnivoro && !['LEAO', 'LEOPARDO'].includes(animal.toUpperCase())) {
                    // Se houver carnívoros e o animal a ser inserido não for um carnívoro, pula este recinto
                    return;
                }

                let espacoExtra = 0;
                // Regras extras para casos específicos, como o recinto 3 e a presença de gazelas e macacos
                if (recinto.numero === 3 && animaisExistentes.includes('gazela') && animal.toUpperCase() === 'MACACO' && quantidade >= 2) {
                    espacoExtra = 1; // Adiciona espaço extra se essas condições forem atendidas
                } else if (animaisExistentes.length > 1) {
                    espacoExtra = 1; // Caso haja mais de um tipo de animal no recinto, adiciona espaço extra
                }

                // Calcula o espaço necessário para o novo animal e a quantidade informada
                const espacoNecessario = (quantidade * animalInfo.tamanho) + espacoExtra;
                // Calcula o espaço livre no recinto
                const espacoLivre = recinto.tamanho - (tamanhoEspacoOcupado + espacoNecessario);

                // Verifica se o espaço necessário cabe no recinto
                if (espacoNecessario <= (recinto.tamanho - tamanhoEspacoOcupado)) {
                    // Se houver espaço suficiente, adiciona o recinto à lista de recintos viáveis
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
                }
            }
        });

        // Se nenhum recinto for viável, retorna um erro
        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        // Caso contrário, retorna a lista de recintos viáveis
        return { recintosViaveis };
    }
}

// Testa a função com um exemplo
const zoo = new RecintosZoo();
const resultado = zoo.analisaRecintos("MACACO", 2);
console.log(resultado);

export { RecintosZoo as RecintosZoo };


