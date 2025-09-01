const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const Club = require('../models/Club');
const Player = require("../models/Player")
const Fixture = require('../models/Fixture')
const moment = require('moment');

router.get('/fetch/clubs', async (req, res) => {
    try {
        const { data } = await axios.get('https://www.indiansuperleague.com/clubs');
        const $ = cheerio.load(data);
        const baseURL = "https://www.indiansuperleague.com/";

        $('.club-item').each(async (index, element) => {
            const shortName = $(element).find('.short-name').text().trim();
            const fullName = $(element).find('.full-name').text().trim();
            const venue = $(element).find('.club-venue').text().trim();
            const logoImg = baseURL + ($(element).find('.club-logo img').attr('data-src') || $(element).find('.club-logo img').attr('src'));
            const bannerImg = baseURL + ($(element).find('.club-head img').attr('data-src') || $(element).find('.club-head img').attr('src'));
            const link = baseURL + $(element).find('a.btn').attr('href');

            const existingClub = await Club.findOne({ fullName });

            if (!existingClub) {
                await Club.create({ shortName, fullName, venue, logoImg, bannerImg, link });
            } else {
                if (existingClub.shortName !== shortName || existingClub.venue !== venue ||
                    existingClub.logoImg !== logoImg || existingClub.bannerImg !== bannerImg ||
                    existingClub.link !== link) {
                    await Club.updateOne(
                        { fullName },
                        { shortName, venue, logoImg, bannerImg, link }
                    );
                }
            }
        });

        res.status(200).json({ message: 'Club data scraped and saved successfully.' });

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while scraping the data.');
    }
});

// Route to fetch all club data
router.get('/clubs', async (req, res) => {
    try {
        const updatedClubs = await Club.find();
        res.json(updatedClubs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Failed to fetch clubs' });
    }
});

router.get('/scrape-fixtures', async (req, res) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage();
        await page.goto('https://www.the-aiff.com/', { waitUntil: 'networkidle0' });
        await page.waitForSelector('#fixture_scroll .item');

        const monthMapping = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
            'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
            'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };

        const fixtures = await page.evaluate(() => {
            const fixtureElements = document.querySelectorAll('#fixture_scroll .item');
            const fixtureData = [];

            fixtureElements.forEach((element) => {
                const date = element.querySelector('.match_date')?.textContent?.trim();
                const day = element.querySelector('.day')?.textContent?.trim();
                const monthText = element.querySelector('.day-month')?.textContent.trim();
                const tournamentName = element.querySelector('.tournament-name a, .tournament-name span')?.textContent?.trim();
                const venue = element.querySelector('.venue')?.textContent?.trim();

                const team1Name = element.querySelectorAll('.team-name.text-center')[0]?.textContent?.trim();
                const team2Name = element.querySelectorAll('.team-name.text-center')[1]?.textContent?.trim();

                const scoreText = element.querySelector('.score-info span')?.textContent?.trim();
                const time = scoreText?.includes(':') ? scoreText : null;
                const team1Score = scoreText?.includes('-') ? scoreText.split('-')[0]?.trim() : null;
                const team2Score = scoreText?.includes('-') ? scoreText.split('-')[1]?.trim() : null;

                const team1Logo = element.querySelector('.team-info .image img')?.src || null;
                const team2Logo = element.querySelectorAll('.team-info .image img')[1]?.src || null;

                fixtureData.push({
                    date,
                    day,
                    month: monthText,
                    tournamentName,
                    venue,
                    time,
                    team1Name,
                    team2Name,
                    team1Score,
                    team2Score,
                    team1Logo,
                    team2Logo,
                    status: null
                });
            });

            return fixtureData;
        });

        const today = moment().startOf('day');
        fixtures.forEach(fixture => {
            const monthYearText = fixture.month.split("\n").pop().trim().replace("'", "");
            const [monthAbbreviation, year] = monthYearText.split(" ");
            const month = monthMapping[monthAbbreviation];
            const day = fixture.date.padStart(2, '0');
            const matchDateString = `${year}-${month}-${day}`;
            const matchDate = moment(matchDateString, 'YYYY-MM-DD').startOf('day');

            if (matchDate.isAfter(today)) {
                fixture.status = 'upcoming';
                fixture.team1Score = null;
                fixture.team2Score = null;
            } else if (matchDate.isSame(today)) {
                fixture.status = fixture.team1Score || fixture.team2Score ? 'live' : 'upcoming';
            } else {
                fixture.status = 'past';
            }
        });

        await Fixture.deleteMany({});
        console.log(`Inserted ${fixtures.length} new fixtures.`);
        await Fixture.insertMany(fixtures);


        const updatedFixtures = await Fixture.find();
        res.json(updatedFixtures);

    } catch (err) {
        console.error('Error scraping fixtures:', err);
        res.status(500).json({ success: false, message: 'Scraping failed' });
    } finally {
        if (browser) await browser.close();
    }
});

