<template>
    <div class="container is-fluid" style="max-width: 400px; margin: auto; margin-top: 5%;">
        <h3 class="title is-h3" style="margin: auto;">Sign in to continue</h3>
        <div class="tabs">
            <ul>
                <li @click="setSignupToggle(false)" :class="!signupToggle && 'is-active'"><a>Login</a></li>
                <li @click="setSignupToggle(true)" :class="signupToggle && 'is-active'"><a>Signup</a></li>
            </ul>
        </div>
        <div class="box" v-if="!signupToggle">

            <div class="notification is-danger" v-if="loginForm.error">
                <button @click="hideLoginError()" class="delete"></button>
                Login error: {{loginForm.error}}
            </div>

            <login-form :login-form="loginForm" :submit-login-form="submitLoginForm"/>
        </div>

        <div class="box" v-if="signupToggle">

            <div class="notification is-danger" v-if="signupForm.error">
                <button @click="hideLoginError()" class="delete"></button>
                Signup error: {{signupForm.error}}
            </div>

            <signup-form :signup-form="signupForm" :submit-signup-form="submitSignupForm"/>
        </div>

    </div>
</template>

<script>
    import LoginForm from "../components/login/LoginForm";
    import SignupForm from "../components/login/SignupForm";
    const fb = require('../plugins/firebase.js');

    export default {
        name: "Login",
        components: {SignupForm, LoginForm},
        data() {
            return {
                signupToggle: false,

                loginForm: {
                    email: "",
                    pass: "",
                    disabled: false,
                    error: null
                },

                signupForm: {
                    email: "",
                    pass: "",
                    disabled: false,
                    error: null
                },

            }
        },
        mounted() {
            if (this.$route.path.includes("/signup")) {
                this.signupToggle = true;
            }
        },
        methods: {
            async submitLoginForm() {
                this.$store.dispatch("setLoading", true);

                let {email, pass} = this.loginForm;

                this.loginForm.disabled = true;
                let authResult;
                try {
                    authResult = await fb.auth.signInWithEmailAndPassword(email, pass);
                } catch (e) {
                    console.log(e);
                    this.loginForm.error = e.message;
                }
                console.log(authResult);
                if (authResult) {
                    this.$store.commit('setCurrentUser', authResult.user);
                    this.$router.push('/')
                }

                this.loginForm.disabled = false;
                this.$store.dispatch("setLoading", false);
            },

            async submitSignupForm() {
                this.$store.dispatch("setLoading", true);
                console.log(this.signupForm);

                const {email, pass, countryCode, firstName, lastName } = this.signupForm;
                // return;
                this.signupForm.disabled = true;

                fb.auth.createUserWithEmailAndPassword(email, pass).then(async user => {
                    await user.user.updateProfile({
                        displayName: `${firstName} ${lastName}`
                    });



                    this.$store.commit('setCurrentUser', user.user);

                    // create user obj
                    fb.usersCollection.doc(user.user.uid).set({
                        email,
                        firstName,
                        lastName,
                        countryCode
                    }).then(() => {
                        this.$store.dispatch('fetchUserProfile');
                        this.$router.push('/');
                        this.$store.dispatch("setLoading", false);
                        this.signupForm.disabled = true;
                    }).catch(err => {
                        console.log(err);

                    })
                }).catch(err => {
                    console.log(err)
                })
            },

            hideLoginError() {
                this.loginForm.error=null;
            },

            setSignupToggle(toggle) {
                this.signupToggle = toggle;
                if (toggle) {
                    this.$router.push("/signup");
                } else {
                    this.$router.push("/login");
                }
            }
        }
    }
</script>

<style scoped>

</style>