import { useForm } from "react-hook-form"
import { addTask } from "../../../features/tasks/tasksSlice"
import { useDispatch } from "react-redux"
import { Task } from "../../assets/types"

type TaskFormData = Omit<Task, "id">

export const TaskForm = ({ statusId = 0 }) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>()

  const onSubmit = (data: TaskFormData) => {
    dispatch(addTask({ ...data, statusId }))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Название задачи</label>
        <input
          {...register("taskName", {
            required: "Название обязательно",
            minLength: { value: 3, message: "Минимум 3 символа" },
          })}
        />
        {errors.taskName && <span>{errors.taskName.message}</span>}
      </div>

      <div>
        <label>Автор</label>
        <input {...register("assignee", { required: "Укажите автора" })} />
      </div>

      <button type="submit">Добавить задачу</button>
    </form>
  )
}
