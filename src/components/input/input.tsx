interface InputProps {
    onSearch: (searchText: string) => void;
}

const Input: React.FC<InputProps> = ({ onSearch }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <input
            placeholder="Search..."
            onChange={handleChange}
        />
    );
};

export default Input;