export class Search {
    constructor(view, api) {
        this.view = view;
        this.api = api;

        this.view.input.addEventListener('keyup', this.debounce(this.loadRepos.bind(this), 500));
    }

    loadRepos() {
        if ( this.view.input.value) {
            this.clearRepos();
            this.reposRequest(this.view.input.value);

        } else {
            this.clearRepos();
        }
    }

    async reposRequest(searchValue) {
        let repos;
        try {
            await this.api.loadRepos(searchValue).then((response) => {
                response.json().then(response => {
                    repos = response.items;
                    repos.forEach(repo => this.view.createRepo(repo));
                })
            })
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    clearRepos() {
        this.view.searchList.innerHTML = '';
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}