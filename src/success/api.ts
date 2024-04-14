export const ApiSuccess = {
    OK: 200,
    created: 201,
    deleted: 204,
    message: function (item: string, status: string) {
        return `${item} was successfully ${status}`
    }
}