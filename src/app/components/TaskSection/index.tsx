import "./style.css"
import CustomButton from "../customButton"
import TaskItem from "../TaskItem"
import { useCallback, useState } from "react"
import { TaskForm } from "../TaskForm"
import { Task } from "../../assets/types"
import { deleteTask } from "../../../features/tasks/tasksSlice"
import { useDispatch } from "react-redux"
import { useDroppable } from "@dnd-kit/core"

interface TaskSectionProps {
  title: string
  tasks: Task[]
  statusId: number
}

export const TaskSection = ({ title, tasks, statusId }: TaskSectionProps) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(false)

  const onDelete = useCallback(
    (id: number) => {
      dispatch(deleteTask(id))
    },
    [dispatch],
  )

  const { setNodeRef } = useDroppable({
    id: statusId,
    data: { statusId },
  })

  return (
    <div ref={setNodeRef} className="TaskSection-container">
      <div className="TaskSection-header">
        {title} {tasks.length}
      </div>
      <div className="TaskSection-main">
        <div className="TaskSection-main-container">
          {tasks.map((task: Task) => (
            <TaskItem onDelete={onDelete} key={task.id} task={task}></TaskItem>
          ))}
        </div>
        {form && <TaskForm statusId={statusId} />}
        <CustomButton onClick={() => setForm(prev => !prev)}>
          Новая задача
        </CustomButton>
      </div>
    </div>
  )
}

export default TaskSection
