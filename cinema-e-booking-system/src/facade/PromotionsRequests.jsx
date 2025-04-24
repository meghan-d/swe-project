import axios from "axios";

const PromotionRequests = {
    addPromotion: async (promo) => {
        try {
        const response = await fetch("http://localhost:5001/addPromotion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(promo),
        });
        return response.json;
        } catch (error) {
            console.error("Error adding promotion:", error)
        }
    }, 

    getAllPromotions: async () => {
        try {
            const response = await axios.get("http://localhost:5001/promotions");
            return response.data;
        } catch (error) {
            console.log("Error fetching promotions:", error);
        }
    }
};

export default PromotionRequests;