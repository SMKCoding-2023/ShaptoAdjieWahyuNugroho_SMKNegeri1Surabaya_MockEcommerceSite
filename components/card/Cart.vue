<script lang="ts" setup>
import type {Product} from '~/types/product';
const { baseStorageUrl } = useAppConfig();

const props = defineProps({
    product: {
        type: Object,
        default: {}
    }
});

const productRef = ref(props.product);

const changeQuantity = (num: number) => {
    productRef.value.quantity += num;
    productRef.value.quantity = Math.max(productRef.value.quantity, 1);
    let localStorageData = localStorage.getItem("products");
    let products: Product[] = [];

    // Save quantity
    if(localStorageData){
        products = JSON.parse(localStorageData);
    }
    products.forEach(element => {
        if(element.id === productRef.value.id){
            element.quantity = productRef.value.quantity;
        }
    });

    localStorage.setItem("products", JSON.stringify(products));
}
</script>

<template>
    <div class="outer">
        <div class="imageContainer">
            <img :src="baseStorageUrl + productRef.image" :alt="'Picture of ' + productRef.name"/>
        </div>
        <div class="infoContainer">
            <h5 class="productName">{{productRef.name}}</h5>
            <p class="productPrice">${{productRef.price}}</p>

            <div class="productControls">
                <div class="amountControls">
                    <button @click="changeQuantity(-1)" class="adjustAmount">
                        <i class="ri-subtract-line"></i>
                    </button>
                    <div class="amount">{{productRef.quantity}}</div>
                    <button @click="changeQuantity(1)" class="adjustAmount">
                        <i class="ri-add-line"></i>
                    </button>
                </div>
                <button @click="$emit('removeFromCart',productRef.id)" class="removeFromCart">
                    <i class="ri-delete-bin-line"></i>
                    <span class="removeFromCart">Delete</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.outer {
    background-color: var(--bg-color);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    padding: 1.5rem;
    border-radius: 0.75rem;
    display: flex;
    gap: 1rem;
    align-items: center;
}

.imageContainer {
    height: 150px;
    width: 130px;
    background-color: var(--secondary-bg-color);
    border-radius: 0.75rem;
    padding: 0.75rem;
}
img {
    height: 100%;
    width: 100%;
    object-fit: contain;
}

.infoContainer { width: 100% }
.productName {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}
.productPrice {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 400;
    margin-bottom: 0.75rem;
}

.productControls {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.amountControls {
    display: flex;
    align-items: center;
    border: 1px solid var(--text-secondary-color);
    width: max-content;
    border-radius: 9e9px;
}
button.adjustAmount {
    cursor: pointer;
    height: 2.2rem;
    width: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    transition: all 150ms ease-in-out;
}
button.adjustAmount:hover {
    background-color: var(--ghost-primary-color);
}
.amount {
    padding: 0.25rem 0.5rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
button.removeFromCart {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--error-accent-color);
    border: 1px solid var(--error-accent-color);
    background-color: var(--error-color);
    padding: 0.5rem 0.75rem;
    border-radius: 9e9px;
    cursor: pointer;
    transition: all 150ms ease-in-out;
}
button.removeFromCart:hover {
    background-color: var(--error-accent-color);
    color: var(--text-color);
}
i.removeFromCart, span.removeFromCart {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
</style>