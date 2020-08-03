<template>
    <div>
        <section class="hero is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Codebites
                    </h1>
                    <h2 class="subtitle">
                        Coding gigs for all
                    </h2>
<!--                    <button class="button is-primary is-large font-circular" @click="()=>{isIntroModalActive=true}">How does it work?</button>-->

                    <b-modal :active.sync="isIntroModalActive"
                             has-modal-card
                             trap-focus
                             :destroy-on-hide="false"
                             aria-role="dialog"
                             aria-modal>
                        <intro-modal/>
                    </b-modal>
                </div>
            </div>
        </section>

        <div class="container is-fluid">
            <div class="columns">
                <div class="column">
                    <section class="section">
                        <b-field>
                            <b-input placeholder="Search..."
                                     type="search"
                                     icon="magnify"
                                     size="is-large"
                                     v-model="search"
                                    expanded>
                            </b-input>
                            <p class="control">
                                <button class="button is-primary is-large font-circular">Search</button>
                            </p>
                        </b-field>

                        <listing-box v-for="(listing, index) in filteredListings" :listing="listing" :key="index"/>

                        <div class="box" v-if="filteredListings.length<1">
                            No results found :(
                        </div>

                    </section>
                </div>

                <div class="column is-3">
                    <section class="section">

                        <div class="box">
                            <b-field label="Sort by">
                                <b-select placeholder="Sort by" v-model="sort">
                                    <option value="default">Relevant</option>
                                    <option value="date_desc">Most Recent</option>
                                </b-select>
                            </b-field>

                            <b-field label="Price range">
                                <b-slider v-model="budgetRange" type="is-primary" :min="0" :max="100" :step="1"
                                            :custom-formatter="getBudgetRangeLabel" lazy>
                                </b-slider>
                            </b-field>
                        </div>

                        <router-link to="/listing/new">
                            <button class="button is-primary is-large is-fullwidth font-circular">Post new listing</button>
                        </router-link>

                        <br/>
                        <a style="color: indianred; float: right;">
                            <i style="text-align: right;" @click="reportBug()">Report a problem</i>
                        </a>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // const snoowrap = require('snoowrap');


    import ListingBox from "../components/common/listings/ListingBox";
    import IntroModal from "../components/home/intro-modal";
    export default {
        name: "MainView",
        components: {IntroModal, ListingBox},
        data() {
            return {


                // Filters/sorting
                sort: "default",
                budgetRange: [0, 100],
                search: "",

                isIntroModalActive: false,
            }
        },
        mounted() {
            // const r = new snoowrap({
            //     userAgent: 'Codebites',
            //     clientId: 'CuQu4FnT8sV5sw',
            //     clientSecret: 'pDqwjmlRT4wL5D7LKN7ksI107TM',
            //     accessToken: '35031036-n8YAYKTWIkT8rpBy0QbWDMrkiyw'
            // });
            // Printing a list of the titles on the front page
            // r.getHot().map(post => post.title).then(console.log);
            this.$store.dispatch("fetchListings");
        },
        computed: {
            filteredListings() {
                return this.listings
                    .filter(listing => listing.status==="listed")
                    .filter(listing => JSON.stringify(listing).toLowerCase().includes(this.search.trim().toLowerCase()))
                    .filter(listing => listing.price.amount > this.budgetRange[0])
                    .filter(listing => this.budgetRange[1] === 100 ||listing.price.amount < this.budgetRange[1])
            },
            listings() {
                return this.$store.state.listings
            }
        },
        methods: {
            getBudgetRangeLabel(val) {
                let curVal = "£" + val;
                return val==100?curVal+"+" : curVal;
            },

            reportBug() {
                this.$buefy.dialog.prompt({
                    message: `Report a bug`,
                    inputAttrs: {
                        placeholder: 'Write a message here...',
                        maxlength: 1000
                    },
                    trapFocus: true,
                    onConfirm: () => this.$buefy.toast.open(`Bug reported, thank you!`)
                })
            }
        }
    }
</script>

<style>
.icon-label {
    margin-left: 5px;
}
    .report-btn {
        color: red;
    }


    .listing-budget-tag {
        margin-left: 5px;
    }
</style>