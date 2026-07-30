export const navBarData = [
  {
    id: 1,
    pathName: "Home",
    pathUrl: "/",
  },
  {
    id: 2,
    pathName: "Shop",
    pathUrl: "/shop",
  },
  {
    id: 3,
    pathName: "Men",
    pathUrl: "/men",
  },
  {
    id: 4,
    pathName: "Woman",
    pathUrl: "/woman",
  },
];



 export const benefitsData = [
    {
      id: 1,
      icon: "🎨",
      title: "Unique Designs",
      description: "Exclusive handcrafted styles you won't find anywhere else",
    },
    {
      id: 2,
      icon: "✋",
      title: "Handmade Quality",
      description: "Each piece crafted by hearth with premium materials",
    },
    {
      id: 3,
      icon: "🚚",
      title: "Fast Delivery",
      description: "Production takes 5-7 worling days and delivery is worldwide",
    },
    {
      id: 4,
      icon: "💰",
      title: "Best Prices",
      description: "Direct from maker with no middleman. Get the best value",
    },
  ];


  // Placeholder product data so we can build the frontend before the backend exists.
// This shape (id, name, price, category, image) is what every product-related
// component will expect. We'll expand this list in Step 4 and eventually replace
// it with real data from the backend.

export const sampleProducts = [
  {
    id: 'p1',
    name: 'Half-shoe',
    price: 35000,
    category: 'men',
    image: null, // will hold a real image path later
  },
  {
    id: 'p2',
    name: 'Ankara brikenstock',
    price: 20000,
    category: 'women',
    image: null,
  },
  {
    id: 'p3',
    name: 'couples',
    price: 25000,
    category: 'men',
    image: null,
  },
];