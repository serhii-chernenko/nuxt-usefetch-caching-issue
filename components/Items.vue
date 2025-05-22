<template>
  <h2>Inserted Items.vue component</h2>
  <template v-if="items.length">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.title }}</li>
    </ul>
    <p>
      <button @click="deleteItems">Delete items</button>
    </p>
  </template>
  <p v-else><strong>No items</strong></p>
  <p>
    <button @click="addItem" :disabled="pending">Add item</button>
  </p>
</template>

<script setup lang="ts">
const { data: cachedItems } = useNuxtData("items")

const { data: items, error, refresh } = await useFetch("/api/items", {
  key: "items",
  default: () => cachedItems.value,
  lazy: !!cachedItems.value,
  dedupe: 'defer',
});

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
  });
}

const pending = shallowRef<boolean>(false)

const addItem = async () => {
  try {
    pending.value = true;

    await $fetch("/api/items", {
      method: "put"
    });
    await refresh();
  } catch (exception: any) {
    console.error(exception);
    throw createError({
      statusCode: exception.statusCode,
      statusMessage: exception.statusMessage,
    })
  } finally {
    pending.value = false;
  }
};

const deleteItems = async () => {
  try {
    pending.value = true;

    await $fetch("/api/items", {
      method: "delete"
    });
    await refresh();
  } catch (exception: any) {
    console.error(exception);
    throw createError({
      statusCode: exception.statusCode,
      statusMessage: exception.statusMessage,
    })
  } finally {
    pending.value = false;
  }
};
</script>
