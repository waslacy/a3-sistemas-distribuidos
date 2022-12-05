let score = 0
let progress = 0

async function getQuestao(q) {
    let response = await fetch(`http://127.0.0.1:3000/pergunta/${q}`).then(response => { return response.json() })
    return response
}

function montaQuestao(json) {
    let card = ''

    card += `<div class="card-header">Quiz Usabilidade Css</div>`

    card += `<div class="card-body pt-5 pb-5">`
        card += `<h5 class="card-title mt-2 mb-4 text-center display-6">${json.question}</h5>`

        card += `<div class="card">`
            card += `<ul class="list-group list-group-flush">` 
                card += `<li class="list-group-item resposta" id="a" onclick="validaResposta('a', '${json.id}')">${json.options.a}</li>`
                card += `<li class="list-group-item resposta" id="b" onclick="validaResposta('b', '${json.id}')">${json.options.b}</li>`
                card += `<li class="list-group-item resposta" id="c" onclick="validaResposta('c', '${json.id}')">${json.options.c}</li>`
                card += `<li class="list-group-item resposta" id="d" onclick="validaResposta('d', '${json.id}')">${json.options.d}</li>`
            card += `</ul>`
        card += `</div>`
    card += `</div>`

    card += `<div class="card-footer d-flex justify-content-between align-items-center p-3">`
        card += `<div class="progress-bar"><div class="progress" style="width: ${progress}%"></div></div>`
        card += `<button class="btn btn-primary d-none" id="next" onclick="proxima('${json.proxima}')">Próximo</button>`
    card += `</div>`

    $('#card_quiz').html(card)
}

async function validaResposta(resp, q) {
    let questao = await getQuestao(q)
    progress += 20

    if(questao.correta == resp){
        $(`#${resp}`).addClass("bg-success text-white")
        score += 1
    } else {
        $(`#${resp}`).addClass("bg-danger text-white")
    }

    $(`.resposta`).addClass("disabled")
    $('#next').removeClass("d-none")
    $('.progress').css("width", `${progress}%`)
}

async function proxima(prox){
    if(prox != "fim"){
        montaQuestao(await getQuestao(prox))
    } else {
        showScore()
    }
}

function showScore(){
    let card = ''

    card += `<div class="card-header">Quiz Usabilidade Css</div>`

    card += `<div class="card-body pt-5 pb-5 d-flex flex-column justify-content-center align-items-center" style="min-height: 400px; gap: 20px">`
        card += `<i class="fa-solid fa-trophy text-primary" style="font-size: 5em"></i>`
        card += `<h3 class="display-4">${score} / 5</h3>`

        card += `<button class="btn btn-lg btn-primary" onclick="document.location.reload()">Recomeçar</button>`
    card += `</div>`

    card += `<div class="card-footer d-flex justify-content-between align-items-center p-3">`
        card += `<div class="progress-bar"><div class="progress" style="width: ${progress}%"></div></div>`
    card += `</div>`

    $('#card_quiz').html(card)
}

$('#start').click(async () => montaQuestao(await getQuestao('a')))