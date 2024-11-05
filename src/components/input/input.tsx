import "./input.css";

interface InputProps {
    onSearch: (searchText: string) => void;
}

const Input: React.FC<InputProps> = ({ onSearch }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <input
            className="input-search"
            placeholder="Search..."
            onChange={handleChange}
        />
    );
};

export default Input;