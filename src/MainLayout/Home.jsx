
import BannerSlider from '../componets/BannerSlider';
import LatestItems from '../componets/LatestItems';
import ExtraSection from '../componets/ExtraSection';
import ExtraSectionTwo from '../componets/ExtraTwoSection';
import Job from './Job';

const Home = () => {
  /* const job=fetch('http://localhost:5000/items')
  .then(res=>res.json()) */
    return (
        <div>
            
          <BannerSlider/>
          <LatestItems/>
          <ExtraSection/>
          <ExtraSectionTwo/>

        <Job></Job>

        </div>
    );
};

export default Home;