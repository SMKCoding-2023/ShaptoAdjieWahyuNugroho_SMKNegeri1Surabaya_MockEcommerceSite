<script lang="ts" setup>
import { useCategoryStore } from '~/stores/category';
import { useStorageStore } from "~/stores/storage";
import { useProductsStore } from '~/stores/products';
import type { FormField } from '~/types/product';

const categoryStore = useCategoryStore();
const storageStore = useStorageStore();
const productStore = useProductsStore();

const isSuccess = ref(false);
const isShowAlert = ref(false);
const message = ref("");
const router = useRouter();
const isLoading = ref(false);

const categories = ref(categoryStore.categories);
categoryStore.getCategoryList();

const formCreateProduct = [
    { name: "name", label: "Name", type: "text", value: "", placeholder: "Water bottle", required: true },
    { name: "desc", label: "Description", type: "text", value: "", placeholder: "This 1-liter water bottle will keep you hydrated", required: true },
    { name: "price", label: "Price in USD", type: "number", value: "", placeholder: "10", required: true },
    { name: "image", label: "Image", type: "file", value: {}, placeholder: "", required: true },
    { name: "category", label: "Category", type: "select", value: "", placeholder: "", required: true },
];

const createProduct = async () =>
{
    isLoading.value = true;
    let file = formCreateProduct.find((item) => item.type === "file");
    file = await uploadFile(file?.value);
    const result: { [key: string]: any } = {};
    formCreateProduct.forEach((item: FormField) =>
    {
        if (item.name)
        {
            result[item.name] = item.value;
        }
    })
    result.image = file;
    await productStore.createProduct(result);

    isSuccess.value = productStore.status;
    message.value = productStore.message;
    isShowAlert.value = true;
    isLoading.value = false;
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    if (productStore.status)
    {
        setTimeout(() =>
        {
            router.push({ path: "/product" });
        }, 1000);
    }
}

const uploadFile = async (formFile: any) =>
{
    const file = formFile?.target?.files[0];
    const payload = new FormData();
    payload.append("file", file);
    const pathname = `${Date.now().toString()}.${file.type.split("/")[1]}`;
    await storageStore.uploadFile(pathname, payload);
    if (storageStore.status)
    {
        return storageStore.storage.Key;
    }
}
</script>


<template>
    <section>
        <div>
            <h1>Create Products</h1>
            <div v-if="isShowAlert" :class="isSuccess ? 'success' : 'fail'" role="alert">
                {{ message }}
            </div>
            <form @submit.prevent="createProduct">
                <div class="formEntry" v-for="(item, index) in formCreateProduct" :key="index">
                    <label :for="item.name" class="formEntryName">
                        {{ item.label }}
                    </label>
                    <select v-if="item.type === 'select'" :id="item.name" v-model="item.value"
                        class="formEntrySelect">
                        <option disabled value="">Choose Category</option>
                        <option v-for="(category, index) in categories" :key="index" :value="category.name">
                            {{ category.name }}
                        </option>
                    </select>
                    <input v-else-if="item.type === 'file'" :type="item.type" :id="item.name" @change="item.value = $event"
                        class="formEntryFile"
                        :required="item.required">
                    <input v-else :type="item.type" :id="item.name" v-model="item.value"
                        class="formEntryText"
                        :placeholder="item.placeholder" :required="item.required">
                </div>
                <button type="submit" class="submit">
                    <span v-if="!isLoading">Submit</span>
                    <div v-else class="loadingContainer">
                        <svg aria-hidden="true" class="loading"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span>Loading</span>
                    </div>
                </button>
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
section > div { width: 500px }
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
.formEntry { margin-bottom: 1.5rem }
.formEntryName {
    /* block mb-2 text-sm font-medium text-gray-900 */
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: var(--text-color);
}
.formEntrySelect {
    background-color: var(--secondary-bg-color);
    border: 1px solid var(--text-secondary-color);
    color: var(--text-color);
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.5rem;
    border: 1px solid transparent;
    padding: 0.625rem;
    width: 100%;
}
.formEntrySelect:focus{
    outline: none;
    border: 1px solid var(--primary-color);
}
.formEntryFile {
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--text-color);
    border: 1px solid var(--text-secondary-color);
    border-radius: 0.5rem;
    cursor: pointer;
    background-color: var(--secondary-bg-color);
    padding: 0.75rem;
}
.formEntryFile:focus {
    outline: none;
}
.formEntryText {
    background-color: var(--secondary-bg-color);
    border: 1px solid var(--text-secondary-color);
    color: var(--text-color);
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.5rem;
    display: block;
    width: 100%;
    padding: 0.625rem;
}
.formEntryText:focus {
    border: 1px solid var(--primary-color);
}

button.submit {
    color: var(--text-inverse-color);
    background-color: var(--primary-color);
    font-weight: 500;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    text-align: center;
    @media (min-width: var(--size-small)) { width: auto; } /* sm:w-auto */
}
button.submit:hover { background-color: var(--dark-primary-color); }
button.submit:focus { outline: none; border: 1px solid var(--primary-color); }

.loadingContainer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
svg.loading {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    color: var(--text-secondary-color);
    animation: spin 1s linear infinite;
    fill: var(--tertiary-bg-color);
}
</style>