const userError = {
    unauthorized: "User is not authorized",
    forbidden: "User access is denied",
    fieldsNotProvided: "Both name and password must be provided",
    alreadyExists: "User already exists",
    notFound: "User was not found",
    password: "Password is incorrect",
    emptyList: "Users were not found"
}

const itemError = {
    notFound: function (item: string) {
        return `${item} with provided ID was not found`
    },
    emptyList: function (items: string) {
        return `${items} were not found`
    },
    action: function(item: string, status: string) {
        return `Something went wrong while ${status} ${item} or provided wrong id`
    }
}

export {
    userError,
    itemError
}