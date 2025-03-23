<template>
    <div>
        <h1>Job Details</h1>
        <div v-if="Object.keys(job).length">
            <p><strong>Title:</strong> {{ job.titre }}</p>
            <p><strong>Description:</strong> {{ job.description }}</p>
            <p><strong>Salary:</strong> {{ job.salaire }}</p>
            <p><strong>Creation Date:</strong> {{ job.creation }}</p>
            <router-link :to="{ name: 'EditJob', params: { id: job.id } }">
                <button>Edit Job</button>
            </router-link>
            <button @click="Delete(job)">Delete Job</button>
        </div>
        <div v-else>
            Loading job details...
        </div>
    </div>
</template>

<script>
import router from '@/router';

    export default {
        name: 'JobDetails',
        data() {
            return {
                job: {}
            }
        },
        created() {
            const jobId = this.$route.params.id;
            fetch(`http://localhost:3000/jobs/${jobId}`)
                .then(response => response.json())
                .then(data => {
                    this.job = data;
                })
                .catch(error => console.error('Error:', error));
        },
        methods: {
            Delete(job) {
                let c = confirm('Are you sure you want to delete this job?');
                if (c) {
                    fetch(`http://localhost:3000/jobs/${job.id}`, {
                        method: 'DELETE'
                    })
                    .then(() => {
                        this.$router.push({ name: 'Home' });
                    })
                    .catch(error => console.error('Error:', error));
                    router.push('/');
                }
            }
        }
    }
</script>


<style scoped>
div {
    font-family: Arial, sans-serif;
    margin: 20px;
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

p {
    margin: 10px 0;
    font-size: 16px;
}

strong {
    color: #555;
}

button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 15px;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
}

button:hover {
    background-color: #0056b3;
}

button:focus {
    outline: none;
}

router-link button {
    margin-right: 10px;
}
</style>