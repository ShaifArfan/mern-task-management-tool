import axios from 'axios';
import { useState, useEffect, FormEvent } from 'react';

import toast from 'react-hot-toast';
import TaskItem, { Task } from './TaskItem';
import classes from './TaskList.module.scss';

function TaskList() {
	const [taskList, setTaskList] = useState<Task[]>([]);
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [newTask, setNewTask] = useState('');

	const getTasks = async () => {
		try {
			const { data }: { data: Task[] } = await axios.get(`/api/tasks/mytasks`);
			setTaskList(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getTasks();
	}, []);

	const addNewButtonClick = () => {
		setIsAddingNew(!isAddingNew);
	};

	const addNewTask = async (e: FormEvent) => {
		e.preventDefault();
		if (newTask.length <= 0) {
			toast.error('Task is empty');
			return;
		}
		try {
			const { data } = await axios.post(`/api/tasks/`, {
				title: newTask,
			});
			toast.success('New task added');
			setIsAddingNew(false);
			setNewTask('');
			setTaskList([{ ...data }, ...taskList]);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteTask = async (id: number) => {
		try {
			await axios.delete(`/api/tasks/${id}`);
			toast.success('Task deleted');
			setTaskList(taskList.filter(task => task.id !== id));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div className={classes.topBar}>
				<button
					type="button"
					className={classes.addNew}
					onClick={addNewButtonClick}
				>
					Add New
				</button>
			</div>
			{isAddingNew && (
				<form className={classes.addNewForm} onSubmit={addNewTask}>
					<input
						type="text"
						value={newTask}
						onChange={e => setNewTask(e.target.value)}
						placeholder="Task name"
						autoFocus
					/>
					<button type="submit">Add</button>
				</form>
			)}
			{taskList.length > 0 ? (
				<table className={classes.taskList_table}>
					<tbody>
						{taskList.map(task => (
							<TaskItem key={task.id} task={task} deleteTask={deleteTask} />
						))}
					</tbody>
				</table>
			) : (
				'No Task Found. Create a new task'
			)}
		</div>
	);
}

export default TaskList;
