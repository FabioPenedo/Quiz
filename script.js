const qS = (el)=>document.querySelector(el);
const qSa = (el)=>document.querySelectorAll(el);

let currentQuestion = 0;
let correctAnswers = 0;

showQuestion()

qS('.scoreArea button').addEventListener('click', resetQuestions);

function showQuestion(){
    if(questions[currentQuestion]){
        let qts = questions[currentQuestion];
        let percentage = Math.floor((currentQuestion / questions.length) * 100);
        qS('.progress--bar').style.width = `${percentage}%`
        qS('.questionArea').style.display = 'block';
        qS('.scoreArea').style.display = 'none';
        qS('.question').innerHTML = qts.question;

        let optionsHtml = '';
        for(let i in qts.options){
            optionsHtml += `<div data-op=${i} class="option"><span>${parseInt(i)+1}</span>${qts.options[i]}</div>`
        }
        qS('.options').innerHTML = optionsHtml;
        qSa('.options .option').forEach(item=>{
            item.addEventListener('click', optionClickEvent)
        });
    }else {
        finishedQuestions();
    }
}

function optionClickEvent(e){
    let clickOption = parseInt(e.target.getAttribute('data-op'));
    if(questions[currentQuestion].answer === clickOption){
        correctAnswers++
    }

    currentQuestion++;
    showQuestion();
}

function finishedQuestions(){
    let points = Math.floor((correctAnswers / questions.length) * 100);
    if(points < 40){
        qS('.scoreText1').innerHTML = 'Ta ruim sô';
        qS('.scorePct').style.color = '#6a040f';
        qS('.prizeImage').src = 'n.png';
    }else if(points >= 40 && points < 70 ){
        qS('.scoreText1').innerHTML = 'Ta bom uai';
        qS('.scorePct').style.color = '#fca311';
        qS('.prizeImage').src = 'p.png';
    }else if(points >= 70){
        qS('.scoreText1').innerHTML = 'Nú, Parabéns';
        qS('.scorePct').style.color = '#0d630d';
        qS('.prizeImage').src = 'pa.png';
    }
    qS('.scorePct').innerHTML = `${points}%`;
    qS('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`
    qS('.questionArea').style.display = 'none';
    qS('.scoreArea').style.display = 'block';
    qS('.progress--bar').style.width = '100%';
}

function resetQuestions(){
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion()
}
