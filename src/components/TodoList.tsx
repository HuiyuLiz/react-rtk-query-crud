/* eslint-disable @typescript-eslint/strict-boolean-expressions */

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GVGLZRzCrmH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  type Todo,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation
} from '@/features/api/todoSlice'

export default function TodoList() {
  const {
    data: todos,
    error,
    isSuccess,
    isLoading: isLoadingTodos,
    isError
  } = useGetTodosQuery()

  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const [newTodo, setNewTodo] = useState('')

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [todos])

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newTodo === '') {
      return
    }

    void addTodo({
      userId: 1,
      title: newTodo,
      completed: false
    })
    setNewTodo('')
  }

  const adddFormInput = (
    <form className="flex items-center space-x-3" onSubmit={submit}>
      <Input
        className="flex-1"
        placeholder="Add a new todo"
        type="text"
        value={newTodo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNewTodo(e.target.value.slice(0, 10))
        }}
      />
      <Button>Add</Button>
    </form>
  )

  let content
  if (isLoadingTodos) {
    content = <div>Loading...</div>
  } else if (isSuccess) {
    content = (
      <ScrollArea className="h-[50vh]">
        {todos.map((todo: Todo) => (
          <div
            className="flex w-full flex-wrap items-center justify-between"
            key={todo.id}
          >
            <div className="flex w-2/3 items-center  space-x-3 ">
              <Checkbox
                id={todo.id.toString()}
                checked={todo.completed}
                onCheckedChange={() => {
                  handleUpdateTodo(todo)
                }}
              />
              <label
                className={`text-gray-700 dark:text-gray-300 ${todo.completed ? 'line-through' : ''}`}
                htmlFor={todo.id.toString()}
              >
                {todo.title}
              </label>
            </div>
            <Button
              className="text-gray-500 hover:text-red-500"
              size="icon"
              variant="ghost"
              onClick={() => {
                handleDeleteTodo({ id: todo.id })
              }}
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
    )
  } else if (isError) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
      content = (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    } else {
      content = <div>{error.message}</div>
    }
  }

  const handleUpdateTodo = (todo: Todo) => {
    void updateTodo({ ...todo, completed: !todo.completed })
  }

  const handleDeleteTodo = ({ id }: Pick<Todo, 'id'>) => {
    void deleteTodo({ id })
  }

  return (
    <div className="mx-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950 md:w-[24rem]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Todo List</h1>
      </div>

      <div className="space-y-4">
        {content}
        {adddFormInput}
      </div>
    </div>
  )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
