// defining commands that should be registered with the app

export const CHALLENGE_COMMAND = {
    name: 'rockpaperscissors',
    description: 'Challenge to a match of rock paper scissors :3',
    options: [
        {
            type: 3, // string sub commmand
            name: 'weapon',
            description: 'Choose your weapon',
            required: true, 
            choices: [
                {
                    name: 'Rock',
                    value: 'rock'
                },
                {
                    name: 'Paper',
                    value: 'paper'
                },
                {
                    name: 'Scissors',
                    value: 'scissors'
                }
            ] 
        }
    ],
    type: 1,
}

