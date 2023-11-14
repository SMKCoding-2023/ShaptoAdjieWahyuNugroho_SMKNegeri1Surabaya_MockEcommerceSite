<script lang="ts" setup>
import type {Product} from '~/types/product';

const props = defineProps({
    product: {
        type: Object,
        default: {},
    },
});

const { baseStorageUrl } = useAppConfig();

const productRef = ref(props.product);

const addToCart = () => {
    productRef.value.inCart = !productRef.value.inCart;
    let localStorageData = localStorage.getItem("products");
    let products: Product[] = [];

    if(localStorageData){
        products = JSON.parse(localStorageData);
    }

    if(productRef.value.inCart){
        products.push(productRef.value);
        localStorage.setItem("products", JSON.stringify(products));
    } else {
        products = products.filter((item) => item.id !== productRef.value.id)
        localStorage.setItem("products", JSON.stringify(products));
    }
}
</script>

<template>
    <section class="bg-white shadow-xl rounded-xl overflow-hidden">
        <div :class="`w-full h-[200px] p-5 bg-gray-300`">
            <NuxtLink :to="`/product/${productRef.id}`">
                <img :src="baseStorageUrl + props.product.image" class="w-full h-full object-contain" />
            </NuxtLink>
        </div>
        <div class="px-5 pb-5 pt-9 relative">
            <NuxtLink :to="`/product/${productRef.id}`">
                <h3 class="text-lg font-bold mb-4 text-limit limit-2">{{ productRef.name }}</h3>
            </NuxtLink>
            <div class="flex justify-between items-center">
                <span class="text-sm font-normal">{{ productRef.category }}</span>
                <span class="text-sm font-normal">${{ productRef.price }}</span>
            </div>
            <div @click="addToCart" :class="`cursor-pointer absolute -top-5 right-7 w-[50px] h-[50px] ${productRef.isCart ? 'bg-blue-600 text-white' : 'bg-white'} shadow-xl rounded-full flex justify-center items-center hover:bg-blue-600 hover:text-white transition duration-300`">
                <i class="ri-shopping-cart-2-line"></i>
            </div>
        </div>
    </section>
</template>