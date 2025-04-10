<script setup lang="ts">
import type { User } from '@/types/user.ts'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginForm = ref<User>({
  username: '',
  password: '',
})
const userTest: User = {
  username: 'admin',
  password: 'admin',
}

const isDisabled = computed(() => !loginForm.value.username || !loginForm.value.password)

const login = () => {
  if (!isDisabled.value) {
    if (
      loginForm.value.username === userTest.username &&
      loginForm.value.password === userTest.password
    ) {
      router.push('/dashboard')
    } else {
      alert('Pseudo ou mot de passe incorrect')
    }
  }
}
</script>

<template>
  <main>
    <h1>Se connecter</h1>

    <form @submit.prevent="login">
      <input v-model="loginForm.username" type="text" placeholder="Pseudo" />
      <input v-model="loginForm.password" type="password" placeholder="Mot de passe" />
      <button type="submit" :disabled="isDisabled">Login</button>
    </form>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  button {
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #333;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #555;
    }

    &:active {
      background-color: #777;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>
