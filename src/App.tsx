import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

type Task = {
  id: number;
  text: string;
  completed: boolean;
  editing: boolean;
  createdAt: number;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('createdAt'); 
  const [filterByStatus, setFilterByStatus] = useState<string>('all'); 

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const initialTasks: Task[] = [
      { id: 1, text: 'Aprender HTML', completed: false, editing: false, createdAt: Date.now() },
      { id: 2, text: 'Aprender CSS', completed: true, editing: false, createdAt: Date.now() - 100000 },
    ];

    setTasks((prevTasks) => (prevTasks.length === 0 ? initialTasks : prevTasks));
  }, []);

  const addTask = useCallback(() => {
    if (inputRef.current) {
      const newTaskText = inputRef.current.value;
      if (newTaskText.trim() !== '') {
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            id: Date.now(), 
            text: newTaskText,
            completed: false,
            editing: false,
            createdAt: Date.now(),
          },
        ]);
        inputRef.current.value = '';
      }
    }
  }, []);

  const toggleTask = useCallback((taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const removeTask = useCallback((taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const startEditing = useCallback((taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, editing: true } : { ...task, editing: false }
      )
    );
  }, []);

  const finishEditing = useCallback((taskId: number, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, editing: false, text: newText } : task
      )
    );
  }, []);

  const sortTasks = (tasksToSort: Task[]) => {
    switch (sortBy) {
      case 'text':
        return tasksToSort.slice().sort((a, b) => a.text.localeCompare(b.text));
      case 'completed':
        return tasksToSort.slice().sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
      case 'createdAt':
        return tasksToSort.slice().sort((a, b) => b.createdAt - a.createdAt);
      default:
        return tasksToSort.slice().sort((a, b) => a.text.localeCompare(b.text));
    }
  };

  const filterTasksByStatus = (tasksToFilter: Task[]) => {
    switch (filterByStatus) {
      case 'completed':
        return tasksToFilter.filter((task) => task.completed);
      case 'pending':
        return tasksToFilter.filter((task) => !task.completed);
      default:
        return tasksToFilter;
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    const filteredTasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(filter.toLowerCase())
    );
    const filteredAndSorted = sortTasks(filteredTasks);
    return filterTasksByStatus(filteredAndSorted);
  }, [tasks, filter, sortBy, filterByStatus]);

  return (
    <div>
      <h1>Lista de Tarefas:</h1>
      <div>
        <input type="text" ref={inputRef} placeholder="Adicione uma nova tarefa" />
        <button className="add-task-button" onClick={addTask}>Adicionar Tarefa</button>
      </div>
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filtrar por texto"
        />
      </div>
      <div className="sort-container">
        <label>Ordenar por: </label>
        <button
          className={sortBy === 'createdAt' ? 'active' : ''}
          onClick={() => setSortBy('createdAt')}
        >
          Data de Criação
        </button>
        <button
          className={sortBy === 'text' ? 'active' : ''}
          onClick={() => setSortBy('text')}
        >
          Ordem Alfabética
        </button>
      </div>
      <div className="status-filter-container">
        <label>Filtrar por Status: </label>
        <button onClick={() => setFilterByStatus('all')}>Todas</button>
        <button onClick={() => setFilterByStatus('completed')}>Concluídas</button>
        <button onClick={() => setFilterByStatus('pending')}>Pendentes</button>
      </div>
      <ul className="tasks-list">
        {filteredAndSortedTasks.map((task) => (
          <li key={task.id}>
            {task.editing ? (
              <input
                type="text"
                defaultValue={task.text}
                onBlur={(e) => finishEditing(task.id, e.target.value)}
              />
            ) : (
              <span
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                onDoubleClick={() => startEditing(task.id)}
              >
                {task.text}
              </span>
            )}
            <div className="task-buttons">
            <button onClick={() => removeTask(task.id)}>Remover</button>
            <button onClick={() => toggleTask(task.id)}>Concluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
