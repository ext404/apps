const ADVICE_API_BASE_URL = "https://api.adviceslip.com/advice";

fetchAndAppendAdvice();

async function fetchAndAppendAdvice() {
    const data = await fetchAdviceFromApi();
    const adviceGenerator = createAdviceGenerator(data);
    document.body.append(adviceGenerator);
};

function createAdviceGenerator(data) {
    const adviceGeneratorDiv = document.createElement('div');
    adviceGeneratorDiv.classList.add('advice-generator');
    const adviceGeneratorOutputDiv = document.createElement('div');
    adviceGeneratorOutputDiv.classList.add('advice-generator__output');
    const adviceGeneratorNumberSpan = document.createElement('span');
    adviceGeneratorNumberSpan.classList.add('advice-generator__advice-number');
    adviceGeneratorNumberSpan.textContent = `ADVICE #${data.slip.id}`;
    const adviceGeneratorQuote = document.createElement('q');
    adviceGeneratorQuote.classList.add('advice-generator__quote');
    adviceGeneratorQuote.textContent = data.slip.advice;
    const adviceGeneratorPicture = document.createElement('picture');
    adviceGeneratorPicture.classList.add('advice-generator__divider');
    const adviceGeneratorPictureSource = document.createElement('source');
    adviceGeneratorPictureSource.media = "min-width: 545px";
    adviceGeneratorPictureSource.src = "./images/pattern-divider-desktop.svg";
    const adviceGeneratorPictureImg = document.createElement('img');
    adviceGeneratorPictureImg.src = "./images/pattern-divider-mobile.svg";
    adviceGeneratorPictureImg.alt = "Divider Line";
    const adviceGeneratorButton = document.createElement('button');
    adviceGeneratorButton.classList.add('advice-generator__btn');
    const adviceGeneratorButtonImg = document.createElement('img');
    adviceGeneratorButtonImg.classList.add('advice-generator__btn-img');
    adviceGeneratorButtonImg.src = "./images/icon-dice.svg";
    adviceGeneratorButtonImg.alt = 'Dice Icon';
    adviceGeneratorButton.addEventListener('click', async () => {
        const data = await fetchAdviceFromApi();
        adviceGeneratorNumberSpan.textContent = `ADVICE #${data.slip.id}`;
        adviceGeneratorQuote.textContent = data.slip.advice;
    });

    adviceGeneratorOutputDiv.append(adviceGeneratorNumberSpan);
    adviceGeneratorOutputDiv.append(adviceGeneratorQuote);
    adviceGeneratorPicture.append(adviceGeneratorPictureSource);
    adviceGeneratorPicture.append(adviceGeneratorPictureImg);
    adviceGeneratorOutputDiv.append(adviceGeneratorPicture);
    adviceGeneratorDiv.append(adviceGeneratorOutputDiv);
    adviceGeneratorButton.append(adviceGeneratorButtonImg);
    adviceGeneratorDiv.append(adviceGeneratorButton);
    return adviceGeneratorDiv;
};

async function fetchAdviceFromApi() {
    const response = await fetch(ADVICE_API_BASE_URL);
    const data = await response.json();
    return data;
};