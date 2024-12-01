let searchUser = document.querySelector('#searchUser')

const btnSearch = document.querySelector('#btnSearch')


const avatar = document.querySelector('#avatar')

let namE = document.querySelector('#name')

let user = document.querySelector('#user')

let profile = document.querySelector('#profile')

let bio = document.querySelector('#bio')


const site = document.querySelector('#site')

let siteMessage = document.querySelector('.siteMessage')

let backgroundMessage = document.querySelector('.backgroundMessage')

let backgroundCompany = document.querySelector('.backgroundCompany')

let email = document.querySelector('#email')

let company = document.querySelector('#company')


const repos = document.querySelector('#repos')

const followers = document.querySelector('#followers')

const following = document.querySelector('#following')





btnSearch.addEventListener('click', () => {
    userName = searchUser.value
    apiGithubUsers()
})



function apiGithubUsers() {
    axios
    .get("https://api.github.com/users/" + `${userName}`)
    .then((response) => {
        data = response.data;
        //console.log(data)
        insertInfo(data)
    })
    .catch(function (error) {
        console.log(error);
    });
}



async function insertInfo(data) {
    // Aguardando o consumo de API à ser realizado, para depois executar insertInfo(data). E através do parâmetro data, receber as informações solicitadas da API.

    await apiGithubUsers()

    // Informações básicas do perfil do github do usuário, que você pesquisar. Informações obtidas através, do consumo da API Github Users.

    avatar.src = `${data.avatar_url}`;
    namE.textContent = `${data.name}`;
    user.textContent = `${data.login}`;

    profile.href = `https://github.com/${data.login}`
    profile.innerHTML = `${data.login}`

    bio.textContent = `${data.bio}`;


    // Na verificação abaixo, no else if, é utilizado o match("https://") para verificar se na url site do usuário, tem https://.

    // Caso não tenha, será concatenada uma string https:// na url, assim a página do usuário não irá exibir o erro 404, e vai carregar corretamente.

    let urlSite = `${data.blog}`;

    if (urlSite == '' || urlSite == null) {
        site.textContent = ''
        site.href = '#'
        siteMessage.textContent = 'Site não existe ou o usuário não adicionou um.'
        siteMessage.style.background = 'rgba(255, 255, 255, .5)'
    } else if (!urlSite.match("https://")) {
        httpsText = 'https://'
        site.href = httpsText + urlSite
        site.textContent = httpsText + urlSite
    } else {
        httpsText = ''
        site.textContent = urlSite
        site.href = urlSite

        siteMessage.textContent = ''
        siteMessage.style.background = 'none'
    }



    if (email.value == '' || email.value == null) {
        email.textContent = 'Usuário não adicionou um e-mail.'
        backgroundMessage.style.background = 'rgba(255, 255, 255, .5)'
    } else {
        email.textContent = `${data.email}`
        backgroundMessage.style.background = 'none'
    }



    if (company.value == '' || company.value == null) {
        company.textContent = 'Usuário não adicionou uma empresa.'
        backgroundCompany.style.background = 'rgba(255, 255, 255, .5)'
    } else {
        company.textContent = `${data.company}`
        backgroundCompany.style.background = 'none'
    }

    repos.textContent = `${data.public_repos}`;
    followers.textContent = `${data.followers}`;
    following.textContent = `${data.following}`;
}
