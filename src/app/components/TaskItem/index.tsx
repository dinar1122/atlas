import "./style.css"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Task } from "../../assets/types"
import circleIcon from "../../assets/Circle.svg"
import Lozenge from "@atlaskit/lozenge"
import DeleteIcon from "@atlaskit/icon/core/delete"
import EditIcon from "@atlaskit/icon/core/edit"
import PersonIcon from "@atlaskit/icon/core/person"
import Button from "@atlaskit/button/new"
import { IconButton } from "@atlaskit/button/new"
import { useState } from "react"
import {
  editAuthorName,
  editTaskName,
} from "../../../features/tasks/tasksSlice"
import { useDispatch } from "react-redux"
import { EditForm } from "../EditForm"


interface TaskItemProps {
  index?: number
  task: Task
  onDelete?: (id: number) => void
  name: string
  status: string
}

const TaskItem = ({
  index = 0,
  status,
  name,
  task,
  onDelete = () => {},
}: TaskItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id ?? "",
      data: { statusId: task.statusId },
    })
  const dispatch = useDispatch()


  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (task.id) onDelete(task.id)
  }

  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingAuthor, setIsEditingAuthor] = useState(false)

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging ? 100 : 1,
    width: isDragging ? `400px` : ``,
    position: isDragging ? "fixed" : "relative",
    top: isDragging ? `${180 * Math.min(index, 4)}px` : `0`,
    opacity: isDragging ? 0.8 : 1,
    boxShadow: isDragging ? "0 5px 15px rgba(0,0,0,0.3)" : "none",
  }


  const handleEditName = (newName: string) => {
    if (task.id && newName) {
      dispatch(editTaskName({ taskId: task.id, taskName: newName }))
    }
    setIsEditingName(false)
  }

  const handleEditAuthor = (newAuthor: string) => {
    if (task.id && newAuthor) {
      dispatch(editAuthorName({ taskId: task.id, authorName: newAuthor }))
    }
    setIsEditingAuthor(false)
  }

  return (
    <div style={style} className="task-item-wrapper">
      <div
        ref={setNodeRef}
        style={{}}
        {...attributes}
        {...listeners}
        className="TaskItem"
      >
        <div className="TaskItem-header">
          <div className="TaskItem-header-info">
            <div className="task-icon">
              <img width={16} height={16} src={circleIcon} />
            </div>
            {!isEditingName ? (
              <span className="TaskItem-title" style={{ cursor: "pointer" }}>
                {task.taskName || "Новая задача"}
              </span>
            ) : (
              <EditForm
                placeholder="Название задачи"
                fieldName="taskName"
                initialValue={task.taskName}
                onSave={handleEditName}
                onCancel={() => setIsEditingName(false)}
                validationRules={{
                  required: "Обязательно",
                  minLength: { value: 3, message: "Минимум 3 символа" },
                }}
              />
            )}
          </div>
        </div>
        {name && (
          <div className="TaskItem-main">
            <div className="avatar">
              <span className="avatar-text">{name?.[0]}</span>
            </div>
            <span>{name}</span>
          </div>
        )}

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
        <IconButton
          label="delete"
          appearance="subtle"
          icon={EditIcon}
          onClick={() => setIsEditingName(prev => !prev)}
        />
        <IconButton
          label="delete"
          appearance="subtle"
          icon={DeleteIcon}
          onClick={handleDelete}
        />
      </div>
      {!name && !isEditingAuthor && (
        <div className="">
          <Button
            iconBefore={PersonIcon}
            appearance="subtle"
            title="Добавить ответственного"
            onClick={() => setIsEditingAuthor(prev => !prev)}
          >
            Добавить ответственного
          </Button>
        </div>
      )}
      {isEditingAuthor && (
        <EditForm
          placeholder="Имя ответственного"
          fieldName="authorName"
          initialValue={task.authorName}
          onSave={handleEditAuthor}
          onCancel={() => setIsEditingAuthor(false)}
          validationRules={{
            required: "Обязательно",
            minLength: { value: 3, message: "Минимум 3 символа" },
          }}
        />
      )}
    </div>
  )
}

export default TaskItem
