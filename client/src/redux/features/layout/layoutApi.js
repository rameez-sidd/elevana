import { apiSlice } from "../../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLayoutData: builder.query({
            query: (type) => ({
                url: `get-layout/${type}`,
                method: "GET",
                credentials: "include"
            })
        }),
        editLayout: builder.mutation({
            query: ({type, title, categories}) => ({
                url: 'edit-layout',
                body: { type, title, categories },
                method: "PUT",
                credentials: "include"
            })
        }) 
    })
})

export const { useGetLayoutDataQuery, useEditLayoutMutation } = layoutApi;