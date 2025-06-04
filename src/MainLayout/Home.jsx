
import BannerSlider from '../componets/BannerSlider';
import LatestItems from '../componets/LatestItems';
import ExtraSection from '../componets/ExtraSection';
import ExtraSectionTwo from '../componets/ExtraTwoSection';
import Job from './Job';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Home = () => {

   const [items, setItems] = useState([]);

const navigate = useNavigate();


  useEffect(() => {
    axios.get("http://localhost:5000/items/home")
      .then(res => setItems(res.data));
  }, []);
  /* const job=fetch('http://localhost:5000/items')
  .then(res=>res.json()) */
    return (
        <div>
            
          <BannerSlider/>
         <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">All Lost & Found Items</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />
            
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description.slice(0, 80)}...</p>
              <p className="text-gray-500 text-sm"> {item.location}</p>
               <p className="text-gray-500 text-sm"> {item.date}</p>

              <p className={`inline-block px-2 py-1 text-xs rounded ${
                item.postType === "Lost" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}>
                {item.postType}
              </p>

              <div className="pt-3">
                 <div className="pt-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
            onClick={() => navigate(`/items/${item._id}`)}
          >
            Details
          </button>
        </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

          <LatestItems/>

        
         <div className='mt-14'>
           <ExtraSection/>
          <ExtraSectionTwo/>
         </div>
          

        </div>
    );
};

export default Home;