<template>
    <div class="box">
        <div class="columns">
            <div class="column">
                <i>7 days ago</i>
                <h4 class="title is-4">
                    <router-link :to="'/listings/' + listing.id">{{listing.title}}</router-link>
                    <span class="tag is-dark is-medium listing-budget-tag">${{listing.price}}</span>
                </h4>
                <p>
                    <text-summary :text="listing.description" />
                </p>

                <div class="tags are-medium">
                    <span class="tag" v-for="tag in listing.tags" :key="tag">{{tag}}</span>

                </div>
            </div>

            <div class="column is-2">

                <div class="box listing-user-box">
                    <img class="listing-user-avatar"  src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=Red&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Yellow'
                    />
                    <br/>
                    <div class="listing-user-name">John Doe</div>

                    <div class="tags has-addons">
                        <span class="tag">Rating</span>
                        <span class="tag is-primary">97%</span>
                    </div>
                </div>

                <!--                                    <button class="button is-primary is-large is-fullwidth font-circular">View</button>-->
            </div>
        </div>
        <nav class="level is-mobile">
            <div class="level-left">
                <a class="level-item" aria-label="reply">
                    <b-icon pack="fas" icon="reply"></b-icon>
                    <span class="icon-label">Message</span>
                </a>
                <a class="level-item" aria-label="retweet">
                    <b-icon pack="fas" icon="retweet"></b-icon>
                    <span class="icon-label">Share</span>
                </a>
                <a class="level-item" aria-label="like">
                    <b-icon pack="fas" icon="heart"></b-icon>
                    <span class="icon-label">Save</span>
                </a>
            </div>

            <div class="level-right">
                <a class="level-item report-btn" aria-label="retweet">
                    <b-icon pack="fas" icon="exclamation-circle"></b-icon>
                    <span class="icon-label">Report</span>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
    import TextSummary from "../text/TextSummary";

    export default {
        name: "ListingBox",
        components: {
            TextSummary
        },
        props: {
            listing: Object
        }
    }
</script>

<style scoped>

</style>