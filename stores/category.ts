export const useCategoryStore = defineStore("category", {
    state: () => ({
        categories: {} as any,
        status: false,
        message: "",
    }),
    actions: {
        async createCategory(payload: any)
        {
            const { baseUrl } = useAppConfig();
            const { getHeaders } = useAuthStore();
            const headers = getHeaders();
            const { data, error } = await useFetch("/rest/v1/categories", {
                baseURL: baseUrl,
                method: "POST",
                headers: headers,
                body: payload,
            })
            if (error.value || !data)
            {
                this.status = false;
                this.message = "Failed to create category: " +
                    (data ? error.value : "no data received");
                console.error(this.message);
            } else {
                this.status = true;
                this.message = "Category created successfully.";
            }
        },
        async getCategoryList()
        {
            const { baseUrl } = useAppConfig();
            const { getHeaders } = useAuthStore();
            const { data, error } = await useFetch("/rest/v1/categories", {
                baseURL: baseUrl,
                method: "GET",
                headers: getHeaders(),
            })
            if (error.value || !data)
            {
                this.status = false;
                this.message = "Failed to retrieve category list: " + 
                    (data ? error.value : "No data received");
                console.error(this.message);
            } else {
                this.status = true;
                this.message = "Retrieved category list successfully";
                this.categories = data.value;
            }
        },
        async updateCategory(id: number, name: string)
        {
            const { baseUrl } = useAppConfig();
            const { getHeaders } = useAuthStore();
            const { data, error } = await useFetch("/rest/v1/categories?id=eq." + id.toString(), {
                baseURL: baseUrl,
                method: "PATCH",
                headers: getHeaders(),
                body: `{"name": "${name}"}`,
            })
            if (error.value || !data)
            {
                this.status = false;
                this.message = "Failed to update category: " + 
                    (data ? error.value : "No data received");
                console.error(this.message + `\nArgs: id=${id}, name=${name}`);
            } else {
                this.status = true;
                this.message = "Updated category successfully";
                this.categories = data.value;
            }
        },
        async deleteCategory(id: number)
        {
            const { baseUrl } = useAppConfig();
            const { getHeaders } = useAuthStore();
            const { data, error } = await useFetch("/rest/v1/categories?id=eq." + id.toString(), {
                baseURL: baseUrl,
                method: "DELETE",
                headers: getHeaders(),
            })
            if (error.value || !data)
            {
                this.status = false;
                this.message = "Failed to delete category: " + 
                    (data ? error.value : "No data received");
                console.error(this.message + `\nCategory ID: ${id}`);
            } else {
                this.status = true;
                this.message = "Deleted category successfully";
                this.categories = data.value;
            }
        },
    }
})