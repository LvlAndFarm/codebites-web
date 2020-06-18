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

                        <section>
                            <b-field horizontal label="Title">
                                <b-input name="subject" expanded></b-input>
                            </b-field>

<!--                            <b-field horizontal label="From">-->
<!--                                <b-input name="name" placeholder="Name" expanded></b-input>-->
<!--                                <b-input name="email" type="email" placeholder="nobody@nowhere.com" expanded></b-input>-->
<!--                            </b-field>-->

<!--                            <b-field horizontal label="Topic">-->
<!--                                <b-select placeholder="Select a topic">-->
<!--                                    <option value="1">Bulma</option>-->
<!--                                    <option value="2">Vue.js</option>-->
<!--                                    <option value="3">Buefy</option>-->
<!--                                </b-select>-->
<!--                            </b-field>-->

                            <b-field horizontal label="Description">
                                <b-input type="textarea"></b-input>
                            </b-field>

                            <b-field horizontal label="Tags">
                                <b-taginput
                                        v-model="tags"
                                        :data="filteredTags"
                                        autocomplete
                                        :allow-new="allowNew"
                                        :open-on-focus="openOnFocus"
                                        field="user.first_name"
                                        icon="label"
                                        placeholder="Add a tag"
                                        @typing="getFilteredTags">
                                </b-taginput>
                            </b-field>

                            <b-field horizontal label="Price">
                                <b-field>
                                    <b-input name="price" expanded></b-input>
                                    <b-select placeholder="Currency">
                                        <option>$ (USD)</option>
                                        <option>£ (GBP)</option>
                                        <option>€ (EUR)</option>
                                    </b-select>
                                </b-field>
                            </b-field>

<!--                            <b-field horizontal>&lt;!&ndash; Label left empty for spacing &ndash;&gt;-->
<!--                                <p class="control">-->
<!--                                    <button class="button is-primary">-->
<!--                                        Send message-->
<!--                                    </button>-->
<!--                                </p>-->
<!--                            </b-field>-->

                        </section>

                    </b-step-item>

                    <b-step-item step="2" label="Payment" :clickable="isStepsClickable" :type="{'is-success': isProfileSuccess}">
                        <h1 class="title has-text-centered">Payment/Funds</h1>
                        <section>
                            <p>
                                In order to ensure that both sides of the transaction have a fair experience, we will authorise/hold part of the listing's
                                price once you accept a bidding coder. After you receive the completed work (or 1st milestone), then we'll draw the payment
                                from the authorised funds.
                            </p>

                            <b-field horizontal label="Payment account">
                                <b-select placeholder="Account">
                                    <option>
                                            walid.********@***mail.com
                                    </option>
                                    <option>1209109</option>
                                    <option>1231289</option>
                                </b-select>
                            </b-field>

                            <br/>

<!--                            <v-select :searchable="false" :options="['Canada', 'United States']"></v-select>-->
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



    const tags = ["JavaScript", "React", "Shopify", "Vue", "TypeScript", "C#", "C++", "C", "Firebase", "ExpressJS"];

    export default {
        name: "NewListing",
        components: {ContentPage},
        data() {
            return {
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


                // Tags field
                filteredTags: tags,
                isSelectOnly: false,
                tags: [],
                allowNew: false,
                openOnFocus: false
            }
        },
        methods: {
            getFilteredTags(text) {
                this.filteredTags = tags.filter((option) => {
                    return option.user.first_name
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                })
            }
        }
    }
</script>

<style scoped>
    h1.title {
        color: #363636 !important;
    }
</style>