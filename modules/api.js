const URL = 'https://api.github.com/';
const REPO_PER_PAGE = 5;

export class Api {
    async loadRepos(value) {
        if (value.charAt(0) !== ' ') {
            return await fetch(`${URL}search/repositories?q=${value}&per_page=${REPO_PER_PAGE}`).then(response => response);
        } else {
            return value = '';
        }

    }

    async loadRepoData(value) {
        const urls = `${URL}search/repositories?q=${value}&per_page=${REPO_PER_PAGE}`;

        const requests = await fetch(urls);
        return Promise.resolve(requests)
        .then(response => response.json());
    }
}