// Route to scrape player data and update the database
router.get('/fetch/players', async (req, res) => {
    try {
        const clubs = await Club.find(); // Fetch all club links from the Club model
        const playerData = []; // Array to store player data from all clubs

        // Loop through all clubs
        for (const club of clubs) {
            const { link, _id: clubId } = club; // Get the club's link and ID
            const fullProfileURL = `${link}/squad`; // Create the squad URL
            console.log(`Fetching data from: ${fullProfileURL}`);

            // Wrap the scraping process in a try-catch to handle errors
            try {
                // Fetch squad data from the club's URL
                const { data } = await axios.get(fullProfileURL);
                const $ = cheerio.load(data); // Load HTML into Cheerio

                // Loop through each player in the squad
                const promises = $('.squad-item').map(async (index, element) => {
                    const playerFirstName = $(element).find('.name.first-name').text().trim();
                    const playerLastName = $(element).find('.name.last-name').text().trim();
                    const playerName = `${playerFirstName} ${playerLastName}`;
                    const playerNumber = $(element).find('.player-number').text().trim();
                    const playerImage = $(element).find('.player-thumbnail img').attr('data-src') || $(element).find('.player-thumbnail img').attr('src');
                    const profileLink = $(element).find('.card-action a').attr('href');
                    const playerPosition = $(element).closest('.squad-listing').find('h3.sub-title').text().trim();

                    // Extract player stats
                    const stats = {};
                    $(element).find('.player-stats-item').each((i, statElement) => {
                        const statTitle = $(statElement).find('.player-stats-title').text().trim();
                        const statCount = $(statElement).find('.player-stats-count').text().trim();
                        stats[statTitle] = statCount;
                    });

                    // Create a player object
                    const playerObject = {
                        firstName: playerFirstName,
                        lastName: playerLastName,
                        fullName: playerName,
                        playerNumber,
                        position: playerPosition,
                        club: clubId, // Add the club reference here
                        stats: {
                            matchesPlayed: stats['MATCHES PLAYED'] || 0,
                            saves: stats['SAVES'] || 0,
                            cleanSheets: stats['CLEAN SHEETS'] || 0,
                            tackles: stats['TACKLES'] || 0,
                            assists: stats['ASSISTS'] || 0,
                        },
                        profileLink: `https://www.indiansuperleague.com${profileLink}`,
                        imageUrl: `https://www.indiansuperleague.com${playerImage}`,
                    };

                    playerData.push(playerObject);

                    // Check if the player already exists in the database
                    const existingPlayer = await Player.findOne({ fullName: playerName, club: clubId });
                    if (!existingPlayer) {
                        await Player.create(playerObject); // Create a new player in the DB
                    } else {
                        await Player.updateOne({ fullName: playerName, club: clubId }, { $set: playerObject }); // Update existing player data
                    }
                }).get();

                // Wait for all promises (players) to resolve before continuing to the next club
                await Promise.all(promises);
            } catch (error) {
                console.error(`Failed to fetch data for club: ${fullProfileURL}, Error:`, error.message);
                continue; // Skip to the next club if there's an error with this one
            }
        }

        // Send the scraped player data as a response
        res.status(200).json({
            message: 'Players data scraped and saved successfully',
            players: playerData,
        });

    } catch (error) {
        console.error('Error occurred while scraping player data:', error);
        res.status(500).json({ message: 'Error occurred while scraping player data.' });
    }
});

