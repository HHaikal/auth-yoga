module.exports = {
    Query: {
        customErrorInResolver: () => {
            return new Error('Custom error message from resolver.')
        },
        customErrorMessageInRule: () => {
            // Querying is stopped because rule returns an error
            return new Error('Custom error message from resolver.')
        },
        customErrorInRule: () => {
            // Querying is stopped because rule returns an error
            // console.log("This won't be logged.")
            // return "you won't see me!"
            return new Error('Custom error message from resolver.')
        }
    }
}