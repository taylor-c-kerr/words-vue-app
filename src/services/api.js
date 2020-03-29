import axios from 'axios'

export default {
    getWords() {
        return axios.get('http://localhost:3000/words')
    },

    getWord(id) {
        return axios.get(`http://localhost:3000/words/${id}`)
    },

    deleteWord(id) {
        return axios.get(`http://localhost:3000/words/${id}`)
    },

    // updateWord(word) {
    //     // 
    // },

    // addWord(word) {

    // }
}