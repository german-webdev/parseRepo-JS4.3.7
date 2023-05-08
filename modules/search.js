export class Search {
    constructor(view, api) {
        this.view = view;
        this.api = api;

        this.view.input.addEventListener('keyup', this.debounce(this.loadUsers.bind(this), 500));
    }

    loadUsers() {
        if ( this.view.input.value) {
            this.clearUsers();
            this.usersRequest(this.view.input.value);

        } else {
            this.clearUsers();
        }
    }

    async usersRequest(searchValue) {
        let users;
        try {
            await this.api.loadUsers(searchValue).then((response) => {
                response.json().then(response => {
                    users = response.items;
                    users.forEach(user => this.view.createUser(user));
                })
            })
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    clearUsers() {
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