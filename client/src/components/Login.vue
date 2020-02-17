<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="username" name="username" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button type="button" v-on:click="login()">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            submitted: false,
            loggingIn: false
        }
    },
    methods: {
        login() {
            axios.post('http://localhost:3000/login', {
                username: this.username,
                password: this.password
            }).then(() => {
                this.loggingIn = true;
                this.$router.push('/about');
            }).catch(e => {
                if (e.response.status === 401) {
                    alert('Not authenticated')
                }
                else {
                    alert(e);
                    console.log(e)
                }
            });
        }
    }
}
</script>
