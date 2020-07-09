<template>
    <content-page>
        <template v-slot:main>
            <div style="display: flex">
                <div>
                    <avataaars style="width: 300px; height: 300px;"></avataaars>
                </div>
                <div style="padding-left: 20px; padding-top: 30px;">
                    <h2 class="title is-2 main-text-color">
                        {{profile.firstName}}&nbsp;{{profile.lastName}}
                        <b-tooltip label="Verified"
                                   position="is-bottom"
                                   animated class="username-verified">
                            <img class="username-verified" src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Check_green_icon.svg"/>
                        </b-tooltip>

                        <div class="tags has-addons user-rating-badge">
                            <span class="tag">Rating</span>
                            <span class="tag is-primary" :class="rating==-1 ? 'button is-loading': ''">Over 9000%</span>
                        </div>
                    </h2>


                    <p>
                        {{profile.shortDesc}}
                    </p>

                    <br/>

                    <ul>
                        <li>📌 {{profile.location}}</li>
                        <li>🌐 <a target="_blank">{{profile.website}}</a></li>
                        <li>Technologies: <span class="tag" v-for="tag in tags" :key="tag">{{tag}}</span></li>
                    </ul>


                </div>
            </div>
            <nav class="level">
                <div class="level-left"></div>

                <div class="level-right">
                    <p class="level-item">
                        <a class="button is-danger">Report</a>
                    </p>
                    <p class="level-item">
                        <a class="button is-primary">Message</a>
                    </p>
                </div>
            </nav>

            <div class="tabs">
                <ul>
                    <li class="is-active"><a class="main-text-color">Reviews (9999)</a></li>
                    <li><a>Portfolio</a></li>
<!--                    <li><a>Videos</a></li>-->
<!--                    <li><a>Documents</a></li>-->
                </ul>
            </div>

            <div class="card">
<!--                <div class="card-image">-->
<!--                    <figure class="image is-4by3">-->
<!--                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">-->
<!--                    </figure>-->
<!--                </div>-->
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <avataaars/>
<!--                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">-->
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">John Smith</p>
                            <p class="subtitle is-6">@johnsmith</p>
                        </div>
                    </div>

                    <div class="content">
                        Truly the BEST software dev that ever existed! He made me a 1:1 Facebook clone in under 2 hours. Would recommend everytime.
                        <br>
                        <time datetime="2016-1-1">11:09 PM - 3 Jun 2077</time>
                    </div>
                </div>
            </div>

            <div class="card">
                <!--                <div class="card-image">-->
                <!--                    <figure class="image is-4by3">-->
                <!--                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">-->
                <!--                    </figure>-->
                <!--                </div>-->
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <avataaars/>
                                <!--                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">-->
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">Gucci Ganger (one and only)</p>
                            <p class="subtitle is-6">@xxguccigangxx</p>
                        </div>
                    </div>

                    <div class="content">
                        Dude idk how but his software started spitting FIRE TRACKS I can't believe this s#!&... Would go for it if you don't mind
                        becoming #1 rapper in da world!
                        <br>
                        <time datetime="2016-1-1">3:09 AM - 7 Mar 2077</time>
                    </div>
                </div>
            </div>
        </template>
    </content-page>
</template>

<script>
    import ContentPage from "../components/common/pages/ContentPage";
    import Avataaars from "vuejs-avataaars";

    const fb = require("../plugins/firebase");

    export default {
        name: "Profile",
        components: {ContentPage, Avataaars},
        props: {
            selfProfile: Object,
        },
        data() {
            return {
                // Retrieve user id from URL param
                username: this.$route.params.username,

                profile_: {},
                tags: ["React", "Vue", "Angular", "Next", "Redux", "MobX"],


            }
        },
        computed: {
            userProfile() {return this.$store.state.userProfile},

            profile() {return this.selfProfile||this.profile_}
        },
        async mounted() {
            if (!this.selfProfile) {
                await this.$store.dispatch("setLoading", true);
                this.loadUserProfile();
                await this.$store.dispatch("setLoading", false);
            } else {
                await this.$store.dispatch("setLoading", true);
            }

        },
        async updated() {
            if (this.profile_ && this.profile_!=={}) {
                await this.$store.dispatch("setLoading", false);
            }
        },
        methods: {
            async loadUserProfile() {
                let snap = await fb.usersCollection.where("username", "==", this.username).get();
                if (!snap.empty) {
                    // this.listingId = snap.docs[]
                    this.profile_ = snap.docs[0].data();
                }
            }
        }
    }
</script>

<style scoped>
    .username-verified {
        height: 2rem;
        padding-bottom: 3px;
        vertical-align: middle;
    }
</style>