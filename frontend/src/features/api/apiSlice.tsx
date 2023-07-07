import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TodoType} from "../../Utils.tsx";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:8080/api/v1/',
            headers: {
                'Content-Type': 'application/json',

            }
        },
    ),
    tagTypes: ['TodoType'],
    endpoints: (builder) => ({
        todos: builder.query<TodoType[], void>({
            query: () => '/todos',
            providesTags: (result) =>
                result
                    ? [...result.map(({id}) => ({type: 'TodoType' as const, id})), 'TodoType']
                    : ['TodoType']
        }),

        addTodo: builder.mutation<TodoType, { description: string, status: string }>({
            query: (todo) => ({
                url: "/todos",
                method: "POST",
                body: todo
            }),
            invalidatesTags: ['TodoType']
        }),
        deleteTodo: builder.mutation<void, string>({
            query: (id: string) => ({
                url: `/todos/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['TodoType']
        }),
        patchTodo: builder.mutation<void, TodoType>({
            query: ({id, description, status}) => ({
                url: `/todos/${id}`,
                method: "PUT",
                body: {id, description, status}
            }),
            invalidatesTags: ['TodoType']
        })
    }),
});

export const {
    useTodosQuery
    , useAddTodoMutation,
    useDeleteTodoMutation,
    usePatchTodoMutation
} = apiSlice