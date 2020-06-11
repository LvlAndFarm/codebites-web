<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <div class="navbar-title">
                    Codebites
                </div>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Home
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Contact
            </b-navbar-item>
            <b-navbar-item href="#">
                File a bug
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">

            <b-navbar-item v-if="currentUser">
                <i class="fas fa-envelope">
                    <span class="icon-badge">1</span>
                </i>
            </b-navbar-item>

            <b-navbar-item v-if="currentUser" @click="onSidebarOpen">
                <i class="fas fa-tasks">
                    <span class="icon-badge">0</span>
                </i>
            </b-navbar-item>

            <b-dropdown aria-role="list" v-if="currentUser">
<!--                <button class="button is-primary">-->
<!--                    <span>Click me!</span>-->
<!--                    <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>-->
<!--                </button>-->

                <b-navbar-item class="navbar-user-item" slot="trigger" slot-scope="{ active }">
                    <img class="navbar-avatar" src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
                    />
                    {{currentUser.displayName}}
                    <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                </b-navbar-item>

                <b-dropdown-item aria-role="listitem">Profile</b-dropdown-item>
                <b-dropdown-item aria-role="listitem">Settings</b-dropdown-item>
                <b-dropdown-item aria-role="listitem" @click="logout()">
                    <div style="color: darkred">
                        Log out
                    </div>
                </b-dropdown-item>
            </b-dropdown>

            <b-navbar-item tag="div" v-if="!currentUser">
                <div class="buttons">

                    <router-link to="/signup">
                        <a class="button is-primary">
                            Sign up
                        </a>
                    </router-link>

                    <router-link to="/login">
                        <a class="button is-light">
                            Log in
                        </a>
                    </router-link>
                </div>
            </b-navbar-item>

        </template>
    </b-navbar>
</template>

<script>
    import {currentUser} from "../../plugins/firebase";

    export default {
        name: "NavBar",
        props: {
            onSidebarOpen: Function
        },
        data() {
            return {
                // currentUser: this.$store.state.currentUser
                isUserDropdownOpen: false
            }
        },
        computed: {
            currentUser: function() { return this.$store.state.currentUser },
            displayName: () => currentUser&&currentUser.displayName
        },
        methods: {
            toggleUserDropdown(toggle=null) {
                if (toggle) {
                    this.isUserDropdownOpen = toggle;
                } else {
                    this.isUserDropdownOpen = !this.isUserDropdownOpen;
                }
            },

            logout() {
                console.log("LOGGING OUT");
                this.$store.dispatch("userLogout");
            },

        }
    }
</script>

<style>
.navbar-avatar {
    margin-right: 6px;
}

    .navbar-user-item {
        font-size: 1.05em;
    }

    .dropdown-menu {
        right: 6px;
        left: unset;
    }

    .icon-badge {
        color: white;
        font-size: 0.7em;
        position: absolute;
        top: 10px;
        background-color: red;
        padding-left: 3px;
        padding-right: 3px;
        border-radius: 10px;
        padding-top: 2px;
        padding-bottom: 1px;
    }
</style>