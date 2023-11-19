<script lang="ts" setup>
import { useProductsStore } from "~/stores/products";

definePageMeta({middleware: ["user-access"]});

const selectedCategory = ref("");
const productStore = useProductsStore();
const productList = ref([]);

productStore.getProductList().then(() => {
    productList.value = productStore.products;
});
</script>

<template>
    <section>
        <div class="container">
            <div class="py-10">
                <div class="mb-6 flex justify-end gap-6">
                    <NuxtLink to="/category/create" class="bg-orange-500 text-white flex justify-center items-center px-3 rounded-lg">
                        Create Category
                    </NuxtLink>
                    <NuxtLink to="/product/create" class="bg-green-500 text-white flex justify-center items-center px-3 rounded-lg">
                        Create Products
                    </NuxtLink>
                    <Dropdown @selected-category="selectedCategory = $event" />
                </div>
                <div class="flex gap-6 flex-wrap mx-auto ">
                    <template v-for="(item, index) in productList" :key="index">
                        <CardProduct :product="item" class="w-[calc(100%/4-18px)]" />
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>