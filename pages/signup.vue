<script lang="ts" setup>
const user = useUser();
if (user.value) {
  await navigateTo("/"); // redirect to profile page
}

const errorMessage = ref<string | null>(null);

const handleSubmit = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  const formData = new FormData(e.target);
  try {
    await $fetch("/api/signup", {
      method: "POST",
      body: {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
      },
      redirect: "manual",
    });
    await navigateTo("/"); // profile page
  } catch (e) {
    const { data: error } = e as {
      data: {
        message: string;
      };
    };
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <UCard class="min-w-[30rem]" style="view-transition-name: auth-card">
    <template #header>
      <h1>Sign Up</h1>
    </template>

    <form
      method="post"
      action="/api/signup"
      @submit.prevent="handleSubmit"
      class="flex flex-col gap-4"
    >
      <UInput type="email" name="email" id="email" placeholder="Email" />
      <UInput
        type="text"
        name="username"
        id="username"
        placeholder="Username"
      />
      <UInput
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <UButton
        style="view-transition-name: auth-card-submit"
        type="submit"
        label="Submit"
        block
      />
      <UAlert
        v-if="errorMessage"
        variant="subtle"
        color="red"
        title="Error"
        :description="errorMessage"
      />
    </form>

    <template #footer>
      <NuxtLink class="text-sm text-gray-500" to="/login">
        Already have an account?
      </NuxtLink>
    </template>
  </UCard>
</template>
