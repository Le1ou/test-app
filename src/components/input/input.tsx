import { useEffect, useState } from "react";
import { debounce } from "lodash";

interface InputProps {
    onSearch: (searchText: string) => void; // Функция обратного вызова для поиска
}

const Input: React.FC<InputProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    // Дебаунсируем вызов функции поиска
    const debouncedSearch = debounce((text: string) => {
        onSearch(text);
    }, 1000); // 300 мс задержка

    useEffect(() => {
        debouncedSearch(searchText);
        // Очистка дебаунс функции при размонтировании
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchText]);

    return (
        <input
            placeholder="Search..."
            value={searchText}
            onChange={handleChange}
        />
    );
};

export default Input;