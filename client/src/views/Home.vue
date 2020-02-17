<template>
    <div class="home">
        <table>
            <tr v-for="book in books" v-bind:key="book.id">
                <td>{{ book.author }}</td>
                <td>"{{ book.title }}"</td>
                <td><a href="#" v-on:click="deleteBook(book.id)">×</a></td>
            </tr>
            <tr>
                <td><input v-model="newAuthor"></td>
                <td><input v-model="newTitle"></td>
                <td><a href="#" v-on:click="addBook()">Add</a></td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',
    data() {
        return {
            newAuthor: '',
            newTitle: '',
            books: []
        }
    },
    mounted() {
        axios
            .get('http://localhost:3000/books')
            .then(res => {
                this.books = res.data;
            });
    },
    methods: {
        addBook() {
            axios
                .post('http://localhost:3000/books', {
                    author: this.newAuthor,
                    title: this.newTitle
                })
                .then(res => {
                    this.books = res.data;
                });
        },
        deleteBook(bookId) {
            axios
                .delete('http://localhost:3000/books/' + bookId)
                .then(res => {
                    this.books = res.data;
                });
        }
    }
}
</script>
