import React, { useState, useEffect } from 'react';

const newsData = {
    mainArticles: [
        {
            image: "https://ss-i.thgim.com/public/incoming/whbpm8/article68760636.ece/alternates/LANDSCAPE_1200/WhatsApp%20Image%202024-10-16%20at%2015.12.01.jpeg",
            alt: "A young athlete standing on a field with stadium lights in the background",
            title: "ISL 2024-25: NorthEast United FC chases consistency as Chennaiyin FC pays visit",
            date: "14 Oct, 2024"
        },
        {
            image: "https://ss-i.thgim.com/public/incoming/e5pi4f/article68114049.ece/alternates/LANDSCAPE_1200/PTI04_15_2024_000360B.jpg",
            alt: "Celebrating a victory in a match",
            title: "ISL 2024-25 Schedule: Full list of matches, dates, venues for the entire Indian Super League season",
            date: "13 Oct, 2024"
        },
        {
            image: "https://ss-i.thgim.com/public/incoming/86foln/article68566069.ece/alternates/LANDSCAPE_1200/PTI07_29_2024_000368A.jpg",
            alt: "A coach giving a motivational speech",
            title: "East Bengal ISL 2024-25 Schedule: EBFC to plays Mohun Bagan on October 19 and January 11",
            date: "12 Oct, 2024"
        },
        {
            image: "https://ss-i.thgim.com/public/incoming/mw0oju/article68565866.ece/alternates/LANDSCAPE_1200/80717_23_8_2024_20_0_57_5_KBFCVSBFC5.JPG",
            alt: "An intense moment in a soccer game",
            title: "Kerala Blasters ISL 2024-25 Schedule: KBFC to kick off Indian Super League season at home against Punjab FC",
            date: "11 Oct, 2024"
        },
        {
            image: "https://ss-i.thgim.com/public/incoming/6m3ayz/article68565957.ece/alternates/LANDSCAPE_1200/PTI08_08_2024_000381B.jpg",
            alt: "Players training in the field",
            title: "Mohun Bagan ISL 2024-25 schedule: Mariners play East Bengal on October 9 and January 11",
            date: "10 Oct, 2024"
        },
    ],
    articles: [
        {
            image: "https://ss-i.thgim.com/public/incoming/hlyaqp/article68758093.ece/alternates/LANDSCAPE_1200/Screenshot%202024-10-15%20221838.png",
            alt: "A coach speaking at a press conference",
            title: "SAFF Women’s Championship 2024: Blue Tigresses reach Nepal before India vs Pakistan opener",
            date: "13 Oct, 2024"
        },
        {
            image: "https://ss-i.thgim.com/public/incoming/5b33do/article68753741.ece/alternates/LANDSCAPE_1200/KUN06978-2-800x500.jpg",
            alt: "A soccer match between two teams",
            title: "Indian women’s football team coach Santosh Kashyap announces 23-member squad for the SAFF Championship 2024",
            date: "12 Oct, 2024"
        },
        {
            image: "https://ss-i.thgim.com/public/incoming/o65rqo/article68746529.ece/alternates/LANDSCAPE_1200/Farukh%20Chaudhary%20.jpg",
            alt: "A goalkeeper making a save during a match",
            title: "Farukh scores crucial equaliser as India plays out 1-1 draw against Vietnam in international friendly",
            date: "11 Oct, 2024"
        },
        {
            image: "https://ss-i.thgim.com/public/incoming/u4rr7x/article68719169.ece/alternates/LANDSCAPE_300/Armando%20Sadiku%20of%20FC%20Goa%20celebrates%20after%20scoring%20the%20second%20goal%20against%20NorthEast%20United%20FC%20%20at%20the%20Jawaharlal%20Nehru%20Stadium%20on%20Friday.JPG",
            alt: "A coach giving instructions to players during training",
            title: "ISL 2024-25 Golden boot race: Sadiku on top, Chhetri in fifth",
            date: "11 Oct, 2024"
        },
        {
            image: "https://ss-i.thgim.com/public/incoming/8xzgg7/article68748333.ece/alternates/LANDSCAPE_1200/AKH_7756.JPG",
            alt: "A young athlete celebrating a goal",
            title: "We could have scored another: Farukh Choudhary after 1-1 draw against Vietnam",
            date: "10 Oct, 2024"
        },
        {
            image: "https://ss-i.thgim.com/public/incoming/r970ck/article68745709.ece/alternates/LANDSCAPE_1200/PARK1162.JPG",
            alt: "Fans cheering in a stadium",
            title: "Odisha FC ends AWCL with 0-4 defeat to Taichung Blue Whale",
            date: "09 Oct, 2024"
        },
        {
            image: "https://ss-i.thgim.com/public/incoming/81pz6b/article68737681.ece/alternates/LANDSCAPE_1200/11908_19_1_2024_12_34_5_3_EMM_7909_2.JPG",
            alt: "A player dribbling past an opponent",
            title: "I-League return, youth development, future plans: Dempo CEO Pradhyum Reddy on climbing Indian Football ladder",
            date: "08 Oct, 2024"
        },
        {
            image: "https://ss-i.thgim.com/public/incoming/jou5rn/article68735912.ece/alternates/LANDSCAPE_1200/Odisha%20winning%20IWL.JPG",
            alt: "A coach discussing strategies with players",
            title: "Odisha FC Women - A juggernaut on the rise",
            date: "07 Oct, 2024"
        },
    ]
};

const MainArticle = ({ article, onNext, onPrev, isPrevDisabled, isNextDisabled }) => (
    <div className="relative bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-4">
        <img src={article.image} alt={article.alt} className="w-full h-96 object-cover"/>
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4 w-full">
            <div className="flex items-center text-white mb-2">
                <i className="fas fa-file-alt mr-2"></i>
                <span className="text-lg font-semibold">{article.title}</span>
            </div>
            <span className="text-sm">{article.date}</span>
        </div>
        <button 
            onClick={onPrev} 
            disabled={isPrevDisabled} 
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            &lt;
        </button>
        <button 
            onClick={onNext} 
            disabled={isNextDisabled} 
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            &gt;
        </button>
    </div>
);

const Article = ({ image, alt, title, date }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
        <img src={image} alt={alt} className="w-full h-48 object-cover"/>
        <div className="p-4">
            <div className="flex items-center text-gray-300 mb-2">
                <i className="fas fa-file-alt mr-2"></i>
                <span className="text-lg font-semibold">{title}</span>
            </div>
            <span className="text-sm text-gray-500">{date}</span>
        </div>
    </div>
);

const News = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredArticles = newsData.articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNext = () => {
        if (currentIndex < newsData.mainArticles.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 
    return (
        <div className="bg-black text-white min-h-screen py-8">
            <div className="max-w-6xl mx-auto p-4">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                    />
                </div>
                
                <div className="relative mb-4">
                    <MainArticle 
                        article={newsData.mainArticles[currentIndex]} 
                        onNext={handleNext}
                        onPrev={handlePrev}
                        isPrevDisabled={currentIndex === 0}
                        isNextDisabled={currentIndex === newsData.mainArticles.length - 1}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    {filteredArticles.map((article, index) => (
                        <Article 
                            key={index}
                            image={article.image} 
                            alt={article.alt} 
                            title={article.title} 
                            date={article.date} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
