export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [] as any,
        status: false,
        message: "",
    }),
    actions: {
        async createProduct(payload: any)
        {
            const { baseUrl } = useAppConfig();
            const { getHeaders } = useAuthStore();
            const { data, error } = await useFetch("/rest/v1/products", {
                baseURL: baseUrl,
                method: "POST",
                headers: getHeaders(),
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
            const { baseUrl } = useAppConfig();
            const { getHeaders } = useAuthStore();
            const { data, error } = await useFetch("/rest/v1/products", {
                baseURL: baseUrl,
                method: "GET",
                headers: getHeaders(),
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
        async updateProduct(id: number, payload: any)
        {
            const { baseUrl } = useAppConfig();
            const { getHeaders } = useAuthStore();
            const { data, error } = await useFetch(`/rest/v1/products?id=eq.${id.toString()}`, {
                baseURL: baseUrl,
                method: "PATCH",
                headers: getHeaders(),
                body: payload,
            });
            if (error.value || !data)
            {
                this.status = false;
                this.message = "Failed to update product: " +
                    (data ? error.value : "no data received");
                console.error(this.message + `\nArgs: id=${id}, payload=${payload}`);
            } else {
                this.status = true;
                this.message = "Product updated successfully.";
                this.products = data.value;
            }
        },
        async deleteProduct(id: number)
        {
            const { baseUrl } = useAppConfig();
            const { getHeaders } = useAuthStore();
            const { data, error } = await useFetch(`/rest/v1/products?id=eq.${id.toString()}`, {
                baseURL: baseUrl,
                method: "DELETE",
                headers: getHeaders(),
            });
            if (error.value || !data)
            {
                this.status = false;
                this.message = "Failed to delete product: " +
                    (data ? error.value : "no data received");
                console.error(this.message + `\nArgs: id=${id}`);
            } else {
                this.status = true;
                this.message = "Product deleted successfully.";
                this.products = data.value;
            }
        },
    }
})