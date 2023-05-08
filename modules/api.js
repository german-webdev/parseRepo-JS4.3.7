const URL = 'https://api.github.com/';
const USER_PER_PAGE = 5;

export class Api {
    async loadUsers(value) {
        if (value.charAt(0) !== ' ') {
            return await fetch(`${URL}search/repositories?q=${value}&per_page=${USER_PER_PAGE}`).then(response => response);
        } else {
            return value = '';
        }

    }

    async loadUserData(value) {
        const urls = `${URL}search/repositories?q=${value}&per_page=${USER_PER_PAGE}`;

        const requests = await fetch(urls);
        return Promise.resolve(requests)
        .then(response => response.json());
    }
}