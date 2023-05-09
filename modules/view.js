export class View {
    constructor(api) {
        this.app = document.getElementById('app');
        this.api = api;

        this.searchInput = this.createElement('div', 'search-input');
        this.input = this.createElement('input', 'input');
        this.searchList = this.createElement('ul', 'search-list');
        this.searchInput.append(this.input);
        this.searchInput.append(this.searchList);

        this.resultList = this.createElement('ul', 'result-list');
        
        this.app.append(this.searchInput);
        this.app.append(this.resultList);
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if ( elementClass ) {
            element.classList.add(elementClass);
        }

        return element;
    }

    createRepo(repoData) {
        const repo = repoData.name;
        const repoElement = this.createElement('li', 'search-item');

        repoElement.addEventListener('click', (event) => this.showRepoData(repoData));
        repoElement.textContent = repo;

        this.searchList.append(repoElement);
        if (this.searchList.innerHTML) {
            this.searchList.classList.add('search-list--active');
        }
    }

    showRepoData(repoData) {

        try {
            this.searchList.innerHTML = '';
            this.input.value = '';
            const resultItem = this.createElement('li', 'result-item');

            const resultItemBox = this.createElement('ul', 'result-item__box');
            const nameValue = this.createElement('li', 'name');
            const ownerValue = this.createElement('li', 'owner');
            const starsValue = this.createElement('li', 'stars');

            const btn = this.createElement('button', 'btn');
            const vector1 = this.createElement('span', 'vector1');
            const vector2 = this.createElement('span', 'vector2');

            this.api.loadRepoData(repoData.name)
            .then(response => {
                for (let item of response.items) {
                    const name = item.name;
                    const owner = item.owner.login;
                    const stars = item.stargazers_count;

                    nameValue.textContent = `Name: ${name}`;   
                    ownerValue.textContent = `Owner: ${owner}`;
                    starsValue.textContent = `Stars: ${stars}`;
                }  
            })

            resultItemBox.append(nameValue);
            resultItemBox.append(ownerValue);
            resultItemBox.append(starsValue);
    
            resultItem.append(resultItemBox);
            resultItem.append(btn);
            btn.append(vector1);
            btn.append(vector2);
            
            this.resultList.prepend(resultItem);

            if (resultItem.innerHTML) {
                resultItem.classList.add('result-item--active');
            }

            btn.addEventListener('click', (event) => {
                resultItem.classList.remove('result-item--active');
            })

        } catch (e) {
            console.log(e);
        }
    }
}