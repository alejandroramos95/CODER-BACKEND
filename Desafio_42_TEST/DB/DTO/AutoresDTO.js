class AutoresDTO {
    constructor({name, last_name, age, nickname, email, avatar}) {
        this.name = name;
        this.last_name = last_name;
        this.age = age;
        this.nickname = nickname;
        this.email = email;
        this.avatar = avatar;
    }
}

module.exports = { AutoresDTO };