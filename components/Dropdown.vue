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
    <div class="dropdown-container">
        <div class="dropdown-text-div" @click="showList = !showList">
            <span class="dropdown-text">
                {{ selectedCategory === "" ? "Filter by category" : selectedCategory }}
            </span>
            <i :class="`ri-arrow-down-s-line dropdown-arrow ${showList ? 'rotate-180' : 'rotate-0'}`"></i>
        </div>

        <!-- Dropdown menu -->
        <div v-show="showList" class="dropdown-menu">
            <ul class="dropdown-list">
                <li>
                    <div class="dropdown-entry">
                        <span class="dropdown-entry-select" @click="onPick('')">
                            All
                        </span>
                    </div>
                </li>
                <li v-for="(item, index) in categories" :key="index">
                    <hr>
                    <div class="dropdown-entry">
                        <span class="dropdown-entry-select" @click="onPick(item?.name)">
                            {{ item?.name }}
                        </span>
                        <NuxtLink :to="'/category/rename/' + item?.id" class="dropdown-entry-rename">
                            <i class="ri-pencil-line"></i>
                        </NuxtLink>
                        <NuxtLink :to="'/category/delete/' + item?.id" class="dropdown-entry-delete">
                            <i class="ri-delete-bin-line"></i>
                        </NuxtLink>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.dropdown-container {
    position: relative;
    user-select: none;
    width: 20rem;
}
div.dropdown-text-div {
    border: 1px solid var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    gap: 1rem;
    cursor: pointer;
    width: 100%;
}

i.dropdown-arrow {
    color: var(--primary-color);
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
    transition: all 150ms ease;
}

div.dropdown-menu {
    z-index: 10;
    background-color: var(--bg-color);
    border: 1px solid var(--text-secondary-color);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    width: 100%;
    position: absolute;
    top: 3.5rem;
}

ul.dropdown-list {
    padding: 0.5rem 0;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--text-secondary-color);
}

hr {
    height: 1px;
    border-color: var(--translucent-primary-color);
    margin: 0.5rem 0;
}

div.dropdown-entry {
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
    padding: 0.5rem 0;
}

span.dropdown-entry-select {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.375rem;
}
span.dropdown-entry-select:hover {
    background-color: var(--ghost-primary-color);
    border-color: var(--primary-color);
    transition: all 150ms ease;
    cursor: pointer;
}
.dropdown-entry-rename {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: large;
    padding: 0.3em;
    border-radius: 0.375rem;
    border: 1px solid transparent;

    cursor: pointer;
    transition: all 150ms ease;
}
.dropdown-entry-rename:hover {
    background-color: var(--ghost-primary-color);
    border-color: var(--primary-color);
    transition: all 150ms ease;
}

.dropdown-entry-delete {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: large;
    padding: 0.3em;
    border-radius: 0.375rem;

    color: var(--error-accent-color);
    cursor: pointer;
    transition: all 150ms ease;
}
.dropdown-entry-delete:hover {
    background-color: var(--error-accent-color);
    color: white;
    transition: all 150ms ease;
}

.rotate-0 { transform: rotate(0deg); }
.rotate-180 { transform: rotate(180deg); }
</style>