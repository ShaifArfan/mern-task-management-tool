import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './TaskItem.module.scss';

export interface Task {
	id: number;
	title: string;
	completed: boolean;
}

interface TaskItemProps {
	task: Task;
	deleteTask: (id: number) => void;
}

function TaskItem({ task, deleteTask }: TaskItemProps) {
	const [isCompleted, setIsCompleted] = useState(task.completed);
	const [isLoading, setIsLoading] = useState(false);

	const handleCheckboxClick = async () => {
		try {
			setIsLoading(true);
			await axios.put(`/api/tasks/${task.id}`, {
				completed: !isCompleted,
			});
			setIsCompleted(!isCompleted);
			toast.success('Task updated successfully');
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<tr className={classes.task_item}>
			<td className={classes.task_name}>
				<div className={classes.checkbox}>
					<input
						type="checkbox"
						checked={isCompleted}
						disabled={isLoading}
						onChange={handleCheckboxClick}
					/>
				</div>
				<p>{task.title}</p>
			</td>
			<td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
			{/* forgot to add created at column */}
			<td>{moment().format('MMM Do YY')}</td>
			<td>
				<button
					type="button"
					className={classes.deleteBtn}
					onClick={() => deleteTask(task.id)}
				>
					Delete
				</button>
			</td>
		</tr>
	);
}

export default TaskItem;
