import "./style.css"
import CustomButton from "../customButton"
import TaskItem from "../TaskItem"
import { useCallback, useState } from "react"
import { Task } from "../../assets/types"
import {
  createEmptyTask,
  deleteTask,
  selectAssignees,
  selectStatuses,
} from "../../../features/tasks/tasksSlice"
import { useDispatch, useSelector } from "react-redux"
import { useDroppable } from "@dnd-kit/core"
import Lozenge from "@atlaskit/lozenge"

interface TaskSectionProps {
  title: string
  tasks: Task[]
  statusId: number
}

export const TaskSection = ({ title, tasks, statusId }: TaskSectionProps) => {
  const dispatch = useDispatch()

  const onDelete = useCallback(
    (id: number) => {
      dispatch(deleteTask(id))
    },
    [dispatch],
  )
  const onCreateEmpty = useCallback(
    (statusId: number) => {
      dispatch(createEmptyTask(statusId))
    },
    [dispatch],
  )

  const { setNodeRef } = useDroppable({
    id: statusId,
    data: { statusId },
  })

  const names = useSelector(selectAssignees)
  const statuses = useSelector(selectStatuses)

  

  return (
    <div ref={setNodeRef} className={`TaskSection-container`}>
      <div className="TaskSection-header">
        <Lozenge
          appearance={
            statusId === 1
              ? "inprogress"
              : statusId === 2
                ? "success"
                : "default"
          }
        >
          {title}
        </Lozenge>{" "}
        {tasks.length}
      </div>
      <div className={`TaskSection-main status-${statusId}`}>
        <div className="TaskSection-main-container">
          {tasks.map((task: Task, index: number) => {
            const name = names?.[task.assigneeId]
            const status = statuses?.[task.statusId]
            return (
              <TaskItem
                index={index}
                onDelete={onDelete}
                key={task.id}
                task={task}
                name={name}
                status={status}
              ></TaskItem>
            )
          })}
        </div>
        
        <CustomButton
          className={`button-status-${statusId}`}
          onClick={() => onCreateEmpty(statusId)}
        >
          Новая задача
        </CustomButton>
      </div>
    </div>
  )
}

export default TaskSection
