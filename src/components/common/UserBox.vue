<template>
    <div class="box user-box">
<!--        <img class="listing-user-avatar"  src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=Red&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Yellow'-->
<!--        />-->
        <avataaars class="user-avatar"></avataaars>
        <br/>
        <div class="user-name">{{user && `${user.firstName} ${user.lastName}` || "Unknown"}}
            <b-tooltip label="Verified"
                       position="is-bottom"
                       animated class="username-verified">
                <img class="username-verified" src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Check_green_icon.svg"/>
            </b-tooltip>
        </div>

        <span v-if="showDetails">
                    <hr class="dropdown-divider">

                    <div>
                        <flag-emoji :show-name="true" :country-code="countryCode"/>
                    </div>

                    <div><i>User since: 27/09/2002</i></div>

        </span>

        <div class="tags has-addons user-rating-badge">
            <span class="tag">Rating</span>
            <span class="tag is-primary" :class="rating==-1 ? 'button is-loading': ''">{{rating}}%</span>
        </div>
    </div>
</template>

<script>
    import FlagEmoji from "./text/FlagEmoji";
    import Avataaars from "vuejs-avataaars";
    export default {
        name: "UserBox",
        components: {FlagEmoji, Avataaars},
        props: {
            user: Object,
            showDetails: {
                default: false,
                type: Boolean
            }
        },
        computed: {
            rating() {
                if (!this.user) return -1;
                const {total, positive, negative} = this.user.rating;
                const neutral = total - positive - negative;
                const weightedScore = positive + neutral*0.5;
                return ((weightedScore/total)*100).toFixed(0);
            },

            countryCode() {
                if (!this.user) return null;
                return this.user.countryCode;
            }
        },
    }
</script>

<style scoped>
    .user-avatar {
        height: 60px;
        display: inline-block;
    }

    .user-box {
        margin: auto;
        text-align: center;
    }

    .user-name {
        margin-bottom: 5px;
    }

    .user-rating-badge {
        margin-left: auto;
        margin-right: auto;
        display: block;
    }

    .is-divider {
        border-top: 3px solid #bbb;
    }

    .username-verified {
        height: 20px;
        padding-bottom: 3px;
        vertical-align: middle;
    }

</style>