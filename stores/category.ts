export const useCategoryStore = defineStore("category", {
    state: () => ({
        categories: {} as any,
        status: false,
        message: "",
    }),
    actions: {
        async createCategory(payload: any)
        {
            const { baseUrl, apikey } = useAppConfig();
            const { data, error } = await useFetch("/rest/v1/categories", {
                baseURL: baseUrl,
                method: "POST",
                headers: {
                    apikey: apikey,
                },
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
            const { baseUrl, apikey } = useAppConfig();
            const { data, error } = await useFetch("/rest/v1/categories", {
                baseURL: baseUrl,
                method: "GET",
                headers: {
                    apikey: apikey,
                },
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
    }
})