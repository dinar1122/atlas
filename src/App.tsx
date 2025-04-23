import "./App.css";
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import TaskSection from "./app/components/TaskSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { moveTask } from "./features/tasks/tasksSlice";

export const App = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const dispatch = useDispatch();
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      dispatch(moveTask({
        taskId: active.id as number,
        sourceStatusId: active.data.current?.statusId,
        targetStatusId: over.data.current?.statusId,
      }));
    }
  };
  
  const pendingTasks = tasks.filter(task => task.statusId === 0); // В ожидании
  const inProgressTasks = tasks.filter(task => task.statusId === 1); // В работе
  const completedTasks = tasks.filter(task => task.statusId === 2); // закончены

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="App">
        <TaskSection tasks={pendingTasks} title="В ожидании" statusId={0} />
        <TaskSection tasks={inProgressTasks} title="В работе" statusId={1} />
        <TaskSection tasks={completedTasks} title="Готово" statusId={2} />
      </div>
    </DndContext>
  );
};