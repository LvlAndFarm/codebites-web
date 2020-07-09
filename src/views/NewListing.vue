<template>
    <content-page>
        <template v-slot:main>
            <section>
                <b-steps
                        v-model="activeStep"
                        :animated="isAnimated"
                        :rounded="isRounded"
                        :has-navigation="hasNavigation"
                        :icon-prev="prevIcon"
                        :icon-next="nextIcon"
                        :label-position="labelPosition"
                        :mobile-mode="mobileMode">
                    <b-step-item step="1" label="Details" :clickable="isStepsClickable">
                        <h1 class="title has-text-centered">Listing Details</h1>

                        <details-form :listing-details="listingDetails"/>

                    </b-step-item>

                    <b-step-item step="2" label="Payment" :clickable="isStepsClickable" :type="{'is-success': isProfileSuccess}">
                        <h1 class="title has-text-centered">Payment/Funds</h1>
                        <section>
                            <p>
                                In order to ensure that both sides of the transaction have a fair experience, we will authorise/hold part of the listing's
                                price once you accept a bidding coder. After you receive the completed work (or 1st milestone), then we'll draw the payment
                                from the authorised funds.
                            </p>

                            <br/>

                            <b-field horizontal label="Total amount">
                                <b-field>
                                    <b-input name="price" expanded value="300" :disabled="true"></b-input>
                                    <p class="control">
                                        <span class="button is-static">£ (GBP)</span>
                                    </p>
                                </b-field>
                            </b-field>

                            <b-field horizontal label="Payment account">
                                <v-select :clearable="false" :searchable="false" :options="paymentOptions">
                                    <template v-slot:option="option">
                                        <span><img class="payment-option-dropdown" :src="option.icon"/> </span>
                                        {{ option.label }}
                                    </template>

                                    <template #selected-option="option">
                                        <span><img class="payment-option-selected" :src="option.icon"/> </span>
                                        {{ option.label }}
                                    </template>

                                    <template #list-footer>
<!--                                        <li style="text-align: center">-->
                                        <a aria-label="reply" @click="addPaymentMethod">
                                            <b-icon class="payment-option-add" pack="fas" icon="plus"></b-icon>
                                            <span class="icon-label">Add new payment method</span>
                                        </a>
<!--                                        </li>-->
                                    </template>
                                </v-select>
                            </b-field>

                            <br/>

<!--                            <v-select :searchable="false" :options="paymentOptions">-->
<!--                                <template v-slot:option="option">-->
<!--                                    <span><img class="payment-option" :src="option.icon"/> </span>-->
<!--                                    {{ option.label }}-->
<!--                                </template>-->

<!--                                <template #selected-option="option">-->
<!--                                    <span><img class="payment-option" :src="option.icon"/> </span>-->
<!--                                    {{ option.label }}-->
<!--                                </template>-->
<!--                            </v-select>-->
                        </section>
                    </b-step-item>

                    <b-step-item :step="showSocial ? '4' : '3'" label="Finish" :clickable="isStepsClickable" disabled>
                        <h1 class="title has-text-centered">Finish</h1>
                        Lorem ipsum dolor sit amet.
                    </b-step-item>

                    <template
                            v-if="true"
                            slot="navigation"
                            slot-scope="{previous, next}">
                        <b-button
                                outlined
                                type="is-danger"
                                :disabled="previous.disabled"
                                @click.prevent="previous.action">
                            Previous
                        </b-button>
                        &nbsp;
                        <b-button
                                outlined
                                type="is-success"
                                :disabled="next.disabled"
                                @click.prevent="next.action">
                            Next
                        </b-button>
                    </template>
                </b-steps>
            </section>
        </template>
    </content-page>
</template>

<script>
    import ContentPage from "../components/common/pages/ContentPage";

    import "vue-select/dist/vue-select.css";
    import DetailsForm from "../components/common/listings/DetailsForm";





    export default {
        name: "NewListing",
        components: {DetailsForm, ContentPage},
        data() {
            return {
                listingDetails: {
                    title: "",
                    description: "",
                    price: {
                        amount: "",
                        currency: "gbp"
                    },
                    // currency: "GBP",
                },

                activeStep: 0,

                showSocial: false,
                isAnimated: true,
                isRounded: true,
                isStepsClickable: false,

                hasNavigation: true,
                customNavigation: false,
                isProfileSuccess: false,

                prevIcon: 'chevron-left',
                nextIcon: 'chevron-right',
                labelPosition: 'bottom',
                mobileMode: 'minimalist',

                // Payment accounts:
                paymentOptions: [
                    {
                        label: "walid.*******@***mail.com",
                        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/PayPal_Logo_Icon_2014.svg/26px-PayPal_Logo_Icon_2014.svg.png",
                    },
                    {
                        label: "BANK 99-88-77 21313123",
                        icon: "https://cdn.onlinewebfonts.com/svg/img_489946.png",
                    }
                ]
            }
        },
        methods: {

            addPaymentMethod() {
                this.$buefy.dialog.prompt({
                    message: `Add payment method`,
                    inputAttrs: {
                        placeholder: 'Write a message here...',
                        maxlength: 1000
                    },
                    trapFocus: true,
                    onConfirm: (value) => {
                        this.paymentOptions.push({
                            label: value
                        });
                        this.$buefy.toast.open(`Payment method added`);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    h1.title {
        color: #363636 !important;
    }

    .payment-option-selected {
        height: 23px;
        padding-top: 3px;
        margin-right: 8px;
        padding-left: 4px;
    }

    .payment-option-dropdown {
        height: 23px;
        padding-top: 3px;
        margin-right: 8px;
        /*padding-left: 4px;*/
    }

    .payment-option-add {
        padding-top: 3px;
        margin-right: 16px;
        padding-left: 30px;
    }
</style>