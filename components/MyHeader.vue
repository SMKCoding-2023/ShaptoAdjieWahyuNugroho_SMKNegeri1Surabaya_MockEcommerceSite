<template>
    <header class="w-full border-b border-slate-200 py-6">
        <div class="container">
            <div class="flex justify-between items-center">
                <div>
                    <NuxtLink to="/" class="ml-10 text-xl font-bold">Mock Shopping Site</NuxtLink>
                </div>
                <nav class="flex items-center gap-6">
                    <NuxtLink to="/" class="text-base">Home</NuxtLink>
                    <NuxtLink to="/product" class="text-base">Products</NuxtLink>
                    <NuxtLink to="/cart" class="text-base">Cart</NuxtLink>
                </nav>
            </div>
        </div>
    </header>
</template>