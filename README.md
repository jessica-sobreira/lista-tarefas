# Lista de Tarefas

![screencapture-lista-tarefas-mocha-vercel-app-2023-11-22-10_31_55](https://github.com/jessica-sobreira/lista-tarefas/assets/117686537/84dd187a-40df-4366-b4ba-c9921d2fd446)


O código representa uma aplicação de lista de tarefas desenvolvida em React. Aqui estão os principais pontos:

## Estados e Inicialização
- Utiliza o hook `useState` para gerenciar o estado das tarefas, filtro de texto, tipo de ordenação e filtro por status.
- Inicializa as tarefas a partir do armazenamento local ou com tarefas padrão, caso não haja nenhuma.

## Efeitos
- Utiliza o hook `useEffect` para persistir as tarefas no armazenamento local sempre que há uma alteração no estado de tarefas.
- Inicializa as tarefas iniciais utilizando outro efeito `useEffect`.

## Refs
- Utiliza a ref `inputRef` para referenciar o input de adição de tarefas.

## Funções
- `addTask`: Adiciona uma nova tarefa à lista, verificando se o texto não está vazio.
- `toggleTask`: Altera o status de conclusão de uma tarefa.
- `removeTask`: Remove uma tarefa da lista.
- `startEditing` e `finishEditing`: Inicia e finaliza o modo de edição de uma tarefa.
- `sortTasks` e `filterTasksByStatus`: Funções utilitárias para ordenar e filtrar tarefas.

## Memoização
- Utiliza o hook `useMemo` para memoizar a lista de tarefas filtradas e ordenadas, evitando reexecução desnecessária.

## Renderização
- Apresenta a interface da lista de tarefas, incluindo input de adição, filtro de texto, opções de ordenação e filtro por status.
- Mostra a lista de tarefas em uma `<ul>`, permitindo edição de texto, conclusão, remoção e aplicação de estilos de acordo com o status.

---

*Este código representa uma aplicação funcional de lista de tarefas em React, utilizando diversos hooks e técnicas para melhorar performance e manutenção.*
