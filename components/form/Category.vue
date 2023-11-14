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

//////////////// Pre-database code.
// import {category} from "~/composables/constants/category";

// const categories = ref(category);
// const isShowAlert = ref(false);

// const submitCategory = () => {
//     categories.value.push({
//         id: categories.value.length + 1,
//         name: form.value.name
//     });
//     isShowAlert.value = true;
//     form.value.name = "";
//     setTimeout(() => {
//         isShowAlert.value = false;
//     }, 3000);
// }
</script>

<template>
    <section class="flex justify-center py-10">
        <div class="w-500px">
            <h1 class="text-2xl mb-7 font-medium">Create Category</h1>
            <div v-if="isShowAlert" class="p-4 mb-4 text-sm rounded-lg bg-green-100 text-green-800">
                Category created successfully.
            </div>
            <div>
                {{  }}
            </div>
            <form @submit.prevent="createCategory">
                <div class="mb-6">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
                        Name
                    </label>
                    <input type="text" id="name" v-model="form.name" placeholder="Enter category name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <button type="submit" class="bg-primary border border-gray-300 hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 my-3 text-center">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>