<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const isAuthenticated = ref();
const router = useRouter();

isAuthenticated.value = useCookie("access_token").value;

const logout = async () =>
{
    await authStore.logout();
    const accessToken = useCookie("access_token");
    const refreshToken = useCookie("refresh_token");
    accessToken.value = null;
    refreshToken.value = null;
    setTimeout(() =>
    {
        isAuthenticated.value = useCookie("access_token").value;
    }, 100);
    router.push({
        path: "/"
    })
}

const switchMode = () => {
    let colorMode = useColorMode();
    colorMode.preference = (colorMode.preference === 'dark' ? 'light' : 'dark');
}
</script>

<template>
    <header>
        <div>
            <NuxtLink to="/" class="title">Mock E-commerce Site</NuxtLink>
            <nav>
                <button @click="switchMode" 
                    :class="'themeSwitch '+($colorMode.preference === 'dark' ? 'ri-contrast-2-line' : 'ri-sun-fill')">
                </button>
                <NuxtLink to="/" class="navItem">Home</NuxtLink>
                <NuxtLink to="/product" class="navItem">Products</NuxtLink>
                <NuxtLink to="/cart" class="navItem">Cart</NuxtLink>
                <NuxtLink v-if="!isAuthenticated" to="/login" class="login">Log in</NuxtLink>
                <div v-else class="logout" @click="logout">Log out</div>
            </nav>
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    border-bottom: 1px solid var(--text-tertiary-color);
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    background-color: var(--header-color);
}
header > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 2.5rem;
}
.title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
}
nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
nav NuxtLink {
    font-size: 1rem;
    line-height: 1.5rem;
}
.themeSwitch {
    margin-right: 2rem;
    padding-inline: 0.5rem;
    font-size: 1.5rem;
    background-color: transparent;
    border-radius: 0.375rem;
    transition: background-color 150ms ease-in-out;
}
.themeSwitch:hover {
    background-color: var(--nav-hover-color);
}
.navItem {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    background-color: transparent;
    transition: background-color 150ms ease-in-out;
}
.navItem:hover {
    background-color: var(--nav-hover-color);
}
.login {
    font-size: 1rem;
    background-color: var(--login-bg-color);
    padding-inline: 1.5rem;
    padding-block: 0.5rem;
    color: var(--login-text-color);
    border-radius: 0.375rem;
    transition: background-color 150ms ease-in-out;
}
.login:hover {
    background-color: var(--login-bg-color-hover);
}
.logout {
    /* text-base cursor-pointer border border-blue-600 bg-blue-100 px-6 py-2 text-blue rounded-lg hover:bg-blue-100/80 */
    /* Convert to plain CSS */
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid var(--logout-border-color);
    background-color: var(--logout-bg-color);
    padding: 0.5rem 1.5rem;
    color: var(--logout-text-color);
    border-radius: 0.375rem;
    transition: background-color 150ms ease-in-out;
}
.logout:hover {
    background-color: var(--logout-bg-color-hover);
}
</style>