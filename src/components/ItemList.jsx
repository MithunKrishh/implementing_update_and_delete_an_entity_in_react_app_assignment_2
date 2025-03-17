import { useEffect, useState } from "react";
import Item from "./Item";

const API_URI = `https://${import.meta.env.VITE_API_URI}/doors`;

const ItemList = () => {
    const [items, setItems] = useState([]);

    // Fetch items on component mount
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch(API_URI);
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await fetch(`${API_URI}/${id}`, { method: "DELETE" });
            setItems(items.filter(item => item.id !== id)); // Update state after deletion
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div>
            {items.length > 0 ? (
                items.map((item) => <Item key={item.id} item={item} onDelete={deleteItem} />)
            ) : (
                <p>No items found.</p>
            )}
        </div>
    );
};

export default ItemList;


