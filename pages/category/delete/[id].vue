<script lang="ts" setup>
import { useCategoryStore } from "~/stores/category";

const { baseStorageUrl } = useAppConfig();
const isLoading = ref(true);
const categoryStore = useCategoryStore();
const route = useRoute();

const category = ref({});

const id = typeof route.params.id === 'string' ? parseInt(route.params.id) : null;

categoryStore.getCategoryList().then(() => {
    category.value = categoryStore.categories.find((item: any) => item.id === id);
    if(!category.value){
        alert(`Category with ID ${id} not found! Press OK to redirect to product page.`);
        useRouter().push({ path: "/product" });
        return;
    }
    isLoading.value = false;
});


const deleteCategory = () => {
    categoryStore.deleteCategory(id).then(() => {
        if(!categoryStore.status){
            alert(categoryStore.message);
            return;
        }
        alert("Category deleted successfully.\nPress OK to return to the product page.");
        useRouter().push({ path: "/product" });
    });
}
</script>

<template>
    <h1 v-if="isLoading">
        Loading category, please wait...
    </h1>
    <div v-else>
        <h1>
            Are you sure you want to delete {{ category.name }}?
        </h1>
        <div class="choice">
            <button @click="deleteCategory" class="delete">
                <i class="ri-delete-bin-2-line"></i>
                <span>Delete</span>
            </button>
            <NuxtLink to="/product" class="cancel">
                <i class="ri-close-line"></i>
                <span>Cancel</span>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    margin: 5rem;
    text-align: center;
}
img {
    width: auto;
    height: auto;
    max-width: 20rem;
    max-height: 20rem;

    margin: 0 auto 2.5rem;
    border: 2px solid var(--text-tertiary-color);
    border-radius: 1.5rem;
}

.choice {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    font-size: x-large;
    border-top: 2px solid var(--text-tertiary-color);
    padding-top: 2.5rem;
    margin-bottom: 2.5rem;
}
.delete {
    display: flex;
    background-color: var(--error-color);
    border: 2px solid var(--error-accent-color);
    color: var(--error-accent-color);
    padding: 0.5rem 1.25rem;
    gap: 1rem;
    border-radius: 9e9px;
    cursor: pointer;
    transition: all 150ms ease;
}
.delete:hover {
    background-color: var(--error-accent-color);
    color: white;
}
.cancel {
    display: flex;
    background-color: var(--tertiary-bg-color);
    color: var(--text-primary-color);
    border: 2px solid var(--tertiary-bg-color);
    padding: 0.5rem 1.25rem;
    gap: 1rem;
    border-radius: 9e9px;
    cursor: pointer;
    transition: all 150ms ease;
}
.cancel:hover {
    background-color: var(--translucent-primary-color);
    color: white;
}
</style>