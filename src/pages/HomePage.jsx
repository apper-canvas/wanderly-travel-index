import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import HomePageTemplate from '../components/templates/HomePageTemplate';
import { tripService } from '../services';

const HomePage = () =&gt; {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // This error is not currently displayed to the user.

  useEffect(() =&gt; {
    const loadTrips = async () =&gt; {
      setLoading(true);
      try {
        const result = await tripService.getAll();
        setTrips(result);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load trips."); // Consistent toast for errors
      } finally {
        setLoading(false);
      }
    };
    loadTrips();
  }, []);

  return (
    &lt;HomePageTemplate trips={trips} loading={loading} error={error} /&gt;
  );
};

export default HomePage;