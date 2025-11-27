import { useMemo, useState } from 'react'
import useLocalStorage from "./hooks/useLocalStorage";
import CustomForm from "./components/CustomForm.jsx";
import EditForm from "./components/EditForm.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher.jsx";
import TaskFilter from "./components/TaskFilter/TaskFilter.jsx";

function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', [])
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState('all');

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name }
        : t
    )))
    closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.checked);
      case 'completed':
        return tasks.filter(task => task.checked);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <div className="container">
      <header>
        <h1>My To Do List</h1>
      </header>

      {isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }

      <CustomForm addTask={addTask} />

      <TaskFilter
        tasks={tasks}
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      {tasks &&
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      }

      <ThemeSwitcher />
    </div>
  )
}

export default App
