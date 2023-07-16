import type {BaseQueryFn} from '@reduxjs/toolkit/query'
import {createApi} from '@reduxjs/toolkit/query/react';
import type {AxiosError, AxiosRequestConfig} from 'axios'
import axios from 'axios'
import {Status, TodoType} from "../../Utils.tsx";


const axiosBaseQuery =
    (
        {baseUrl}: { baseUrl: string } = {baseUrl: ''}
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
    > =>
        async ({url, method, data, params}) => {
            try {
                const result = await axios({url: baseUrl + url, method, data, params})
                return {data: result.data}
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }

export const apiSlice = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl: '/api/v1',
    }),
    tagTypes: ['TodoType'],
    endpoints(build) {
        return {
            todos: build.query<TodoType[], void>({
                query: () => ({url: '/todos', method: 'get'}),
                providesTags: (result) =>
                    result
                        ? [...result.map(({id}) => ({type: 'TodoType' as const, id})), 'TodoType']
                        : ['TodoType']

            }),
            addTodo: build.mutation<TodoType, { description: string }>({
                query: (description) => ({
                    url: "/todos",
                    method: "POST",
                    data: description
                }),
                invalidatesTags: ['TodoType']
            }),
            deleteTodo: build.mutation<void, string>({
                query: (id: string) => ({
                    url: `/todos/${id}`,
                    method: "DELETE"
                }),
                invalidatesTags: ['TodoType']
            }),
            patchTodo: build.mutation<void, { id: string, status: Status }>({
                query: ({id, status}) => ({
                    url: `/todos/${id}`,
                    method: "PATCH",
                    data: {status}
                }),
                invalidatesTags: ['TodoType']
            }),
        }
    },
})


export const {
    useTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    usePatchTodoMutation
} = apiSlice