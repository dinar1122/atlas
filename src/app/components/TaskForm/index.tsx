import { useForm } from "react-hook-form";
import { addTask } from "../../../features/tasks/tasksSlice";
import { useDispatch } from "react-redux";
import { Task } from "../../assets/types";
import './style.css';

type TaskFormData = Omit<Task, "id">;

export const TaskForm = ({setForm = () => {}, statusId = 0 }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>();

  const onSubmit = (data: TaskFormData) => {
    dispatch(addTask({ ...data, statusId }));
    reset();
    setForm()
  };

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="task-form__group">
        <input
          className="task-form__input"
          placeholder="Название задачи"
          {...register("taskName", {
            required: "Обязательно",
            minLength: { value: 3, message: "Минимум 3 символа" },
          })}
        />
        {errors.taskName && <span className="task-form__error">{errors.taskName.message}</span>}
      </div>

      <div className="task-form__group">
        <input
          className="task-form__input"
          placeholder="Автор"
          {...register("assignee", { required: "Обязательно" })}
        />
        
      </div>

      <button type="submit" className="task-form__submit">Добавить</button>
    </form>
  );
};