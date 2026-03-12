import { ChangeEvent, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { IoIosSave, IoIosWarning } from 'react-icons/io';
import { MdDelete, MdDeleteForever, MdEdit } from 'react-icons/md';
import { RiAddLargeFill } from 'react-icons/ri';
import { VscDiscard } from 'react-icons/vsc';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { classNames, isEmpty } from '../../../../utils';
import { ReactIcon } from '../../../partials';
import Button from '../../../partials/button';
import Checkbox from '../../../partials/checkbox';
import InputField from '../../../partials/inputField';
import Modal from '../../../partials/modal';
import { toast } from '../../../partials/toast';
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

const Container = styled.div`
    @media (max-width: 768px) {
        width: 95%;
    }
`;

const ToDo: FC<HTMLAttributes<HTMLDivElement>> = ({className, ...restProps}) => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(getTodos);

    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const [todo, setTodo] = useState<ToDoItem | null>(null);
    const [todoAction, setTodoAction] = useState<TodoAction>(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        if (todoAction === null) {
            setShowConfirmDelete(false);
            setTodo(null);
            return;
        }

        if (todoAction === 'delete') {
            if (todo?.completed) saveChanges();
            else setShowConfirmDelete(true);
            return;
        }

        if (['add', 'edit'].includes(todoAction)) {
            inputRef.current?.focus();
            return;
        }

        // eslint-disable-next-line
    }, [todoAction]);


    const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo({...todo, text: e.currentTarget.value} as ToDoItem);
    };

    const textareaKeyPressHandler = (e: any) => {
        const { keyCode, metaKey } = e;
        if (keyCode === 13 && metaKey) saveChanges();
    }

    function saveChanges() {
        if (todo === null) {
            toast({message: 'Todo is empty!'});
            return;
        }

        switch (todoAction) {
            case 'delete':
                dispatch(removeTodo(todo.id));
                toast({
                    message: `ToDo "${todo.text}" successfully removed!`,
                    options: {duration: 7000}
                });
                break;
            case 'edit':
            case 'toggle':
                dispatch(updateTodo(todo));
                break;
            default:
                dispatch(addTodo(todo));
                toast({
                    message: `ToDo "${todo.text}" successfully added!`,
                    options: {type: 'success', duration: 7000}
                });
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
        <Container data-component={'todo'} className={classNames(className, 'background-light', 'box-shadow', 'border-radius-0p3', 'p-0p5')} {...restProps}>
            <div className="m-1">
                <h1 className={'m-0 mb-0p3'}>TO BE DONE</h1>
                <div className={'display-flex gap-0p5 justify-content-center align-items-center width-100p mb-0p5'}>
                    {
                        todoAction === null &&
                        <Button icon={RiAddLargeFill} onClick={() => {
                            setTodo(newTodo());
                            setTodoAction('add');
                        }}/>
                    }
                    <InputField
                        wrapperClassName={'width-100p'}
                        type={'textarea'}
                        width={'100%'}
                        disabled={todoAction === null || !['add', 'edit'].includes(todoAction)}
                        value={todo?.text || ''}
                        onChange={textChangeHandler}
                        setRef={(ref: HTMLTextAreaElement) => inputRef.current = ref}
                        onKeyDown={textareaKeyPressHandler}
                    />
                    {
                        todoAction !== null && <>
                            <Button disabled={isEmpty(todo?.text)} icon={IoIosSave} onClick={saveChanges}/>
                            <Button icon={FaXmark} onClick={() => setTodoAction(null)}/>
                        </>
                    }
                </div>
                <ul className={'m-0 pl-0'}>
                    {
                        todos.map((t: ToDoItem) => {
                            const editing = todoAction === 'edit';
                            const edited = (editing && t.id === todo?.id) || todoAction === 'add';

                            return <li key={t.id}
                                       className={'display-flex gap-1 justify-content-space-between align-items-center py-0p2'}>
                                <div className={'display-flex gap-0p5 align-items-center'} style={{lineHeight: 1}}>
                                    <Checkbox disabled={editing} name={'toggleTodo'} checked={t.completed}
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
                                    <Button disabled={editing || t.completed} className={'btn-icon'} icon={MdEdit}
                                            onClick={() => {
                                                setTodo(t);
                                                setTodoAction('edit');
                                            }}/>
                                    <Button disabled={editing} className={'btn-icon'} icon={MdDelete}
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
        </Container>
    );
};

export default ToDo;