<template>
    <div>
        <base-dialog :show="!!error" title="Error occured" @close="handleError">
        <p>{{ error }}</p> 
    </base-dialog>
    <section>
        <base-card>
        <header>
            <h2>Requests received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
            <request-item v-for="req in receivdeRequests" :key="req.id" :email="req.userEmail" :message="req.message">
                
            </request-item>
        </ul>
        <h3 v-else>You have not received any requests yet!</h3>
    </base-card>
</section>
</div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
    components: {
        RequestItem
    },
    data() {
        return {
            isLoading: false,
            error: null
        }
    },
    created() {
        this.loadRequests();
    },
    computed: {
        receivdeRequests() {
            return this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
        }
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/fetchRequests');
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>