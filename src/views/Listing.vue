<template>
    <content-page>
        <template v-slot:main>
            <i>{{createdOn}}</i>

            <h3 class="title is-3">
                {{listing.title}}
            </h3>

            <nl2br tag="p" :text="listing.description||''"></nl2br>

            <br/>
            <!--        <p>Reward: {{listing.price.amount}} {{listing.price.currency.toUpperCase()}}</p>-->

            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Bidders ({{bidders.length}})
                    </p>
                    <a class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                    </a>
                </header>
                <div class="card-content">
                    <div class="content">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>User</th>
                                <th>Rating</th>
                                <th v-if="isUserPoster">Profile</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="bidder in bidders" v-bind:key="bidder.email">
                                <th>{{bidder.email}}</th>
                                <th>{{rating(bidder)}}%</th>
                                <th v-if="isUserPoster"><b-button type="is-primary">View</b-button></th>
                            </tr>
<!--                            <tr>-->
<!--                                <th>A****h</th>-->
<!--                                <th>98%</th>-->
<!--                            </tr>-->
<!--                            <tr>-->
<!--                                <th>A****h</th>-->
<!--                                <th>98%</th>-->
<!--                            </tr>-->
<!--                            <tr>-->
<!--                                <th>A****h</th>-->
<!--                                <th>98%</th>-->
<!--                            </tr>-->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <edit-listing-modal :is-active.sync="isEditModalActive" :listing.sync="listing"/>

            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        About this post
                    </p>
                    <a class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                    </a>
                </header>
                <div class="card-content">
                    <div class="content">
                        <ul>
                            <li>Reward: {{price}}</li>
                            <li>Added on: {{parseTimestamp(listing.created_on)}}</li>
                            <li>Modified on: {{parseTimestamp(listing.modified_on)}}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <br/>

            <nav class="level">

                <div class="level-left">
                    <p class="level-item" v-if="!isUserPoster">
                        <a class="button is-danger">Report</a>
                    </p>

                    <p class="level-item" v-if="isUserPoster">
                        <a class="button is-danger">Delete</a>
                    </p>
                </div>

                <div class="level-right">
                    <p class="level-item" v-if="isUserPoster">
                        <a class="button is-primary" @click="()=>{isEditModalActive=true}">Edit Listing</a>
                    </p>

                    <p class="level-item" v-if="!isUserPoster">
                        <a class="button is-primary">Message</a>
                    </p>
                    <p class="level-item" v-if="!hasBidden && !isUserPoster">
<!--                        <a class="button is-success" :class="hasBidden && 'is-disabled'" @click="bidUser">Bid Now</a>-->
                        <b-button type="is-success" :disabled="hasBidden" @click="bidUser">Bid now</b-button>
                    </p>
                    <p class="level-item" v-if="hasBidden && !isUserPoster">
                        <!--                        <a class="button is-success" :class="hasBidden && 'is-disabled'" @click="bidUser">Bid Now</a>-->
                        <b-button type="is-danger" @click="cancelBid">Cancel bid</b-button>
                    </p>
                </div>
            </nav>
        </template>

        <template v-slot:rightcol>
            <user-box :show-details="true" :user="user"/>
        </template>
    </content-page>
</template>

<script>
    import ContentPage from "../components/common/pages/ContentPage";
    import moment from 'moment';
    import UserBox from "../components/common/UserBox";
    import EditListingModal from "../components/common/listings/EditListingModal";
    const fb = require("../plugins/firebase");

    export default {
        name: "Listing",
        components: {EditListingModal, UserBox, ContentPage},
        data() {
            return {
                selectedProfile: {},


                linkedid: this.$route.params.linkedid,
                listing: {
                    bidders: []
                },
                user: null,

                bidders: [],

                isEditModalActive: false
            }
        },
        async mounted() {
            await this.$store.dispatch("setLoading", true);

            await this.loadListing();
            await this.loadUser();

            await this.loadBiddersInfo();
            await this.$store.dispatch("setLoading", false);
        },
        computed: {
            price() {
                if (this.listing && this.listing.price) return (this.listing.price.amount + " " + this.listing.price.currency.toUpperCase());
                return "";
            },
            createdOn() {
                if (!this.listing || !this.listing.created_on) return null;

                return moment(this.listing.created_on.toDate()).fromNow();
            },
            userProfile: function() { return this.$store.state.userProfile },

            hasBidden() { return this.listing.bidders.includes(this.userProfile._id) },

            isUserPoster() { return this.listing.user_id===this.userProfile._id },
        },
        methods: {
            async loadListing() {
                let snap = await fb.listingsCollection.where("_linkedid", "==", this.linkedid).get();
                if (!snap.empty) {
                    // this.listingId = snap.docs[]
                    this.listing = snap.docs[0].data();
                }
            },

            async loadUser() {
                const uid = this.listing.user_id;
                if (uid) {
                    let snap = await fb.usersCollection.doc(uid).get();
                    if (snap.exists) {
                        this.user = snap.data();
                    }
                }
            },

            parseTimestamp(ts) {
                if (!ts) return "";
                return moment(ts.toDate()).toString();
            },

            async loadBiddersInfo() {
                let bidders = [];
                await Promise.all(this.listing.bidders.map(async bid => {
                    let snap = await fb.usersCollection.doc(bid).get();
                    if (snap.exists) {
                        let bidder = snap.data();
                        bidders.push(bidder);
                    }
                }))
                this.bidders = bidders;
            },

            rating(user) {
                if (!user) return -1;
                if (!user.total) return 100;
                const {total, positive, negative} = user.rating;
                const neutral = total - positive - negative;
                const weightedScore = positive + neutral*0.5;
                return ((weightedScore/total)*100).toFixed(0);
            },

            async bidUser() {
                if ((!this.userProfile) || this.userProfile!=={}) {
                    await this.$router.push('/login');
                    return;
                }

                await this.$store.dispatch("setLoading", true);
                // this.bidders.push(this.user._id);

                await fb.listingsCollection.doc(this.listing._id).update({
                    bidders: [
                        ...this.listing.bidders,
                        this.userProfile._id
                    ]
                });

                await this.loadListing();

                await this.loadBiddersInfo();

                await this.$store.dispatch("setLoading", false);

                // setTimeout(() => {
                //     this.$store.dispatch("setLoading", false);
                // }, 1000)

                // this.loadBiddersInfo();
            },

            async cancelBid() {
                await this.$store.dispatch("setLoading", true);
                // this.bidders.push(this.user._id);

                let updatedBidders = this.listing.bidders.filter(bidder => !(bidder===this.userProfile._id));

                await fb.listingsCollection.doc(this.listing._id).update({
                    bidders: updatedBidders
                });

                await this.loadListing();

                await this.loadBiddersInfo();

                await this.$store.dispatch("setLoading", false);

                // setTimeout(() => {
                //     this.$store.dispatch("setLoading", false);
                // }, 1000)

                // this.loadBiddersInfo();
            }
        }
    }
</script>

<style>
    .about-panel {
        border-color: #7957d5;
        border-radius: 5px;
        border-style: solid;
        padding: 5px;
    }
</style>