import { ChangeEvent, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';
import { IoIosSave, IoIosWarning } from 'react-icons/io';
import { MdDelete, MdDeleteForever, MdEdit } from 'react-icons/md';
import { VscDiscard } from 'react-icons/vsc';
import { classNames, getRandStr, isEmpty, isString } from '../../../../utils';
import ReactIcon from '../../../partials';
import Button from '../../../partials/button';
import InputField from '../../../partials/inputField';
import Modal from '../../../partials/modal';

type ToDoItem = {
    id: string;
    text: string;
    completed: boolean;
}

const ToDo: FC<HTMLAttributes<HTMLDivElement>> = ({style, className, ...restProps}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: {isSubmitSuccessful}
    } = useForm<ToDoItem>();
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    // Lazy initialization: Read from localStorage only on first render
    const [todos, setTodos] = useState<ToDoItem[]>(getSavedToDos());
    const [editedIndex, setEditedIndex] = useState<number | null>(null);
    const [adding, setAdding] = useState<boolean>(false);
    const [deletingToDo, setDeletingToDo] = useState<string|null>(null);

    // Persist to localStorage whenever todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        if (isSubmitSuccessful) reset();
    }, [isSubmitSuccessful, reset]);

    const cancelButtonHandler = () => {
        setEditedIndex(null);
        setAdding(false);
        reset();
    };

    const onSubmit = (data: ToDoItem) => {
        if (!data.text?.trim()) return;

        let newTodos;

        if (editedIndex !== null) {
            const editedTodo = todos[editedIndex];
            newTodos = [...todos];
            newTodos.splice(editedIndex, 1, {...editedTodo, text: data.text.trim()});
        } else {
            const saved = getSavedToDos();
            let multiplier = 1;
            let id = getRandStr(3, 'abc');
            // eslint-disable-next-line no-loop-func
            while (saved.filter((t: ToDoItem) => t.id === id).length) {
                let m = multiplier;
                while (m > 0) {
                    id += `-${getRandStr(3, 'abc')}`;
                    m--;
                }
                multiplier++;
            }

            // crypto.randomUUID() <- Modern way to generate unique IDs
            newTodos = [...todos, {
                id,
                text: data.text.trim(),
                completed: false,
            }];
        }

        setTodos(newTodos);
        setEditedIndex(null);
        setAdding(false);
    };

    const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        isString(value, true) && !adding && setAdding(true);
        !isString(value, true) && adding && setAdding(false);
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    };

    const editTodo = (id: string) => {
        const index = todos.findIndex(t => t.id === id);
        if (index < 0) return;

        setEditedIndex(index);
        setValue('text', todos[index].text);
        inputRef.current?.focus();
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
        setDeletingToDo(null);
    };

    const handleDelete = (t: ToDoItem) => {
        if (!t.completed) setDeletingToDo(t.id);
        else deleteTodo(t.id);
    };

    function getSavedToDos() {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    }

    function parseNested(todo: string, id: string) {
        const toDos = todo.split('||');
        if (toDos.length < 2) return todo;

        const sup = toDos.shift();
        return <>
            {sup?.trim()}
            <ul className={'font-size-small'}>{toDos.map((t: string, i: number) => <li
                key={`${id}-${i}`}>{t.trim()}</li>)}</ul>
        </>;
    }

    const inputValue = getValues('text');

    return (
        <div className={classNames(className, 'background-light', 'box-shadow', 'border-radius-0p3', 'p-0p5')} {...restProps}>
            <div className="m-1">
                <div className={'display-flex gap-0p5 justify-content-space-between align-items-top'}>
                    <h1 className={'mt-0 mb-0p5'}>TO BE DONE</h1>
                    <form className={'display-flex gap-0p5 justify-content-center align-items-center'}
                          onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            type={'textarea'}
                            width={'420px'}
                            fieldRegister={register('text', {
                                onChange: textChangeHandler
                            })}
                            setRef={(ref: HTMLTextAreaElement) => inputRef.current = ref}
                        />
                        <Button disabled={isEmpty(inputValue)} icon={IoIosSave} type="submit"/>
                        <Button disabled={isEmpty(inputValue)} icon={FaXmark} onClick={cancelButtonHandler}/>
                    </form>
                </div>

                <ul className={'m-0 pl-0'}>
                    {
                        todos.map((todo: ToDoItem, i: number) => (
                            <li key={todo.id}
                                className={'display-flex gap-1 justify-content-space-between align-items-center py-0p2'}>
                                <div className={'display-flex gap-0p2 align-items-top'}>
                                    <input
                                        disabled={i === editedIndex}
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleTodo(todo.id)}
                                    />
                                    <span style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        color: i === editedIndex ? 'gainsboro' : 'initial'
                                    }}>
                                        {parseNested(todo.text, todo.id)}
                                        </span>
                                </div>
                                <div className={'display-flex gap-0p2'}>
                                    <Button disabled={i === editedIndex || todo.completed} className={'btn-icon'}
                                            icon={MdEdit} onClick={() => editTodo(todo.id)}/>
                                    <Button disabled={i === editedIndex} className={'btn-icon'} icon={MdDelete}
                                            onClick={() => handleDelete(todo)}/>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                deletingToDo && <Modal
                    closeOnEscKey={false}
                    closeOnOutsideClick={false}
                    onClose={() => setDeletingToDo(null)}>
                    <div className="display-flex gap-0p5 align-items-end">
                        <span className="color-red"><ReactIcon size={70} icon={IoIosWarning}/></span>
                        <div className={'mb-1'}>
                            <h3 className="m-0">Deleting Incomplete ToDo!</h3>
                            <h3 className="m-0 color-red">Are you sure?</h3>
                        </div>
                    </div>
                    <div className="display-flex gap-1 mt-0p5 justify-content-right">
                        <Button icon={MdDeleteForever} onClick={() => deleteTodo(deletingToDo)}>Continue</Button>
                        <Button className={'default'} icon={VscDiscard} onClick={() => setDeletingToDo(null)}>Cancel</Button>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default ToDo;