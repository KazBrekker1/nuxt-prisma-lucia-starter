<script lang="ts" setup>
let mode = useColorMode();
const toggleColorMode = () => {
  const mode = useColorMode();
  mode.preference = mode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <NuxtLayout>
    <UContainer>
      <NuxtPage />
    </UContainer>
    <UButton
      class="fixed bottom-4 right-4"
      @click="toggleColorMode"
      :variant="mode.value === 'dark' ? 'soft' : 'solid'"
      :icon="mode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
      :label="mode.value === 'dark' ? 'Light' : 'Dark'"
      :color="mode.value === 'dark' ? 'primary' : 'black'"
    />
    <UNotifications />
  </NuxtLayout>
</template>
