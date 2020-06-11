<template>
    <section class="hero is-primary is-bold is-fullheight">
        <div class="container page-content" >
            <div class="box">
                <h3 class="title is-3">
                    {{listing.title}}
                </h3>

<!--                <br/>-->
<!--                <p>-->
<!--                    {{listing.description.replace( "\n", "\n" )}}-->
<!--                </p>-->
                <nl2br tag="p" :text="listing.description"></nl2br>

            </div>
        </div>
    </section>
</template>

<script>
    const fb = require("../plugins/firebase");

    export default {
        name: "Listing",
        data() {
            return {
                linkedid: this.$route.params.linkedid,
                listing: {}
            }
        },
        mounted() {
            this.loadListing();
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
            }
        }
    }
</script>

<style>
.page-content.container {
    margin-top: 30px;
    margin-bottom: 30px;
    max-width: 800px;
}

    div.box > h3.title.is-3 {
        color: #363636;
    }

.pre-formatted {
    white-space: pre;
}
</style>