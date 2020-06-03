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
                    <button class="button is-primary is-large font-circular">How does it work?</button>
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

                        <button class="button is-primary is-large is-fullwidth font-circular">Post new listing</button>
                        <br/>
                        <a style="color: indianred; float: right;">
                            <i style="text-align: right;">Report a problem</i>
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
    export default {
        name: "MainView",
        components: {ListingBox},
        data() {
            return {
                listings: this.$store.state.listings,

                // Filters/sorting
                sort: "default",
                budgetRange: [0, 100],
                search: ""
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
        },
        computed: {
            filteredListings() {
                return this.listings
                    .filter(listing => JSON.stringify(listing).toLowerCase().includes(this.search.trim().toLowerCase()))
            }
        },
        methods: {
            getBudgetRangeLabel(val) {
                let curVal = "£" + val;
                return val==100?curVal+"+" : curVal;
            },
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

    .listing-user-avatar {
        height: 30px;
        display: inline-block;
    }

    .listing-user-box {
        margin: auto;
        text-align: center;
    }

    .listing-user-name {
        margin-bottom: 5px;
    }

    .listing-budget-tag {
        margin-left: 5px;
    }
</style>