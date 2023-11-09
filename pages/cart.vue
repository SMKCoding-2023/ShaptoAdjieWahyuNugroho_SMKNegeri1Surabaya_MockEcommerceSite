<script lang="ts" setup>
import type {Products} from '~/types/products';

const products = ref<Products[]>([]);
const totalPrice = computed(() => {
    return products.value.filter((product) => { product.price !== undefined})
        .reduce((acc, curVal) => acc + curVal.price!, 0);
})
const removeFromCart = (id: number) => {
    products.value = products.value.filter((item) => item.id !== id);
    localStorage.setItem("products", JSON.stringify(products.value));
}

onMounted(() => {
    let localStorageData = localStorage.getItem("products");
    if (localStorageData) {
        products.value = JSON.parse(localStorageData);
    }
})
</script>

<template>
    <section>
        <div class="container">
            <div class="py-10 flex gap-6">
                <div class="w-[70%]">
                    <div class="flex justify-between items-center pb-7 border-b border-gray-300 mb-6">
                        <h1 class="text-3xl font-medium">Shopping Cart</h1>
                        <p class="text-3xl font-medium">{{products.length}} Item{{products.length !== 1 ? "s" : ""}}</p>
                    </div>
                    <div v-if="products.length > 0" class="flex flex-col gap-6">
                        <template v-for="(v,index) in products" :key="index">
                            <CardCart :product="v" @removeFromCart="removeFromCart"/>
                        </template>
                    </div>
                    <div v-else>
                        <h5 class="text-xl font-light text-center">You have no items in your cart.</h5>
                    </div>
                </div>
                <div class="w-[30%] bg-white shadow-xl h-max p-6">
                    <h3 class="text-xl font-medium mb-6">Order Summary</h3>
                    <div class="flex flex-col gap-3 border-b border-gray-300 pb-4">
                        <div v-if="products.length > 0">
                            <div v-for="(v, index) in products" :key="index" class="flex gap-4 items-center justify-between">
                                <span class="text-limit limit-1 text-sm">{{v.name}}</span>
                                <span class="text-sm font-semibold text-right">{{v.price}}</span>
                            </div>
                        </div>
                        <div v-else>
                            <p class="text-sm text-center font-light">
                                You have no items in your cart.
                            </p>
                        </div>
                    </div>
                    <div class="flex pt-4 items-center justify-between mb-6">
                        <span class="text-base">Total</span>
                        <span class="text-base font-bold">{{totalPrice}}</span>
                    </div>
                    <button class="bg-blue-600 text-white text-base font-bold w-full py-2 rounded-lg">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>