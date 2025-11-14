import React, { useEffect } from 'react'
import NewsCard from '../Components/NewsCard';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function CurrentNews() {
    const [news, setNews] = useState([]);

    const{axios,image_base_url}=useAppContext();

    useEffect(()=>{
       
        const fetchCurrentNews=async()=>{
          try { 
            const{data:response}=await axios.get('/api/news/getNews');


            if(response.success){
                setNews(response.data.reverse());
            }
            
          } catch (error) {
             toast.error(error.message)
          }
        }


        fetchCurrentNews();
    },[axios])


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
