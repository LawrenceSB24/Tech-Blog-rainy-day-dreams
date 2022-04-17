module.exports = {

    // Returns date in MM/DD/YYYY
    format_data: date => {
        return `${new Date(date).getMonth() +1}
        /${new Date(date).getDate()}
        /${new Date(date).getFullYear}`
    },

    // Word count for posts, comments, etc.
    format_plural: (word, amount) => {
        if  (amount !== 1) {
            return `${word}s`
        }
        return word;
    }
}