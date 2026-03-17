# Minha Lista de Tarefas 📝

Um aplicativo de Lista de Tarefas (To-Do List) dinâmico, elegante e prático, construído com foco irrestrito na experiência do usuário (UX) e visual moderno (UI). Utiliza uma paleta de cores pastéis bem harmonizada, efeitos translúcidos e interação imersiva de arrastar e soltar (drag-and-drop).

## ✨ Funcionalidades

- **Adição de Tarefas Rápida**: Crie tarefas proativamente controladas por um limite inteligente de 60 caracteres.
- **Ranking de Prioridades Dinâmico**: A posição de uma tarefa na lista define a sua importância, evidenciada no visual marcante de etiqueta (badge) da atividade (Ex: 1º, 2º, 3º). O ranking se reajusta automaticamente ao haver mudanças no painel.
- **Arrastar e Soltar (Drag & Drop)**: Graças a tecnologia do *SortableJS*, as atividades podem ter seus níveis de prioridades trocados livremente, podendo ser clicadas e arrastadas tanto em computadores quanto em celulares usando qualquer espaço livre da atividade.
- **Histórico Completo**: Suas tarefas marcadas como concluídas saem da área de atenção e repousam no final da tela num histórico. Cada atividade lá registra o horário exato da conclusão e pode retornar (função desfazer) à lista de pendências quando quiser.
- **Alertas Vistosos e Responsivos**:
  - Exibição de um *pop-up* em tempo real assim que atingir a capacidade de digitação máxima de uma demanda.
  - Alerta limitando a carga de trabalho com um "Aviso de Limite de Tarefas".
- **Estatísticas em Tempo Real**: Mostrador dinâmico contendo quantitativos para as tarefas Totais, Pendentes e Concluídas.
- **Design Adaptativo**: Inteiramente adaptado e agradável nativamente em navegadores de qualquer dimensão.

## 🛠️ Tecnologias Utilizadas

- **HTML5** & **CSS3**: Compõem a base visual do projeto.
- **JavaScript (Vanilla)**: Utilizado para gerenciar a lógica do negócio, atualização do DOM em tempo real, relógios e manipulação de arrays/contadores de estado.
- **[Bootstrap 5.3](https://getbootstrap.com/)**: Construção esquelética garantindo as grades flexíveis e alinhamentos milimétricos.
- **[SortableJS](https://sortablejs.github.io/Sortable/)**: Focado na capacidade de criar listas reorganizáveis através de arrastar e soltar com animações suaves interativas.
- **[FontAwesome 6](https://fontawesome.com/)**: Implementação dos ícones dos contadores de progresso e tarefas.
- **[Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)**: Tipografia clara, legível e atualizada.

## 🗂️ Estrutura Arquitetônica

- `index.html`: Toda a base que suporta os containers da lista, do form e exibe os scripts essenciais.
- `style.css`: Estilos customizados focado em um esquema de cores "Pink Pastel" muito acolhedor, mesclando classes customizadas por cima da padronização do framework web. 
- `scripts.js`: Coração de gerenciamento do estado dos inputs do formulário, lógica de ordenamento ranqueado (*badges* matemáticas dinâmicas) e instanciamento do drag/drop.

## 🚀 Como Instalar e Rodar Localmente

O projeto funciona estritamente no lado do cliente e todas as suas dependências bibliotecárias principais foram adicionadas estrategicamente via CDN para não onerar máquina alguma de instalação com gerenciadores de pacotes pesados como os em NodeJS.

1. Clone localmente os repositórios em sua máquina via terminal git.
2. Alternativamente você poderá baixar via arquivo ZIP usando o próprio link de download da página.
3. Extraídos os arquivos, você deverá apenas executar no seu navegador padrão (Google Chrome, Edge, Safari, Firefox), o arquivo raiz `index.html`. Alternativamente em ambientes de desenvolvimento utilize o *Live Server* de sua IDE de preferência.
