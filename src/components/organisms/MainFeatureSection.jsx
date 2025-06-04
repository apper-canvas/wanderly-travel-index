import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../ApperIcon';
import { bookingService } from '../../services'; // Corrected path to services
import SectionTitle from '../atoms/SectionTitle';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import SearchResultCard from '../molecules/SearchResultCard';
import RecentBookingCard from '../molecules/RecentBookingCard';

const MainFeatureSection = () =&gt; {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false); // Consider if this is needed for bookings load
  const [error, setError] = useState(null); // Consider error display
  const [activeTab, setActiveTab] = useState('flights');
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '', // Not currently used but kept for completeness
    passengers: 1,
    class: 'economy' // Not currently used but kept for completeness
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() =&gt; {
    const loadBookings = async () =&gt; {
      setLoading(true);
      try {
        const result = await bookingService.getAll();
        setBookings(result || []);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load recent bookings"); // Added toast for booking load error
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const handleInputChange = (field, value) =&gt; {
    setSearchForm(prev =&gt; ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = async () =&gt; {
    if (!searchForm.from || (activeTab !== 'hotels' &amp;&amp; !searchForm.to) || !searchForm.departDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSearching(true);
    setSearchResults([]); // Clear previous results
    try {
      // Simulate search with delay
      await new Promise(resolve =&gt; setTimeout(resolve, 1500));
      
      // Generate mock search results based on form data and activeTab
      const mockResults = [];
      if (activeTab === 'flights') {
        mockResults.push(
          { id: 1, provider: 'AirExpress', price: 299, duration: '3h 45m', departure: '08:30', arrival: '12:15', stops: 'Non-stop', aircraft: 'Boeing 737' },
          { id: 2, provider: 'SkyLine', price: 259, duration: '5h 20m', departure: '14:15', arrival: '19:35', stops: '1 stop', aircraft: 'Airbus A320' },
          { id: 3, provider: 'CloudWings', price: 349, duration: '3h 30m', departure: '18:45', arrival: '22:15', stops: 'Non-stop', aircraft: 'Boeing 787' }
        );
      } else if (activeTab === 'hotels') {
        mockResults.push(
          { id: 1, provider: 'Grand Hyatt', price: 180, type: 'Hotel', rating: 5, address: '123 Main St' },
          { id: 2, provider: 'Budget Inn', price: 80, type: 'Motel', rating: 3, address: '456 Side St' },
          { id: 3, provider: 'Luxury Suites', price: 300, type: 'Resort', rating: 4, address: '789 Park Ave' }
        );
      } else if (activeTab === 'cars') {
        mockResults.push(
          { id: 1, provider: 'Hertz', price: 50, type: 'Compact Car', model: 'Toyota Corolla', fuel: 'Full to Full' },
          { id: 2, provider: 'Avis', price: 70, type: 'SUV', model: 'Nissan Rogue', fuel: 'Full to Full' },
          { id: 3, provider: 'Enterprise', price: 60, type: 'Sedan', model: 'Honda Civic', fuel: 'Full to Full' }
        );
      }
      
      setSearchResults(mockResults);
      toast.success(`Found ${mockResults.length} ${activeTab} options!`);
    } catch (err) {
      toast.error("Search failed. Please try again.");
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBooking = async (result) =&gt; {
    try {
      const newBooking = {
        type: activeTab,
        provider: result.provider,
        details: {
          from: searchForm.from,
          to: activeTab !== 'hotels' ? searchForm.to : undefined,
          date: searchForm.departDate,
          ...result
        },
        price: result.price,
        currency: 'USD',
        confirmationNumber: `WN${Date.now()}`,
        status: 'confirmed'
      };

      const savedBooking = await bookingService.create(newBooking);
      setBookings(prev =&gt; [...prev, savedBooking]);
      toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} booked successfully!`);
      
      setSearchResults([]); // Reset search results after booking
      setSearchForm({ // Optionally reset form
        from: '',
        to: '',
        departDate: '',
        returnDate: '',
        passengers: 1,
        class: 'economy'
      });
    } catch (err) {
      toast.error("Booking failed. Please try again.");
    }
  };

  const tabs = [
    { id: 'flights', label: 'Flights', icon: 'Plane', color: 'blue' },
    { id: 'hotels', label: 'Hotels', icon: 'Building', color: 'emerald' },
    { id: 'cars', label: 'Cars', icon: 'Car', color: 'amber' }
  ];

  const getTabColors = (tabId, isActive) =&gt; {
    const colors = {
      flights: isActive ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      hotels: isActive ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
      cars: isActive ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
    };
    return colors[tabId] || colors.flights;
  };

  const passengersOptions = activeTab === 'cars' ? [
    { value: '1', label: '1 day' },
    { value: '2', label: '2 days' },
    { value: '3', label: '3 days' },
    { value: '7', label: '1 week' },
  ] : [
    { value: '1', label: `1 ${activeTab === 'flights' ? 'Passenger' : 'Guest'}` },
    { value: '2', label: `2 ${activeTab === 'flights' ? 'Passengers' : 'Guests'}` },
    { value: '3', label: `3 ${activeTab === 'flights' ? 'Passengers' : 'Guests'}` },
    { value: '4', label: `4+ ${activeTab === 'flights' ? 'Passengers' : 'Guests'}` },
  ];

  return (
    &lt;section className="py-12 md:py-16 bg-white/50"&gt;
      &lt;div className="max-w-6xl mx-auto"&gt;
        &lt;SectionTitle 
          title="Smart Travel Booking" 
          description="Search and compare thousands of options across flights, hotels, and transportation. Get the best deals with our intelligent booking system." 
          center 
        /&gt;

        {/* Tab Navigation */}
        &lt;div className="flex flex-col sm:flex-row justify-center mb-8 space-y-2 sm:space-y-0 sm:space-x-2"&gt;
          {tabs.map((tab) =&gt; (
            &lt;Button
              key={tab.id}
              onClick={() =&gt; {
                setActiveTab(tab.id);
                setSearchResults([]);
              }}
              className={`px-4 md:px-6 py-3 ${getTabColors(tab.id, activeTab === tab.id)}`}
              icon={ApperIcon} // Pass ApperIcon component reference
              iconProps={{ name: tab.icon }} // Pass icon name as prop to ApperIcon
            &gt;
              {tab.label}
            &lt;/Button&gt;
          ))}
        &lt;/div&gt;

        {/* Search Form */}
        &lt;motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-effect rounded-2xl p-6 md:p-8 mb-8"
        &gt;
          &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"&gt;
            &lt;Input
              label={activeTab === 'flights' ? 'From' : activeTab === 'hotels' ? 'Destination' : 'Pickup Location'}
              placeholder={activeTab === 'flights' ? 'Departure city' : activeTab === 'hotels' ? 'City or hotel name' : 'Pickup address'}
              value={searchForm.from}
              onChange={(e) =&gt; handleInputChange('from', e.target.value)}
              icon="MapPin"
            /&gt;

            {activeTab !== 'hotels' &amp;&amp; (
              &lt;Input
                label={activeTab === 'flights' ? 'To' : 'Drop-off Location'}
                placeholder={activeTab === 'flights' ? 'Destination city' : 'Drop-off address'}
                value={searchForm.to}
                onChange={(e) =&gt; handleInputChange('to', e.target.value)}
                icon="MapPin"
              /&gt;
            )}

            &lt;Input
              type="date"
              label={activeTab === 'flights' ? 'Departure' : activeTab === 'hotels' ? 'Check-in' : 'Pickup Date'}
              value={searchForm.departDate}
              onChange={(e) =&gt; handleInputChange('departDate', e.target.value)}
              icon="Calendar"
            /&gt;

            &lt;Select
              label={activeTab === 'flights' ? 'Passengers' : activeTab === 'hotels' ? 'Guests' : 'Duration'}
              value={searchForm.passengers}
              onChange={(e) =&gt; handleInputChange('passengers', e.target.value)}
              options={passengersOptions}
              icon="Users"
            /&gt;
          &lt;/div&gt;

          {/* Search Button */}
          &lt;div className="mt-6 text-center"&gt;
            &lt;Button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white shadow-travel hover:shadow-xl disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              icon={isSearching ? ApperIcon : ApperIcon} // Pass ApperIcon component reference
              iconProps={{ name: isSearching ? "Loader" : "Search", className: isSearching ? "animate-spin" : "" }} // Pass icon name and animation
            &gt;
              {isSearching ? 'Searching...' : `Search ${tabs.find(t =&gt; t.id === activeTab)?.label}`}
            &lt;/Button&gt;
          &lt;/div&gt;
        &lt;/motion.div&gt;

        {/* Search Results */}
        &lt;AnimatePresence mode="wait"&gt;
          {searchResults.length &gt; 0 &amp;&amp; (
            &lt;motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            &gt;
              &lt;h4 className="text-xl font-semibold text-gray-900 mb-6"&gt;
                Found {searchResults.length} options for your trip
              &lt;/h4&gt;
              
              {searchResults.map((result, index) =&gt; (
                &lt;SearchResultCard 
                  key={result.id} 
                  result={result} 
                  index={index} 
                  activeTab={activeTab} 
                  onBook={handleBooking} 
                /&gt;
              ))}
            &lt;/motion.div&gt;
          )}
        &lt;/AnimatePresence&gt;

        {/* Recent Bookings */}
        {bookings &amp;&amp; bookings.length &gt; 0 &amp;&amp; (
          &lt;div className="mt-12"&gt;
            &lt;h4 className="text-xl font-semibold text-gray-900 mb-6"&gt;Recent Bookings&lt;/h4&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"&gt;
              {bookings.slice(0, 3).map((booking, index) =&gt; (
                &lt;RecentBookingCard key={booking.bookingId} booking={booking} index={index} /&gt;
              ))}
            &lt;/div&gt;
          &lt;/div&gt;
        )}
      &lt;/div&gt;
    &lt;/section&gt;
  );
};

export default MainFeatureSection;