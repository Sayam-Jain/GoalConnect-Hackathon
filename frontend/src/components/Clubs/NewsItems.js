export let newsItems = {
    "East Bengal FC": {
        newsItems: [
            {
                thumbnail: "path/to/east-bengal-thumbnail.jpg",
                title: "East Bengal Wins the Match!",
                description: "East Bengal FC wins their latest match against Kerala Blasters."
            }
        ]
    },
    "Mohammedan Sporting Club": {
        newsItems: [
            {
                thumbnail: "path/to/mohammedan-thumbnail.jpg",
                title: "Mohammedan Defeats Bengaluru FC",
                description: "A thrilling match saw Mohammedan Sporting defeat Bengaluru FC 2-1."
            }
        ]
    }
};

// Function to update the news items for a given club
export const updateNewsItems = (clubName, newNewsItem) => {
    if (newsItems[clubName]) {
        newsItems[clubName].newsItems.push(newNewsItem);
    } else {
        // If the club doesn't exist, create a new entry
        newsItems[clubName] = { newsItems: [newNewsItem] };
    }
};