// Route to get players based on the club ID
router.get('/players/:clubId', async (req, res) => {
    const { clubId } = req.params;

    try {
        const players = await Player.find({ club: clubId }); // Fetch players by club ID
        if (!players.length) {
            return res.status(404).json({ message: 'No players found for this club.' });
        }

        res.status(200).json({
            message: `Players found for club ID: ${clubId}`,
            players,
        });

    } catch (error) {
        console.error(`Error occurred while fetching players for club ID ${clubId}:`, error);
        res.status(500).json({ message: 'Error occurred while fetching players data.' });
    }
});

function timeoutPromise(ms) {
    return new Promise((_, reject) => setTimeout(() => reject(new Error("Operation timed out")), ms));
}

async function scrapeAndSavePlayerStats(url) {
    return Promise.race([
        (async () => {
            let browser;
            try {
                if (!url || url === "https://www.indiansuperleague.comundefined") return null;

                browser = await puppeteer.launch({ headless: true });
                const page = await browser.newPage();
                
                await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
                await page.waitForFunction(() => typeof window.playerprofile_08_1 !== 'undefined', { timeout: 30000 });

                const playerStats = await page.evaluate(() => {
                    const profileData = window.playerprofile_08_1;
                    return {
                        bio: profileData?.pagePlayerData?.bio,
                        seasonStats: profileData?.stats?.season
                    };
                });

                const playerData = {
                    player_id: playerStats.bio.player_id,
                    full_name: playerStats.bio.full_name,
                    position: playerStats.bio.position_name,
                    nationality: playerStats.bio.nationality,
                    current_team_name: playerStats.bio.current_team_name,
                    height: playerStats.bio.height,
                    weight: playerStats.bio.weight,
                    date_of_birth: playerStats.bio.date_of_birth,
                    seasonStats: playerStats.seasonStats.map(season => ({
                        year: season.year,
                        matches: season.matches,
                        minutes: season.minutes,
                        goals: season.goals,
                        assists: season.assists,
                        saves: season.saves,
                        clean_sheets: season.clean_sheet,
                        yellow_cards: season.yellow_cards,
                        red_cards: season.red_cards,
                        passing_accuracy: season.passing_accuracy_percentage,
                        tackles_won: season.tackles_won,
                        aerial_duel_won: season.aerial_duel_won,
                        fouls_committed: season.fouls_committed,
                        interceptions: season.interception,
                        clearances: season.clearance,
                        goals_conceded: season.goals_conceded,
                        shots_faced: season.shots_faced,
                        avg_saves_per_game: season.avg_saves_per_game,
                    }))
                };

                const updatedPlayer = await PlayerStats.findOneAndUpdate(
                    { player_id: playerData.player_id },
                    playerData,
                    { new: true, upsert: true }
                );

                return updatedPlayer;

            } catch (error) {
                console.error('Error scraping player stats:', error);
                return null;
            } finally {
                if (browser) await browser.close();
            }
        })(),
        timeoutPromise(60000) // Timeout after 60 seconds
    ]);
}

// API 1: Fetch stats for all players from the Players model
router.get('/fetch/players-stats', async (req, res) => { 
    try {
        const players = await Player.find({});

        const validPlayers = players.filter(player => 
            player.profileLink && player.profileLink !== "https://www.indiansuperleague.comundefined"
        );

        const playerStatsPromises = validPlayers.map(player => scrapeAndSavePlayerStats(player.profileLink));
        const playerStatsResults = await Promise.all(playerStatsPromises);

        const successfulStats = playerStatsResults.filter(result => result !== null);
        res.json(successfulStats);

    } catch (error) {
        console.error('Error fetching all player statistics:', error);
        res.status(500).json({ error: 'Failed to fetch all player statistics' });
    }
});


module.exports = router;
