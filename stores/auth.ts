interface AuthPayload {
    email?: string;
    password?: string;
}

export const useAuthStore = defineStore("auth", {
    state: () => ({
        status: false,
        message: "",
    }),
    actions: {
        setAccessToken(data: any) {
            const cookie = useCookie("access_token", { maxAge: data.expires_in });
            cookie.value = data.access_token;
        },
        setRefreshToken(data: any) {
            const date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            const cookie = useCookie("refresh_token", { expires: date });
            cookie.value = data.refresh_token;
        },
        async login(payload: AuthPayload) {
            try {
                const { baseUrl, apikey } = useAppConfig();
                const response = await $fetch("/auth/v1/token?grant_type=password", {
                    baseURL: baseUrl,
                    method: "POST",
                    headers: {
                        apikey: apikey,
                        "Content-Type": "application/json",
                    },
                    body: payload,
                });

                this.setAccessToken(response);
                this.setRefreshToken(response);
                this.status = true;
                this.message = "Logged in successfully.";
            } catch (error) {
                this.status = false;
                // console.error("Login failed: ", error);
                // this.message = "Login failed: " + error;
                this.message = "Login failed. Please check your email and password.";
            }
        },
        async register(payload: AuthPayload) {
            try {
                const { baseUrl, apikey } = useAppConfig();
                const response = await $fetch("/auth/v1/signup", {
                    baseURL: baseUrl,
                    method: "POST",
                    headers: {
                        apikey: apikey,
                        "Content-Type": "application/json",
                    },
                    body: payload,
                });
                this.setAccessToken(response);
                this.setRefreshToken(response);
                this.status = true;
                this.message = "Registered successfully. Please check your inbox to verify your email.";
            } catch (error) {
                this.status = false;
                console.error("Registration failed: ", error);
                this.message = "Registration failed: " + error;
            }
        },
        async logout() {
            try {
                const { baseUrl, apikey } = useAppConfig();
                const accessToken = useCookie("access_token").value;
                const response = await $fetch("/auth/v1/logout", {
                    baseURL: baseUrl,
                    method: "POST",
                    headers: {
                        apikey: apikey,
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                this.status = true;
                this.message = "Logged out successfully.";
            } catch (error) {
                console.log(error);
                this.status = false;
                console.error("Logout failed: ", error);
                this.message = "Logout failed: " + error;
            }
        },
    },
});
