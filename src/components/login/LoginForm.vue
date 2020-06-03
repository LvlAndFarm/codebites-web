<template>
    <form @submit="checkForm">

        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input v-model="loginForm.email" class="input" type="email" placeholder="Email here" required="true">
            </div>
        </div>

        <div class="field">
            <label class="label">Password</label>
            <div class="control">
                <input v-model="loginForm.pass" class="input" type="password" placeholder="Password here" required="true">
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link font-circular" :class="loginForm.disabled && 'is-loading'"
                        :disabled="loginForm.disabled"
                        >Submit</button>
            </div>
            <!--            <div class="control">-->
            <!--                <button class="button is-link is-light">Cancel</button>-->
            <!--            </div>-->
        </div>
    </form>
</template>

<script>
    export default {
        name: "LoginForm",
        props: {
            loginForm: Object,
            submitLoginForm: Function,
        },
        methods: {
            checkForm(e) {
                e.preventDefault();
                this.submitLoginForm();
            }
        }
    }
</script>

<style scoped>

</style>