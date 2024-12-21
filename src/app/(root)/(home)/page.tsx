import { HeroSection } from "./HeroSection.component";
import { PopularDestinations } from "./PopularDestination.component";
import { RecentSearches } from "./RecentSearch.component";
import { ThingsToDo } from "./ThingsToDo.component";

const HomePage = () => {
  return (
    <div className="container">
      <HeroSection />
      <RecentSearches />
      <PopularDestinations />
      <ThingsToDo />
    </div>
  );
};

export default HomePage;
