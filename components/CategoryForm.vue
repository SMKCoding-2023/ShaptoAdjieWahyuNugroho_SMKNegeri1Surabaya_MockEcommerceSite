<script lang="ts" setup>
import { useCategoryStore } from '~/stores/category';
const categoryStore = useCategoryStore();

const isSuccess = ref(false);
const isLoading = ref(false);
const isShowAlert = ref(false);
const message = ref("");
const router = useRouter();
const form = ref({ name: "" });

categoryStore.getCategoryList();
const categories = storeToRefs(categoryStore);

const createCategory = async () =>
{
    isLoading.value = true;
    
    let payload = {
        name: form.value.name
    };
    await categoryStore.createCategory(payload);

    isSuccess.value = categoryStore.status;
    message.value = categoryStore.message;
    isShowAlert.value = true;
    isLoading.value = false;
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    if (categoryStore.status)
    {
        setTimeout(() =>
        {
            router.push({ path: "/product" });
        }, 1000);
    }
}
</script>

<template>
    <section>
        <div class="w-500px">
            <h1>Create Category</h1>
            <div v-if="isShowAlert && isSuccess" class="success">
                Category created successfully.
            </div>
            <div v-if="isShowAlert && !isSuccess" class="fail">
                Failed to create category: {{ message }}
            </div>
            <form @submit.prevent="createCategory">
                <div class="mb-6">
                    <label for="name" class="name">
                        Name
                    </label>
                    <input type="text" id="name" v-model="form.name" placeholder="Enter category name" class="name">
                    <button type="submit" class="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped>
section {
    display: flex;
    justify-content: center;
    padding: 2.5rem 0;
}
section > div { width: 500px; }
h1 {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 1.75rem;
    font-weight: 500;
}
.success {
    padding: 1rem;
    margin-bottom: 1rem;
    font-size: 0.75rem;
    line-height: 1rem;
    border: 1px solid var(--success-accent-color);
    border-radius: 0.5rem;
    background-color: var(--success-color);
    color: var(--success-accent-color);
}
.fail {
    padding: 1rem;
    margin-bottom: 1rem;
    font-size: 0.75rem;
    line-height: 1rem;
    border: 1px solid var(--error-accent-color);
    border-radius: 0.5rem;
    background-color: var(--error-color);
    color: var(--error-accent-color);
}
label.name {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--text-color);
}
input.name {
    background-color: var(--secondary-bg-color);
    border: 1px solid var(--secondary-text-color);
    color: var(--text-color);
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.5rem;
    display: block;
    width: 100%;
    padding: 0.625rem;
}
input.name:focus { border: 1px solid var(--primary-color) }

button.submit {
    background-color: var(--primary-color);
    border: 1px solid var(--secondary-text-color);
    font-weight: 500;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    margin: 0.75rem 0;
    text-align: center;

    @media (min-width: var(--size-small)) { width: auto; } /* sm:w-auto */
}
button.submit:hover { background-color: var(--translucent-primary-color); }
button.submit:focus {
    outline: none;
    border: 1px solid var(--primary-color);
}
</style>