<script lang="ts" setup>
import { useCategoryStore } from "~/stores/category";
const categoryStore = useCategoryStore();

categoryStore.getCategoryList();
const categories = ref(categoryStore.categories);
const selectedCategory = ref("");
const showList = ref(false);
const emit = defineEmits(["selectedCategory"]);

const onPick = (category: string) => {
    showList.value = false;
    emit("selectedCategory", category);
    selectedCategory.value = category;
}
</script>

<template>
    <div class="relative select-none">
        <div class="border border-primary flex items-center justify-center px-3 py-2 rounded-lg gap-4 cursor-pointer w-full" @click="showList = !showList">
            <span class="text-primary font-medium">
                {{ selectedCategory === "" ? "Filter by category" : selectedCategory }}
            </span>
            <i :class="`ri-arrow-down-s-line text-primary text-xl text-bold transition duration-300 ${showList ? 'rotate-180' : 'rotate-0'}`"></i>
        </div>

        <!-- Dropdown menu -->
        <div v-show="showList" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-full absolute top-14">
            <ul class="py-2 text-sm text-gray-700">
                <li>
                    <span class="block px-4 py-2 hover:bg-primary hover:text-white transition duration-200 cursor-pointer"
                      @click="onPick('')">
                        All
                    </span>
                </li>
                <li v-for="(item, index) in categories" :key="index">
                    <span class="block px-4 py-2 hover:bg-primary hover:text-white transition duration-200 cursor-pointer"
                      @click="onPick(item?.name)">
                        {{ item?.name }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>