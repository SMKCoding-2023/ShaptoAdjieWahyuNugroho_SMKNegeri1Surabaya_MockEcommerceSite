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
</script>

<template>
    <header class="w-full border-b border-slate-200 py-6 bg-blue-200">
        <div class="container">
            <div class="flex justify-between items-center">
                <div>
                    <NuxtLink to="/" class="ml-10 text-xl font-bold">Mock E-commerce Site</NuxtLink>
                </div>
                <nav class="flex items-center gap-6">
                    <NuxtLink to="/" class="text-base">Home</NuxtLink>
                    <NuxtLink to="/product" class="text-base">Products</NuxtLink>
                    <NuxtLink to="/cart" class="text-base">Cart</NuxtLink>
                    <NuxtLink v-if="!isAuthenticated" to="/login" class="text-base bg-blue-600 px-6 py-2 text-white rounded-lg hover:bg-blue-600/80">Log in</NuxtLink>
                    <div v-else class="text-base cursor-pointer border border-blue-600 bg-blue-100 px-6 py-2 text-blue rounded-lg hover:bg-blue-100/80" @click="logout">Log out</div>
                </nav>
            </div>
        </div>
    </header>
</template>