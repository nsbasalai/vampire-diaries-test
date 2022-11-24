const darkColor = 'rgba(0, 0, 0, 0.547)'

window.onload = function () {
    let scores = {};
    let step = 0;
    const rightSide = document.querySelector('.test__wrp--right');
    const leftSide = document.querySelector('.test__wrp--left');

    function showOptions(optionsNumber) {
        let num = 0;
        let answer = '';
        for (let key in questions[step]['a']) {
            answer += `<li data-v=${key} class='test__answer test__answer--${num}'>${questions[step]['a'][key]}</li>`;
            num++;
        }
        document.querySelector('.test__questions').innerHTML = answer;

        const testAnswerRight = document.querySelector('.test__answer--1');
        const testAnswerLeft = document.querySelector('.test__answer--0');
        changeWrpByAnswer(testAnswerRight, testAnswerLeft);
    }

    function showResult() {
        let finalResult = Object.keys(scores).reduce(function (a, b) {
            return scores[a] > scores[b] ? a : b;
        })

        document.querySelector('main').insertAdjacentHTML('afterbegin', `
        <div class='test__result-wrp'>
        <h1 class='test__result-creature'>A ${finalResult}</h1>
        <img src='images/${finalResult}Image.jpg' class='test__result-image'>
        <p class='test__result-description'>${results[finalResult]['description']}</p>
        </div>
        `)
    }

    document.onclick = function (event) {
        event.stopPropagation();
        if (event.target.classList.contains('test__answer') && step < questions.length) {
            scores[event.target.dataset.v] != undefined ? scores[event.target.dataset.v]++ : scores[event.target.dataset.v] = 0;
            step++;

            if (step == questions.length) {
                document.querySelector('.test__questions').remove();
                document.querySelector('.test__description').remove();
                document.querySelector('.test__diagonals').remove();
                showResult();
            } else {
                showOptions(step);
            }
        }
    }

    showOptions(step);
    changeWrpBySide();

    function changeWrpBySide() {
        if (document.querySelector('.test__questions')) {
            rightSide.addEventListener('mouseover', () => {
                leftSide.style.transition = '1s'
                leftSide.style.backgroundColor = darkColor;
            })

            rightSide.addEventListener('mouseout', () => {
                leftSide.style.backgroundColor = '';
            })

            rightSide.addEventListener('click', () => {
                leftSide.style.backgroundColor = '';
            })

            leftSide.addEventListener('mouseover', () => {
                rightSide.style.transition = '1s'
                rightSide.style.backgroundColor = darkColor;
            })

            leftSide.addEventListener('mouseout', () => {
                rightSide.style.backgroundColor = '';
            })

            leftSide.addEventListener('click', () => {
                rightSide.style.backgroundColor = '';
            })
        }
    }

    function changeWrpByAnswer(testAnswerRight, testAnswerLeft) {
        testAnswerRight.addEventListener('mouseover', () => {
            leftSide.style.transition = '1s'
            leftSide.style.backgroundColor = darkColor;
        })

        testAnswerRight.addEventListener('mouseout', () => {
            leftSide.style.backgroundColor = '';
        })

        testAnswerLeft.addEventListener('mouseover', () => {
            rightSide.style.transition = '1s'
            rightSide.style.backgroundColor = darkColor;
        })

        testAnswerLeft.addEventListener('mouseout', () => {
            rightSide.style.backgroundColor = '';
        })
    }
}





