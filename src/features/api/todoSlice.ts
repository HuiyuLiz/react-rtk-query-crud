/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const todoSlice = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Todos'],
  endpoints: builder => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      transformResponse: (response: Todo[]) =>
        response.sort((a, b) => a.id - b.id),
      providesTags: ['Todos']
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query(todo) {
        return {
          url: '/todos',
          method: 'POST',
          body: todo
        }
      },
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query(todo) {
        return {
          url: `/todos/${todo.id}`,
          method: 'PATCH',
          body: todo
        }
      },
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation({
      query({ id }) {
        return {
          url: `/todos/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Todos']
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoSlice
