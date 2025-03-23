<template>
    <div>
        <h1>Edit Job</h1>
        <form @submit.prevent="submitForm">
            <label>Title:</label>
            <input v-model="job.titre" required />
            <label>Description:</label>
            <textarea v-model="job.description" required></textarea>
            <label>Salary:</label>
            <input type="number" v-model="job.salaire" required />
            <label>Creation Date:</label>
            <input type="date" v-model="job.creation" required />
           
            <button type="submit">Save Changes</button>
        </form>
    </div>
</template>

<script>
import router from '@/router';

    export default {
        name: 'EditJob',
        data() {
            return {
                job: {
                    titre: '',
                    description: '',
                    salaire: '',
                    creation: ''
                }
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
            submitForm() {
                fetch(`http://localhost:3000/jobs/${this.$route.params.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.job)
                })
                .then(() => {
                    this.$router.push({ name: 'Home' });
                })
                .catch(error => console.error('Error:', error));
                router.push('/');
            }
        }
    }
</script>

<style scoped>
div {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h1 {
    text-align: center;
    color: #333;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
    font-weight: bold;
    color: #555;
}

input, textarea, button {
    margin-top: 5px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

textarea {
    resize: vertical;
}

button {
    margin-top: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}
</style>