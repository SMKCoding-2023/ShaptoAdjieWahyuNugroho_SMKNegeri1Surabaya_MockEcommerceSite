export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [] as any,
        status: false,
        message: "",
    }),
    actions: {
        async createProduct(payload: any)
        {
            const { baseUrl, apikey } = useAppConfig();
            const { data, error } = await useFetch("/rest/v1/products", {
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
                this.message = "Failed to post product: " +
                    (data ? error.value : "no data received");
                console.error(this.message);
            } else {
                this.status = true;
                this.message = "Product posted successfully.";
            }
        },
        async getProductList()
        {
            const { baseUrl, apikey } = useAppConfig();
            const { data, error } = await useFetch("/rest/v1/products", {
                baseURL: baseUrl,
                method: "GET",
                headers: {
                    apikey: apikey,
                },
            });
            if (error.value || !data)
            {
                this.status = false;
                this.message = "Failed to retrieve product list: " +
                    (data ? error.value : "no data received");
                console.error(this.message);
            } else {
                this.status = true;
                this.message = "Product list retrieved successfully.";
                this.products = data.value;
            }
        },
    }
})