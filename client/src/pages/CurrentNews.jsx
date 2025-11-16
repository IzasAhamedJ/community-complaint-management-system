import React, { useEffect, useState } from 'react';
import NewsCard from '../Components/NewsCard';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function CurrentNews() {
    const [news, setNews] = useState([]);

    const { axios } = useAppContext();

    useEffect(() => {
        fetchCurrentNews();
    }, []);

    const fetchCurrentNews = async () => {
        try {
            const { data: response } = await axios.get('/api/news/getNews');

            if (response.success) {
                setNews(response.data.reverse());
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteData = async (id) => {
        try {
            const { data: response } = await axios.delete(`/api/news/deleteAnnouncement/${id}`);

            if (response.success) {
                toast.success(response.message);
                fetchCurrentNews();
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <section>
            <div className="row">
                {news.length > 0 ? (
                    news.map((item) => (
                        <div className="col-12 col-md-4 mb-3" key={item._id}>
                            <NewsCard
                                id={item._id}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                date={item.date}
                                deleteAnnouncement={deleteData}
                            />
                        </div>
                    ))
                ) : (
                    <div className="text-center fs-2 fw-bold">No Announcement Found</div>
                )}
            </div>
        </section>
    );
}

export default CurrentNews;
