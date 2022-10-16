export default class Post {
    constructor(title, logo) {
        this.logo = logo
        this.title = title
        this.date = new Date()
    }

    toString() {
        return JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
            logo: this.logo
        },null,2)
    }
}