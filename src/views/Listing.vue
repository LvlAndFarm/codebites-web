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
                        Bidders (3)
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
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th>A****h</th>
                                <th>98%</th>
                            </tr>
                            <tr>
                                <th>A****h</th>
                                <th>98%</th>
                            </tr>
                            <tr>
                                <th>A****h</th>
                                <th>98%</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

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
                <!--            <footer class="card-footer">-->
                <!--                <a href="#" class="card-footer-item">Save</a>-->
                <!--                <a href="#" class="card-footer-item">Edit</a>-->
                <!--                <a href="#" class="card-footer-item">Delete</a>-->
                <!--            </footer>-->
            </div>

            <br/>

            <nav class="level">
                <!--            <p class="level-item has-text-centered">-->
                <!--                <a class="link is-info">Home</a>-->
                <!--            </p>-->
                <!--            <p class="level-item has-text-centered">-->
                <!--                <a class="link is-info">Menu</a>-->
                <!--            </p>-->
                <!--            <p class="level-item has-text-centered">-->
                <!--                <img src="https://bulma.io/images/bulma-type.png" alt="" style="height: 30px;">-->
                <!--            </p>-->
                <!--            <p class="level-item has-text-centered">-->
                <!--                <a class="link is-info">Reservations</a>-->
                <!--            </p>-->
                <!--            <p class="level-item has-text-centered">-->
                <!--                <a class="link is-info">Contact</a>-->
                <!--            </p>-->

                <div class="level-left">
                    <!--                <p class="level-item">-->
                    <!--                    <a class="button is-success">New</a>-->
                    <!--                </p>-->
                    <!--                <p class="level-item">-->
                    <!--                    <a class="button is-success">New</a>-->
                    <!--                </p>-->
                    <!--                <p class="level-item">-->
                    <!--                    <a class="button is-success">New</a>-->
                    <!--                </p>-->
                </div>

                <div class="level-right">
                    <p class="level-item">
                        <a class="button is-danger">Report</a>
                    </p>
                    <p class="level-item">
                        <a class="button is-primary">Message</a>
                    </p>
                    <p class="level-item">
                        <a class="button is-success">Bid Now</a>
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
    const fb = require("../plugins/firebase");

    export default {
        name: "Listing",
        components: {UserBox, ContentPage},
        data() {
            return {
                linkedid: this.$route.params.linkedid,
                listing: {},
                user: null,
            }
        },
        async mounted() {
            await this.loadListing();
            await this.loadUser();
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
        },
        methods: {
            async loadListing() {
                let snap = await fb.listingsCollection.where("_linkedid", "==", this.linkedid).get();
                if (!snap.empty) {
                    // await snap.docs[0].ref.update({
                    //     description: "Some people on r/beermoney use the Prolific Assistant Chrome extension.\n" +
                    //         "\n" +
                    //         "It's ass.\n" +
                    //         "\n" +
                    //         "I'll put up $100 for someone to remake this extension with less bugs, faster searching (faster than the 60 second minimum on the current extension), but also probably not too low for Prolific to get mad.\n" +
                    //         "\n" +
                    //         "More customization filters/notifications. (ex: Only notify you with sound if a study is shorter than a certain amount of time, or only notify you if it pays more than $x per hour, or it's overall pay is higher than $y).\n" +
                    //         "\n" +
                    //         "Shoot me a PM if you think you have what it takes."
                    // });
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