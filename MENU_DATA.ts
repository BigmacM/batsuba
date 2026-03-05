// ============================================================
// MENU_DATA.ts — BUTSABA Wine & Cafe
// Complete menu data extracted from official menu PDF.
// DO NOT edit prices or items without updating the physical menu.
// Currency: Thai Baht (THB)
// ============================================================

export interface MenuItem {
  code?: number | string;
  name: string;
  price: number;
  note?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  emoji?: string;
  items: MenuItem[];
  note?: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "quick-dishes",
    label: "Quick Dishes",
    emoji: "⚡",
    items: [
      { name: "Chili Meat Potato with Cheese", price: 290 },
      { name: "Smoked Salmon Avocado Salad", price: 290 },
      { name: "Fried Sillago with Lime & Young Ginger", price: 220 },
      { name: "Lemon Flavored Seafood Salad", price: 260 },
      { name: "Garlic Balsamic Mushrooms", price: 260 },
      { name: "Vegetable Sticks with Smoked Salmon Cream Dip", price: 190 },
    ],
  },
  {
    id: "salads",
    label: "Salads",
    emoji: "🥗",
    items: [
      { code: 859, name: "Tuna Tataki", price: 490 },
      { code: 860, name: "Caesar Salad", price: 190 },
      { code: 861, name: "Salmon Carpaccio", price: 290 },
      { code: 862, name: "Burrata with Parma Ham", price: 300 },
      { code: 863, name: "Seabass Carpaccio", price: 250 },
      { code: 864, name: "Tuna Carpaccio", price: 350 },
      { code: 865, name: "Tomato Mozzarella", price: 220 },
      { code: 866, name: "Roquette Salad", price: 190 },
      { code: 867, name: "Cold Pasta Salad", price: 220 },
      { code: 868, name: "Stir-fried Asparagus", price: 220 },
    ],
  },
  {
    id: "snacks-appetizers",
    label: "Snacks & Appetizers",
    emoji: "🧀",
    items: [
      { code: 869, name: "Cheese Mix", price: 350 },
      { code: 870, name: "Bread", price: 100 },
      { code: 871, name: "Ham Cheese Wrap", price: 380 },
      { code: 872, name: "Bruschetta", price: 190 },
      { code: 873, name: "Olive Cheese", price: 250 },
      { code: 874, name: "Cheese and Biscuit Plate", price: 450 },
      { code: 879, name: "Baked Spinach Cheeses", price: 190 },
      { code: 880, name: "Fried Chicken", price: 190 },
      { code: 881, name: "French Fries", price: 100 },
      { code: 882, name: "Fried Shrimps", price: 190 },
      { code: 883, name: "Potato Cheese Pie", price: 180 },
      { code: 884, name: "Spinach with Butter", price: 150 },
    ],
  },
  {
    id: "japanese",
    label: "Japanese Dishes",
    emoji: "🍣",
    items: [
      { code: 918, name: "Japanese Rolled Omelette", price: 220 },
      { code: 919, name: "Assorted Tempura", price: 340 },
      { code: 920, name: "Fried Chicken (Japanese Style)", price: 320 },
      { code: 921, name: "Salmon Sashimi", price: 290 },
      { code: 953, name: "Edamame", price: 100 },
    ],
  },
  {
    id: "soups",
    label: "Soups",
    emoji: "🍲",
    items: [
      { code: 875, name: "Tomato Soup", price: 220 },
      { code: 876, name: "Lobster Soup", price: 220 },
      { code: 877, name: "Mushrooms Soup", price: 220 },
      { code: 878, name: "Seafood Soup", price: 300 },
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    emoji: "🍝",
    note: "Noodle options: Penne, Spaghetti, Fettuccine",
    items: [
      { code: 885, name: "Pescatore", price: 350 },
      { code: 886, name: "Carbonara", price: 320 },
      { code: 887, name: "Penne Arrabbiata", price: 290 },
      { code: 888, name: "Squid Ink", price: 320 },
      { code: 889, name: "Vongole", price: 350 },
      { code: 890, name: "Fettuccine Mushrooms and Truffle Cream", price: 390 },
      { code: 891, name: "Fusilli Mushrooms and Mozzarella", price: 320 },
      { code: 892, name: "Lasagna", price: 390 },
      { code: 893, name: "Spaghetti Burrata", price: 420 },
      { code: 894, name: "Bolognese", price: 320 },
      { code: 895, name: "Peperoncino", price: 260 },
      { code: 896, name: "Pesto Genovese", price: 320 },
      { code: 897, name: "Spaghetti Pad Kee Mao", price: 350 },
    ],
  },
  {
    id: "main-courses",
    label: "Secondo Piatto (Main Courses)",
    emoji: "🍽️",
    items: [
      { code: 898, name: "Scallops with Butter", price: 280 },
      { code: 899, name: "Scallops Stir-fried with Spinach and Butter", price: 280 },
      { code: 900, name: "Seafood Ajillo", price: 320 },
      { code: 901, name: "Shrimp Ajillo", price: 250 },
      { code: 902, name: "Vegetable Ajillo", price: 220 },
      { code: 903, name: "Beef & Ricotta Zucchini Rolls", price: 220 },
      { code: 904, name: "Doryfish Rice and Spinach", price: 240 },
      { code: 905, name: "Mussels with Tomato Sauce", price: 220 },
      { code: 906, name: "Grilled Beef with Gravy Sauce", price: 390 },
      { code: 907, name: "White Fish with Cream Sauce", price: 290 },
      { code: 908, name: "Tuna Tartare", price: 350 },
      { code: 909, name: "Fried Calamari", price: 190 },
      { code: 910, name: "Assorted Sausages", price: 290 },
      { code: 911, name: "Fish with Crab Sauce", price: 320 },
    ],
  },
  {
    id: "pizza",
    label: "Pizza",
    emoji: "🍕",
    items: [
      { code: 391, name: "Margherita", price: 270 },
      { code: 392, name: "Four Seasons", price: 360 },
      { code: 393, name: "Hawaiian", price: 320 },
      { code: 394, name: "Truffle", price: 380 },
      { code: 395, name: "Seafood", price: 390 },
      { code: 396, name: "Spicy Sausage", price: 350 },
      { code: 397, name: "Salami", price: 350 },
      { code: 398, name: "Prosciutto and Cheese", price: 380 },
      { code: 399, name: "Vegetable", price: 320 },
      { code: 400, name: "Pepperoni", price: 350 },
      { code: "-", name: "Four Cheese Pizza", price: 420 },
    ],
  },
  {
    id: "steak-meat",
    label: "Steak & Meat",
    emoji: "🥩",
    items: [
      { code: 912, name: "Wagyu Fillet Steak 250g", price: 890 },
      { code: 913, name: "Hamburg Steak", price: 280 },
      { code: 914, name: "Roast Beef", price: 420 },
      { code: 915, name: "Pork Chop", price: 380 },
      { code: 916, name: "Pork Rib BBQ", price: 450 },
    ],
  },
  {
    id: "seafood",
    label: "Seafood",
    emoji: "🦞",
    items: [
      { code: 701, name: "Salmon Steak", price: 450 },
      { code: 702, name: "Salmon Steak with Lemon Cream Sauce", price: 440 },
      { code: 703, name: "Salmon Salad", price: 420 },
      { code: 704, name: "Stir Fried Asparagus with Shrimp", price: 290 },
      { code: 705, name: "Stir-fried Mixed Vegetables", price: 290 },
      { code: 706, name: "Deep Fried Sea Bass with Sweet and Sour Sauce", price: 480 },
      { code: 707, name: "Three Flavored Seabass", price: 460 },
      { code: 708, name: "Seabass with Fish Sauce", price: 440 },
      { code: 709, name: "Seabass with Tamarind Sauce", price: 450 },
    ],
  },
  {
    id: "thai-soups",
    label: "Thai Soups",
    emoji: "🍜",
    items: [
      { code: 301, name: "Tom Yam Kung (Spicy Shrimp Soup)", price: 290 },
      { code: 302, name: "Pork Spicy Soup", price: 250 },
      { code: 303, name: "Tom Kha Kai (Coconut Chicken Soup)", price: 250 },
      { code: 304, name: "Steam Seafood Eggs", price: 290 },
    ],
  },
  {
    id: "thai-dishes",
    label: "Thai Dishes",
    emoji: "🌶️",
    items: [
      { code: 305, name: "Cashew Chicken", price: 250 },
      { code: 306, name: "Deep Fried Shrimp", price: 220 },
      { code: 307, name: "Soup (Clear)", price: 250 },
      { code: 308, name: "Sour Curry with Shrimp & Cha-Om Egg", price: 290 },
      { code: 309, name: "Chicken Green Curry", price: 250 },
      { code: 327, name: "Stir-fried Squid Black Ink", price: 180 },
      { code: 332, name: "Steamed Squid with Lemon", price: 290 },
      { code: 333, name: "Steamed Seabass with Lemon", price: 450 },
    ],
  },
  {
    id: "somtam",
    label: "Somtam (Papaya Salad)",
    emoji: "🥭",
    items: [
      { code: 968, name: "Somtam Thai", price: 80 },
      { code: 969, name: "Somtam Crab", price: 80 },
      { code: 970, name: "Somtam Seafood", price: 250 },
      { code: 971, name: "Blue Crab Somtam", price: 200 },
      { code: 972, name: "Somtam Shell", price: 180 },
    ],
  },
  {
    id: "yam",
    label: "Yam (Spicy Salads)",
    emoji: "🥙",
    items: [
      { code: 974, name: "Yam Shrimp Lemongrass", price: 240 },
      { code: 975, name: "Yam Seafood", price: 250 },
      { code: 976, name: "Yam Blue Crab", price: 250 },
      { code: 977, name: "Yam Blue Crab Mango", price: 250 },
      { code: 978, name: "Yam Wounds Seafood (Glass Noodle Salad with Minced Pork)", price: 100 },
      { code: 979, name: "Yam Salmon", price: 290 },
      { code: 980, name: "Yam Tuna", price: 290 },
    ],
  },
  {
    id: "fried-vegetable",
    label: "Fried & Vegetable Dishes",
    emoji: "🍗",
    items: [
      { code: 981, name: "Fried Chicken Wings", price: 180 },
      { code: 982, name: "Fried Sun-dried Fish", price: 180 },
      { code: 983, name: "Fried Chicken Tendons", price: 180 },
      { code: 984, name: "Fried Duckbill", price: 180 },
      { code: 985, name: "Stir-fried Morning Glory with Chili Paste", price: 120 },
    ],
  },
  {
    id: "stir-fried",
    label: "Stir-Fried Dishes",
    emoji: "🍤",
    items: [
      { code: 334, name: "Shrimps in Fish Sauce", price: 190 },
      { code: 335, name: "Thai Noodle Seafood", price: 290 },
      { code: 336, name: "Shrimps in Tamarind Sauce", price: 180 },
      { code: 337, name: "Stir-fried Squid, Salted Egg", price: 220 },
      { code: 338, name: "Stir-fried Crabs (Deep Fried Soft Shell Crab)", price: 150 },
      { code: 339, name: "Pad Thai Shrimps", price: 120 },
    ],
  },
  {
    id: "beef-pork-salads",
    label: "Beef & Pork Salads",
    emoji: "🥗",
    items: [
      { code: 986, name: "Beef Salad", price: 190 },
      { code: 987, name: "Spicy Salmon Salad", price: 190 },
      { code: 988, name: "Dry Shrimps Salad", price: 120 },
      { code: 989, name: "Spicy Tuna Salad", price: 190 },
    ],
  },
  {
    id: "pork-dishes",
    label: "Pork Dishes",
    emoji: "🍖",
    items: [
      { code: 340, name: "Pork Larb", price: 150 },
      { code: 390, name: "Larb Moo Tod (Fried Pork Larb)", price: 190 },
      { code: 341, name: "Oysters with Condiments", price: 150 },
      { code: 342, name: "Yam Oyster (Spicy Oyster Salad)", price: 250 },
      { code: 343, name: "Fried Sun-dried Pork", price: 180 },
      { code: 344, name: "Fried Cashewnuts", price: 180 },
      { code: 345, name: "Fried Pork Bones", price: 180 },
      { code: 346, name: "Isaan Grilled Pork", price: 150 },
      { code: 347, name: "Lemon Pork", price: 170 },
    ],
  },
  {
    id: "basil-dishes",
    label: "Basil Dishes",
    emoji: "🌿",
    items: [
      { code: 348, name: "Chicken Basil Rice", price: 70 },
      { code: 349, name: "Beef Basil Rice", price: 90 },
      { code: 350, name: "Shrimps Basil Rice", price: 100 },
      { code: 351, name: "Squids Basil Rice", price: 100 },
      { code: 352, name: "Fried Egg", price: 20 },
      { code: 353, name: "Minced Pork with Basil", price: 250 },
      { code: 354, name: "Seafood Basil", price: 290 },
      { code: 372, name: "Seafood Basil Rice with Fried Egg", price: 150 },
      { code: 373, name: "Minced Pork with Basil Rice with Fried Egg", price: 80 },
    ],
  },
  {
    id: "fried-rice",
    label: "Fried Rice",
    emoji: "🍚",
    items: [
      { code: 374, name: "Fried Rice Pork", price: 70 },
      { code: 375, name: "Fried Rice Shrimp", price: 80 },
      { code: 376, name: "Fried Rice Crab", price: 120 },
      { code: 377, name: "Steam Rice", price: 30 },
    ],
  },
  {
    id: "specials",
    label: "Special Recommendations",
    emoji: "⭐",
    items: [
      { code: 917, name: "Beef Tongue Stew", price: 380 },
    ],
  },
  {
    id: "beverages-extras",
    label: "Beverages & Extras",
    emoji: "🥂",
    items: [
      { name: "Sticky Rice", price: 30 },
      { name: "Rice", price: 30 },
    ],
  },
];

export default MENU_CATEGORIES;
