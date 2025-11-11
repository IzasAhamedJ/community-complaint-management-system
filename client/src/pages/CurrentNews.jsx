import React from 'react'
import NewsCard from '../Components/NewsCard';
import { useState } from 'react';

function CurrentNews() {
    const [news, setNews] = useState([
        {
            id: 1,
            title: "Community Park Renovation Completed",
            description:
                "The Greenfield Community Park renovation is now done! It features new play areas, jogging tracks, and eco-friendly LED lighting.",
            image:
                "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80",
            date: "2025-11-09",
        },
        {
            id: 2,
            title: "Waste Management Drive Initiated",
            description:
                "A new waste management program has been launched to promote cleaner streets and better recycling in the area.",
            image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            date: "2025-11-07",
        },
        {
            id: 3,
            title: "Tree Plantation Event on Sunday",
            description:
                "Join us this Sunday for a community tree plantation near Central Park. Let's make our neighborhood greener together!",
            image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            date: "2025-11-05",
        },
        {
            id: 4,
            title: "Community Park Renovation Completed",
            description:
                "The Greenfield Community Park renovation is now done! It features new play areas, jogging tracks, and eco-friendly LED lighting.",
            image:
                "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80",
            date: "2025-11-09",
        },
        {
            id: 5,
            title: "Waste Management Drive Initiated",
            description:
                "A new waste management program has been launched to promote cleaner streets and better recycling in the area.",
            image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            date: "2025-11-07",
        },
        {
            id: 6,
            title: "Tree Plantation Event on Sunday",
            description:
                "Join us this Sunday for a community tree plantation near Central Park. Let's make our neighborhood greener together!",
            image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            date: "2025-11-05",
        },
    ]);

    return (
        <>
            <section>
                <div className='row'>

                    {news.map((item) => (

                        <div className="col-12 col-md-4 mb-3">
                            <NewsCard
                                key={item.id}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                date={item.date}
                            />
                        </div>

                    ))}
                </div>
            </section>
        </>
    )
}

export default CurrentNews
