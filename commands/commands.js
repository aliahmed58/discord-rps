const SEARCH_TORRENT = {
    name: 'search',
    description: 'Search for a movie (exact name) to get its magnet link with seed count',
    type: 1,
    required: true,  
    options: [
        {
            type: 3, 
            name: 'input',
            description: 'Movie name to search',
            required: true,
        }
    ]
}

export const ALL_COMMANDS = [SEARCH_TORRENT]