<script lang="ts" setup>
const { baseStorageUrl } = useAppConfig();
const props = defineProps({
    product: {
        type: Object,
        default: {}
    }
});
</script>

<!-- TODO: Add quantity count/modification -->
<template>
    <div class="outer">
        <div class="imageContainer">
            <img :src="baseStorageUrl + props.product.image" :alt="'Picture of ' + props.product.name"/>
        </div>
        <div class="infoContainer">
            <h5 class="productName">{{props.product.name}}</h5>
            <p class="productPrice">${{props.product.price}}</p>

            <!-- give me a good class name for the below div -->
            <div class="productControls">
                <div class="amountControls">
                    <button class="adjustAmount">-</button>
                    <div class="amount">1</div>
                    <button class="adjustAmount">+</button>
                </div>
                <button @click="$emit('removeFromCart',props.product.id)" class="removeFromCart">
                    <i class="ri-delete-bin-7-fill removeFromCart"></i>
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
    padding: 0.25rem 1rem 0.25rem 0.5rem;
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