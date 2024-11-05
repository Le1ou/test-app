import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SearchResetterProps {
  setSearchText: (text: string) => void;
}

const SearchResetter: React.FC<SearchResetterProps> = ({ setSearchText }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setSearchText('');
    }
  }, [location.pathname, setSearchText]);

  return null;
};

export default SearchResetter;
