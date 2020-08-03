<template>
  <section>
    <b-field horizontal label="Title">
      <b-input name="title" v-model="listingDetails.title" expanded :disabled="true"></b-input>
    </b-field>

    <b-field horizontal label="Description">
      <b-input type="textarea" v-model="listingDetails.description" :disabled="true"></b-input>
    </b-field>

    <b-field horizontal label="Tags">
      <b-taginput
          v-model="listingDetails.tags"
          :allow-new="allowNew"
          :disabled="true"
          :closable="false"
          :field="' '"
          rounded
      attached>
      </b-taginput>
    </b-field>

    <b-field horizontal label="Price">
      <b-field>
        <b-input name="price" v-model="listingDetails.price.amount" expanded :disabled="true"></b-input>
        <b-select placeholder="Currency" v-model="listingDetails.price.currency" :disabled="true">
          <option value="usd">$ (USD)</option>
          <option value="gbp">£ (GBP)</option>
          <option value="eur">€ (EUR)</option>
        </b-select>
      </b-field>
    </b-field>

    <b-field horizontal label="Payment account">
      <v-select class="disabled-select" :clearable="false" :searchable="false" v-model="listingDetails.paymentAccount" :disabled="true" :noDrop="true">
        <template v-slot:option="option">
          <span><img class="payment-option-dropdown" :src="option.icon"/> </span>
          {{ option.label }}
        </template>

        <template #selected-option="option">
          <span><img class="payment-option-selected" :src="option.icon"/> </span>
          {{ option.label }}
        </template>

        <template #list-footer>
          <!--                                        <li style="text-align: center">-->
          <a aria-label="reply">
            <b-icon class="payment-option-add" pack="fas" icon="plus"></b-icon>
            <span class="icon-label">Add new payment method</span>
          </a>
          <!--                                        </li>-->
        </template>
      </v-select>
    </b-field>
  </section>
</template>

<script>
export default {
  name: "ListingFieldsList",
  props: {
    listingDetails: Object
  },
  data() {
    return {
      allowNew: false
    }
  }
}
</script>

<style>
.disabled-select>div {
  border: none;
}
</style>

<style scoped>
.payment-option-selected {
  height: 23px;
  padding-top: 3px;
  margin-right: 8px;
  padding-left: 4px;
}

.payment-option-dropdown {
  height: 23px;
  padding-top: 3px;
  margin-right: 8px;
  /*padding-left: 4px;*/
}

.payment-option-add {
  padding-top: 3px;
  margin-right: 16px;
  padding-left: 30px;
}
</style>