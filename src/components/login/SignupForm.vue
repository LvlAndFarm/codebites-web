<template>
    <form @submit="checkForm">

        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">First Name</label>
                    <div class="control">
                        <input v-model="signupForm.firstName" class="input" type="text" placeholder="" required="true">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control">
                        <input v-model="signupForm.lastName" class="input" type="text" placeholder="" required="true">
                    </div>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input v-model="signupForm.email" class="input" type="email" placeholder="Email here" required="true">
            </div>
        </div>

<!--        <div class="field">-->
<!--            <label class="label">Password</label>-->
<!--            <div class="control">-->
<!--                <input v-model="signupForm.pass" class="input" type="password" placeholder="Password here" required="true">-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="field">-->
<!--            <label class="label">Confirm Password</label>-->
<!--            <div class="control">-->
<!--                <input v-model="signupForm.passConfirm" class="input" type="password" placeholder="Password here" required="true">-->
<!--            </div>-->
<!--        </div>-->

        <ValidationObserver>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <ValidationProvider rules="required|password:@confirm" v-slot="{ errors }">
                        <input v-model="signupForm.pass" class="input" type="password" placeholder="Password here" required="true">
                        <span style="color: red;">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
            </div>

            <div class="field">
                <label class="label">Confirm password</label>
                <div class="control">
                    <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
                        <input v-model="signupForm.passConfirm" class="input" type="password" placeholder="Password here" required="true">
                        <span style="color: red;">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
            </div>

        </ValidationObserver>


        <b-field label="Country of residence">
            <b-select placeholder="Select a name" v-model="signupForm.countryCode" required>
                <option
                        v-for="(country, code) in countryList"
                        :value="code"
                        :key="code">
<!--                    <img-->
<!--                            alt="United States"-->
<!--                            :src="`http://catamphetamine.gitlab.io/country-flag-icons/3x2/${code.toUpperCase()}.svg`"/>-->
                    {{getUnicodeFlagIcon(code.toUpperCase())}}
                    {{ country }}
                </option>
            </b-select>
        </b-field>

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link font-circular" :class="signupForm.disabled && 'is-loading'"
                        :disabled="signupForm.disabled"
                >Submit</button>
            </div>
            <!--            <div class="control">-->
            <!--                <button class="button is-link is-light">Cancel</button>-->
            <!--            </div>-->
        </div>
    </form>
</template>

<script>
    import getUnicodeFlagIcon from 'country-flag-icons/unicode';
    import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';

    extend('password', {
        params: ['target'],
        validate(value, { target }) {
            return !target || value === target;
        },
        message: 'Password confirmation does not match'
    });

    extend('required', {
        validate (value) {
            return {
                required: true,
                valid: ['', null, undefined].indexOf(value) === -1
            };
        },
        computesRequired: true,
        message: 'This field cannot be empty'
    });



    const countryList = require('country-list');

    export default {
        name: "SignupForm",
        props: {
            signupForm: Object,
            submitSignupForm: Function,
        },
        components: {
            ValidationProvider,
            ValidationObserver
        },
        data() {
            return {
                countryList: countryList.getCodeList()
            }
        },
        methods: {
            checkForm(e) {
                e.preventDefault();
                this.submitSignupForm();
            },

            getUnicodeFlagIcon(e) {
                return getUnicodeFlagIcon(e);
            }
        }
    }
</script>

<style scoped>

</style>