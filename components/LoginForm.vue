<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const isLoading = ref(false);
const isShowAlert = ref(false);
const isSuccess = ref(false);
const message = ref("");
const router = useRouter();

const login = ref([
    { name: "email", label: "Email", type: "email", value: "", placeholder: "name@company.com", required: true },
    { name: "password", label: "Password", type: "password", value: "", placeholder: "••••••••", required: true },
]);

const submitLogin = async () => {
    isLoading.value = true;
    const result: { [key: string]: string } = {};
    login.value.forEach((item) =>
    {
        result[item.name] = item.value;
    });

    await authStore.login(result);

    isSuccess.value = authStore.status;
    message.value = authStore.message;
    isShowAlert.value = true;
    isLoading.value = false;
    if (isSuccess.value){
        router.push({path: "/product"})
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="submitLogin">
            <div class="headingContainer">
                <h5 class="loginTitle">Login</h5>
                <span class="loginHeading">Sign in to continue to our application</span>
            </div>
            <div v-if="isShowAlert" :class="isSuccess ? 'success' : 'fail'" role="alert">
                {{ message }}
            </div>
            <div v-for="(item, index) in login" :key="index" class="formItem">
                <label :for="item.name" class="formItemName">{{ item.label }}</label>
                <input :type="item.type" :name="item.name" :id="item.name" v-model="item.value"
                    class="formItemInput"
                    :placeholder="item.placeholder" :required="item.required">
            </div>
            <button type="submit"
                class="submit">
                <span v-if="!isLoading">Login to your account</span>
                <div v-else role="status">
                    <svg aria-hidden="true" class="loading"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </button>
            <div class="register">
                Don't have an account? <NuxtLink to="/register" class="link">Sign up</NuxtLink>
            </div>
        </form>
    </div>
</template>

<style scoped>
template > div {
    width: 100%;
    max-width: 32rem;
    border-radius: 0.5rem;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
    background-color: var(--bg-color);

    margin-left: auto;
    margin-right: auto;

    /* sm:p-6 md:p-8 */
    padding: 1.5rem; /* Apply padding 6 at small screens and up */
    @media (min-width: var(--size-medium)) { /* Apply padding 8 at medium screens and up */
        padding: 2rem;
    }
}
div.headingContainer {
    margin-bottom: 1.5rem;
}
.loginTitle {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 500;
    color: var(--text-secondary-color);
    margin-bottom: 0.5rem;
}
.loginHeading {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: var(--text-secondary-color);
}
.success {
    padding: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.5rem;
    border: 1px solid var(--success-accent-color);
    background-color: var(--success-color);
    color: var(--success-accent-color);
}
.fail {
    padding: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.5rem;
    border: 1px solid var(--error-accent-color);
    background-color: var(--error-color);
    color: var(--error-accent-color);
}

.formItem {
    margin-bottom: 1.5rem;
}
.formItemName {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--text-primary-color);
}
.formItemInput {
    background-color: var(--secondary-bg-color);
    border: 2px solid var(--text-secondary-color);
    color: var(--text-primary-color);
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.5rem;
    display: block;
    width: 100%;
    padding: 0.625rem;
    transition: all 150ms ease-in-out;
}
.formItemInput:focus {
    border: 2px solid var(--primary-color);
}

button.submit {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-inverted-color);
    background-color: var(--primary-color);
    font-weight: 500;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.625rem 1.25rem;
    text-align: center;
    margin-bottom: 1.5rem;
    transition: all 150ms ease-in-out;
}
button.submit:hover {
    background-color: var(--dark-primary-color);
}
button.submit:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary-translucent-color);
}
svg.loading {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    color: var(--text-secondary-color);
    animation: spin 1s linear infinite;
    fill: var(--tertiary-bg-color);
}

.register {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--text-secondary-color);
}
.link { color: var(--logout-text-color) }
.link:hover { text-decoration: underline }
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
</style>