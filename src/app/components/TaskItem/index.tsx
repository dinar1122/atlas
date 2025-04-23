import "./style.css";
import demoDictionary from '../../assets/dictionay.json';
import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import { Dictionary, Task } from "../../assets/types";


const typedDictionary = demoDictionary as Dictionary;

interface TaskItemProps {
  task: Task;
  onDelete?: (id: number) => void;
}

const TaskItem = ({ task, onDelete = () => {} }: TaskItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id || Date.now(),
    data: { statusId: task.statusId }
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 100 : 1,
    position: isDragging ? 'fixed' : 'relative',
    opacity: isDragging ? 0.8 : 1,
    boxShadow: isDragging ? '0 5px 15px rgba(0,0,0,0.3)' : 'none',
  };

  const assigneeName = typeof task.assigneeId === 'number' 
    ? typedDictionary.assignees[task.assigneeId.toString()]
    : typedDictionary.assignees[task.assigneeId];

  const statusName = typedDictionary.statuses[task.statusId];

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} 
      className="TaskItem"
    >
      <div className="TaskItem-header">
        <div className="TaskItem-header-info">
          <div>icon</div>
          <span className="TaskItem-title">{task.taskName}</span>
        </div>
        <div>
          <button onClick={() => task.id && onDelete(task.id)}>delete</button>
        </div>
      </div>
      <div className="TaskItem-main">
        <div>icon</div>
        <span>{assigneeName}</span>
      </div>
      <div className="TaskItem-status">{statusName}</div>
    </div>
  );
};

export default TaskItem;