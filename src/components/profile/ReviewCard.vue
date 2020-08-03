<template>
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
                    <p class="title is-4">{{review.name}}</p>
                    <p class="subtitle is-6">@{{review.username}}</p>
                </div>
            </div>

            <div class="content">
                {{review.content}}
                <br>
                <time datetime="2016-1-1">{{parseTime(review.created_on)}}</time>
            </div>
        </div>
    </div>
</template>

<script>
    import Avataaars from "vuejs-avataaars";
    import moment from "moment";

    export default {
        name: "ReviewCard",
        components: {Avataaars},
        props: {
            review: Object
        },
        methods: {
            parseTime(time) {
                return moment(time.toDate()).format("h:mm A - D MMM YYYY");
            }
        }
    }
</script>

<style scoped>

</style>