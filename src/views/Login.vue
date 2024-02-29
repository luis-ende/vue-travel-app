<template>
    <div class="login">
        <form class="form" @submit.prevent="login">
            <h1>Login</h1>
            <label for="username">Username</label>
            <input v-model="username" type="text" class="input">
            <label for="password">Password</label>
            <input v-model="password" type="password" class="input">
            <button class="btn">Login</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            login() {
                // auth user against API
                window.user = this.username
                const redirectPath = this.$route.query.redirect || '/protected'
                this.$router.push(redirectPath)

            }
        }
    }

    // Con Options API
    /* setup(){
        const username = ref('')
        const password = ref('')
        const router = useRouter()
        const route = useRoute()
        const login = () => {
            window.user = username.value
            const redirectPath = route.query.redirect || '/protected'
            router.push(redirectPath)
        }
        return {username, password, login}
    }, */
</script>