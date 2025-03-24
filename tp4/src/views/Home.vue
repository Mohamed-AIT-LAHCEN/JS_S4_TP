<template>
    <div>
        <h1>Available Jobs</h1>
        <ul>
            <li v-for="job in jobs" :key="job.id">
                <router-link :to="{ name: 'JobDetails', params: { id: job.id } }">
                    {{ job.titre }}
                </router-link>
            </li>
        </ul>
        <router-link :to="{ name: 'AddJob' }">
            <button>Add New Job</button>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'Hom-e',
        data() {
            return {
                jobs: [ ]
            }
        },
        created() {
            fetch('http://localhost:3000/jobs/')
                .then(response => response.json())
                .then(data => {
                    this.jobs = data;
                })
                .catch(error => console.error('Error:', error));
        }
    }
</script>

<style>
div {
    font-family: Arial, sans-serif;
    padding: 20px;
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
}

a {
    text-decoration: none;
    color: #007BFF;
}

a:hover {
    text-decoration: underline;
}

button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>

