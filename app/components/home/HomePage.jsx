import FeaturedRecipes from "./FeaturedRecipes";
import HeroBanner from "./HeroBanner";
import HowItWorks from "./HowItWorks";
import PopularRecipes from "./PopularRecipes";
import WhyChooseUs from "./WhyChooseUs";

const HomePage = () => {
    return (
        <div>
            <HeroBanner />
            <FeaturedRecipes />
            <PopularRecipes />
            <WhyChooseUs />
            <HowItWorks />
        </div>
    );
};

export default HomePage;