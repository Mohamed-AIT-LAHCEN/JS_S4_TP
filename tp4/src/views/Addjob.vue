<template>
    <div>
        <h1>Add Job</h1>
        <form @submit.prevent="addJob()">
            <label for="titre">Titre</label>
            <input type="text" id="titre" v-model="job.titre">
            <label for="description">Description</label>
            <textarea v-model="job.description" id="description"></textarea>
            <label for="lieu">Salaire</label>
            <input type="text" id="lieu" v-model="job.salaire">
            <label for="date">Date de creation</label>
            <input type="date" id="date" v-model="job.creation">
            <button type="submit">Add Job</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "Add-job",
    data() {
        return {
            job: {
                id: 11,
                titre: '',
                description: '',
                salaire: '',
                creation: ''
            }
        }
    },
    
    methods: {
        addJob() {
            fetch('http://localhost:3000/jobs/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.job)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.job = { id: this.job.id + 1, titre: '', description: '', salaire: '', creation: '' }; 
            })
            .catch(error => console.error('Error:', error));
        }
    }
}
</script>

<style>
div {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    text-align: center;
    color: #333;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

input, textarea, button {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

textarea {
    resize: vertical;
}

button {
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}
</style>