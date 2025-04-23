import "./style.css"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Task } from "../../assets/types"
import circleIcon from "../../assets/Circle.svg"
import Lozenge from "@atlaskit/lozenge"
import DeleteIcon from "@atlaskit/icon/core/migration/delete--trash"
import Button from "@atlaskit/button/new"

interface TaskItemProps {
  task: Task
  onDelete?: (id: number) => void
  name: string
  status: string
}

const TaskItem = ({
  status,
  name,
  task,
  onDelete = () => {},
}: TaskItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id || Date.now(),
      data: { statusId: task.statusId },
    })

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if(task.id)
    onDelete(task.id)
  }

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging ? 100 : 1,
    position: isDragging ? "fixed" : "relative",
    opacity: isDragging ? 0.8 : 1,
    boxShadow: isDragging ? "0 5px 15px rgba(0,0,0,0.3)" : "none",
  }

  return (
    <div className="task-item-wrapper">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="TaskItem"
      >
        <div className="TaskItem-header">
          <div className="TaskItem-header-info">
            <div className="task-icon">
              <img width={16} height={16} src={circleIcon} />
            </div>
            <span className="TaskItem-title">{task.taskName}</span>
          </div>
        </div>
        <div className="TaskItem-main">
          <div className="avatar">
            <span className="avatar-text">{name?.[0]}</span>
          </div>
          <span>{name}</span>
        </div>

        <div className="TaskItem-status">
          <Lozenge
           isBold={true}
            appearance={
              task.statusId === 1
                ? "inprogress"
                : task.statusId === 2
                  ? "success"
                  : "default"
            }
          >
            {status}
          </Lozenge>
        </div>
      </div>
      <div className="delete-button-wrapper">
        <Button
          children=""
          appearance="subtle"
          iconBefore={DeleteIcon}
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}

export default TaskItem
