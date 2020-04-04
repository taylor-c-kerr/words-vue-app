import axios from 'axios'

export default {
    getWords() {
        return axios.get('http://localhost:3000/words')
    },

    getWord(id) {
        return axios.get(`http://localhost:3000/words/${id}`)
    },

    deleteWord(id) {
        return axios.delete(`http://localhost:3000/words/${id}`)
    },

    updateWord(word) {
        return axios.put(`http://localhost:3000/words/${word.id}`, word)
    },

    addWord(word) {
        return axios.post('http://localhost:3000/words', word)
    }
}