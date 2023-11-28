<script setup lang="ts">
import { Product } from "~/types/product";
const { baseStorageUrl } = useAppConfig();
const props = defineProps({
    product: {
        type: Object,
        default: {},
    },
});

const productRef = ref(props.product);
const addToCart = () => {
    productRef.value.inCart = !productRef.value.inCart;
    let localStorageData = localStorage.getItem("products");
    let products: Product[] = [];

    if(localStorageData){
        products = JSON.parse(localStorageData);
    }

    if(productRef.value.inCart){
        productRef.value.quantity = 1;
        products.push(productRef.value);
    } else {
        productRef.value.quantity = 0;
        products = products.filter((item) => item.id !== productRef.value.id)
    }
        localStorage.setItem("products", JSON.stringify(products));
}
</script>
<template>
    <section>
        <NuxtLink to="/product" class="backButton">
            <i class="ri-arrow-left-s-line backText"></i>
            <span class="backText">Back</span>
        </NuxtLink>
        <div class="product">
            <div class="imageContainer">
                <img :src="baseStorageUrl + productRef.image" />
            </div>
            <div class="infoContainer">
                <p class="productCategory">{{ productRef.category }}</p>
                <h1 class="productName">{{ productRef.name }}</h1>
                <h3 class="productPrice">${{ productRef.price }}</h3>
                <p class="productDesc">{{ productRef.desc }}</p>
                <button @click="addToCart" class="cart">
                    <div :class="productRef.inCart ? 'inCart' : 'notInCart'">
                        <i class="ri-shopping-cart-2-line"></i>
                        <span>
                            {{productRef.inCart ? "Remove from Cart" : "Add to Cart"}}
                        </span>
                    </div>
                </button>
                <div class="actions">
                    <NuxtLink :to="`/product/edit/${productRef.id}`" class="edit">
                        <i class="ri-pencil-line"></i>
                        <span>Edit</span>
                    </NuxtLink>
                    
                    <NuxtLink :to="`/product/delete/${productRef.id}`" class="delete">
                        <i class="ri-delete-bin-line"></i>
                        <span>Delete</span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
section { padding: 2.5rem }
.backButton {
    background-color: var(--bg-color);
    border: 2px solid var(--tertiary-bg-color);
    width: max-content;
    display: flex;
    gap: 0.25rem;
    padding: 0.5rem 1.25rem;
    border-radius: 9e9px;
    margin-bottom: 1.75rem;
    cursor: pointer;
    transition: all 150ms ease;
}
.backButton:hover {
    background-color: var(--primary-color);
    border: 2px solid var(--bg-color);
}
.backText {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
}
.product {
    display: flex;
    align-items: center;
}
div.imageContainer {
    width: 50%;
    background-color: var(--secondary-bg-color);
    margin-right: 1.25rem;
    border-radius: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.25rem;
    height: 500px;
}
img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

div.infoContainer {
    width: 50%;
    padding-left: 1.25rem;
}
.productCategory {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 300;
    margin-bottom: 1.5rem;
}
.productName {
    font-size: 2.25rem;
    line-height: 2.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
}
.productPrice {
    font-size: 2.25rem;
    line-height: 2.75rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    color: var(--success-accent-color);
}
.productDesc { margin-bottom: 2.5rem; }

button.cart {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.notInCart {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--primary-color);
    color: white;
    padding: 0.75rem 0;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 150ms ease;
}
.notInCart:hover { background-color: var(--dark-primary-color) }
.inCart {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--tertiary-bg-color);
    color: var(--text-primary-color);
    padding: 0.75rem 0;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 150ms ease;
}
.inCart:hover { background-color: var(--text-tertiary-color) }

div.actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--tertiary-bg-color);
}
.edit {
    display: flex;
    gap: 0.5rem;
    background-color: var(--secondary-bg-color);
    color: var(--text-primary-color);
    padding: 0.75rem 1.25rem;
    border: 1px solid var(--text-tertiary-color);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 150ms ease;
}
.edit:hover { background-color: var(--text-tertiary-color) }
.delete {
    display: flex;
    gap: 0.5rem;
    background-color: var(--error-color);
    color: var(--error-accent-color);
    padding: 0.75rem 1.25rem;
    border: 1px solid var(--error-accent-color);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 150ms ease;
}
.delete:hover {
    background-color: var(--error-accent-color);
    border-color: var(--error-color);
    color: white;
}
</style>