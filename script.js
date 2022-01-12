const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [{
        id: 1,
        text: 'I am not ashamed of my tears when I am sad enough to cry, even when others are arounded.',
        options: [{
                text: 'True',
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: 'False',
                setState: { blueGoo: true },
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Even with strangers, I seldom feel bored, impatient or lonely.',
        options: [{
                text: 'True, I feel comfortable',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'False, I do not feel comfortable',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: 'I have no idea',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'What was your answer?',
        options: [{
                text: 'True for both',
                nextText: 4
            },
            {
                text: 'A true and a false',
                nextText: 5
            },
            {
                text: 'False for both',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'Adult ego state is your dominant ego state, You can smile now',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 5,
        text: 'You should concern about improving your mentality!',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 6,
        text: 'Are you concerned about approval of others?',
        options: [{
                text: 'Yes',
                nextText: 9
            },
            {
                text: 'No',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'Being a subordinate is not that easy but is better than being the boss.',
        options: [{
                text: 'Yes for this one and no for previous one',
                nextText: 8
            },
            {
                text: 'A yes and a no',
                requiredState: (currentState) => currentState.sword,
                nextText: 9
            },
            {
                text: 'I am confused',
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
        ]
    },
    {
        id: 8,
        text: 'You are in a child mindset',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 9,
        text: 'You should improve your mentality as an adult',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 10,
        text: 'Adults will not get confused',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
]

startGame()