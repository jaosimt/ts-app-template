import { ChangeEvent, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';
import { FcAddRow } from 'react-icons/fc';
import { IoIosSave, IoIosWarning } from 'react-icons/io';
import { MdDelete, MdDeleteForever, MdEdit } from 'react-icons/md';
import { VscDiscard } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { classNames, isEmpty, isString } from '../../../../utils';
import { ReactIcon } from '../../../partials';
import Button from '../../../partials/button';
import Checkbox from '../../../partials/checkbox';
import InputField from '../../../partials/inputField';
import Modal from '../../../partials/modal';
import { addTodo, getTodos, removeTodo, updateTodo } from '../slices/todo';

export type ToDoItem = {
    id: string;
    text: string;
    completed: boolean;
}

type TodoAction = 'add' | 'edit' | 'delete' | 'toggle' | null;

const newTodo = () => ({
    id: crypto.randomUUID(),
    text: '',
    completed: false
});

const ToDo: FC<HTMLAttributes<HTMLDivElement>> = ({style, className, ...restProps}) => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(getTodos);

    const {
        register,
        reset,
        setValue
    } = useForm<ToDoItem>();
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const [todo, setTodo] = useState<ToDoItem | null>(null);
    const [todoAction, setTodoAction] = useState<TodoAction>(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        if (todoAction === null) {
            setShowConfirmDelete(false);
            setTodo(null);
            reset();
            return;
        }

        if (todoAction === 'delete') {
            setShowConfirmDelete(true);
            return;
        }

        if (['add', 'edit'].includes(todoAction)) {
            inputRef.current?.focus();
            return;
        }

        alert('xxxx');

        saveChanges();
        reset();
        // eslint-disable-next-line
    }, [todoAction]);

    useEffect(() => {
        setValue('text', todo === null ? '' : todo.text);
        // eslint-disable-next-line
    }, [todo]);

    const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo({...todo, text: e.currentTarget.value} as ToDoItem);
    };

    const textareaKeyPressHandler = (e: any) => {
        const { keyCode, metaKey } = e;
        if (keyCode === 13 && metaKey) saveChanges();
    }

    function saveChanges() {
        if (todo === null || !isString(todo.text, true)) {
            !todo && setTodo(newTodo());
            toast('Todo is empty!', {type: 'error'});
            return;
        }

        switch (todoAction) {
            case 'delete':
                dispatch(removeTodo(todo.id));
                break;
            case 'edit':
            case 'toggle':
                dispatch(updateTodo(todo));
                break;
            default:
                // crypto.randomUUID() <- Modern way to generate unique IDs
                dispatch(addTodo(todo));
        }

        setTodoAction(null);
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

    return (
        <div className={classNames(className, 'background-light', 'box-shadow', 'border-radius-0p3', 'p-0p5')} {...restProps}>
            <div className="m-1">
                <div className={'display-flex gap-0p5 justify-content-space-between align-items-top'}>
                    <h1 className={'m-0'}>TO BE DONE</h1>
                    <div className={'display-flex gap-0p5 justify-content-center align-items-center'}>
                        <InputField
                            type={'textarea'}
                            width={'420px'}
                            disabled={todoAction === null || !['add', 'edit'].includes(todoAction)}
                            fieldRegister={register('text', {
                                onChange: textChangeHandler,
                            })}
                            setRef={(ref: HTMLTextAreaElement) => inputRef.current = ref}
                            onKeyDown={textareaKeyPressHandler}
                        />
                        {
                            todoAction === null &&
                            <Button icon={FcAddRow} onClick={() => {
                                setTodo(newTodo());
                                setTodoAction('add');
                            }}/>
                        }
                        {
                            todoAction !== null && <>
                                <Button disabled={isEmpty(todo?.text)} icon={IoIosSave} onClick={saveChanges}/>
                                <Button icon={FaXmark} onClick={() => setTodoAction(null)}/>
                            </>
                        }

                    </div>
                </div>

                <ul className={'m-0 pl-0'}>
                    {
                        todos.map((t: ToDoItem) => {
                            const edited = (todoAction === 'edit' && t.id === todo?.id) || todoAction === 'add';

                            return <li key={t.id}
                                       className={'display-flex gap-1 justify-content-space-between align-items-center py-0p2'}>
                                <div className={'display-flex gap-0p5 align-items-center'}>
                                    <Checkbox name={'toggleTodo'} checked={t.completed}
                                              onChange={(e) => dispatch(updateTodo({
                                                  ...t,
                                                  completed: e.currentTarget.checked
                                              }))}/>
                                    <span style={{
                                        textDecoration: t.completed ? 'line-through' : 'none',
                                        color: edited ? 'gainsboro' : 'initial'
                                    }}>
                                        {parseNested(t.text, t.id)}
                                        </span>
                                </div>
                                <div className={'display-flex gap-0p2'}>
                                    <Button disabled={edited || t.completed} className={'btn-icon'} icon={MdEdit}
                                            onClick={() => {
                                                setTodo(t);
                                                setTodoAction('edit');
                                            }}/>
                                    <Button disabled={edited} className={'btn-icon'} icon={MdDelete}
                                            onClick={() => {
                                                setTodo(t);
                                                setTodoAction('delete');
                                            }}/>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            {
                showConfirmDelete && <Modal
                    closeOnEscKey={false}
                    closeOnOutsideClick={false}>
                    <div className="display-flex gap-0p5 align-items-end">
                        <span className="color-red"><ReactIcon size={70} icon={IoIosWarning}/></span>
                        <div className={'mb-1'}>
                            <h3 className="m-0">Deleting Incomplete ToDo!</h3>
                            <h3 className="m-0 color-red">Are you sure?</h3>
                        </div>
                    </div>
                    <div className="display-flex gap-1 mt-0p5 justify-content-right">
                        <Button icon={MdDeleteForever} onClick={saveChanges}>Continue</Button>
                        <Button className={'default'} icon={VscDiscard}
                                onClick={() => setTodoAction(null)}
                        >
                            Cancel
                        </Button>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default ToDo;