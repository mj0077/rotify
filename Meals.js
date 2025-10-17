const Meals = [
    {
        "name": "Breakfast",
        "plans": [
            {
                "plan_id": "01",
                "plan_name": "Standard",
                "plan_pricing": {
                    "plate": "₹ 80",
                    "monthly": "₹ 2000"
                },
                "plan_features": [
                    "Stuffed Parantha", "Poha", "Aloo Puri", "Curd", "Chole Kulche"
                ]
            }
        ],
        "imageUrl": "../assets/images/morning.jpg",
    },
    {
        "name": "Lunch",
        "plans": [
            {
                "plan_id": "02",
                "plan_name": "Standard",
                "plan_pricing": {
                    "plate": "₹ 90",
                    "monthly": "₹ 2000"
                },
                "plan_features": [
                    "4 Chapatis", "Daal", "Vegetarian Main", "Rice", "Salad"
                ],
                "features_not_incl": [
                    "Raita", "Pickle"
                ]
            },
            {
                "plan_id": "03",
                "plan_name": "Deluxe",
                "plan_pricing": {
                    "plate": "₹ 120",
                    "monthly": "₹ 3200"
                },
                "plan_features": [
                    "Everything in Standard", "+ Raita", "+ Pickle"
                ]
            },
        ],
        "imageUrl": "/../../assets/images/noon.webp",
    },
    {
        "name": "Dinner",
        "plans": [
            {
                "plan_id": "04",
                "plan_name": "Standard",
                "plan_pricing": {
                    "plate": "₹ 90",
                    "monthly": "₹ 2000"
                },
                "plan_features": [
                    "4 Chapatis", "Daal", "Vegetarian Main", "Rice", "Salad"
                ],
                "features_not_incl": [
                    "Raita", "Pickle"
                ]
            },
            {
                "plan_id": "05",
                "plan_name": "Deluxe",
                "plan_pricing": {
                    "plate": "₹ 120",
                    "monthly": "₹ 3200"
                },
                "plan_features": [
                    "Everything in Standard", "+ Raita", "+ Pickle"
                ]
            },
        ],
        "imageUrl": "/assets/images/night.jpg",
    }
];

export default Meals;