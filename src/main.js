import api from "./api";

class Weather {
    constructor() {
        this.busca = [];
        this.repoEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name = input-form]');
        this.listEl = document.getElementById('list');

        this.registerHandler();
    }

    registerHandler() {
        this.repoEl.onsubmit = event => this.addrepository(event);
    }

    async addrepository(event) {
        event.preventDefault(event);
        if (this.inputEl.length === 0)
            return;

        this.loading();
        try {
            let keyword = this.inputEl.value;

            const resp = await api.get(`/weather?q=${keyword}&APPID=83a9db599874d9f5683e2016c92ae339`);

            this.busca.push({
                city: resp.data.name,
                description: resp.data.weather[0].description,
                link_url: `http://openweathermap.org/img/w/${resp.data.weather[0].icon}.png`,
            });
            this.inputEl.value = '';
        } catch (error) {
            alert("City not found");
            this.inputEl.value = '';
        }

        this.loading(false);

        this.render();

    }

    render() {
        this.listEl.innerHTML = " ";

        this.busca.forEach(repo => {
            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.city));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.link_url);

            let liEl = document.createElement('li');
            liEl.appendChild(imgEl);
            liEl.appendChild(titleEl);
            liEl.appendChild(descriptionEl);

            this.listEl.appendChild(liEl);
        })
    }

    loading(loading = true) {
        if (loading === true) {
            let loadEl = document.createElement('span');
            loadEl.setAttribute('id', 'load');
            loadEl.appendChild(document.createTextNode('Loading data..'));

            this.repoEl.appendChild(loadEl);
        } else {
            document.getElementById('load').remove();
        }
    }



}

new Weather();