export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: "new" | "hot" | "sale";
  description: string;
  ageRange: string;
  material: string;
  includes: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "DIY Wooden Robot Assembly Kit",
    category: "STEM Toys",
    price: 2850,
    rating: 5,
    reviews: 41,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=350&fit=crop&auto=format",
    badge: "hot",
    description:
      "Build your own wooden robot! This eco-friendly DIY assembly kit teaches kids engineering, fine motor skills, and creative thinking through hands-on building.",
    ageRange: "6+ Years",
    material: "Eco-friendly basswood, non-toxic paint",
    includes: [
      "Pre-cut wooden pieces",
      "Assembly instructions",
      "Non-toxic paint set",
      "Sandpaper",
    ],
  },
  {
    id: 2,
    name: "3D Wooden Puzzle City Builder Set",
    category: "DIY Puzzles",
    price: 3490,
    oldPrice: 4200,
    rating: 5,
    reviews: 58,
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=350&fit=crop&auto=format",
    badge: "sale",
    description:
      "Construct a miniature city from laser-cut wooden pieces. Develops spatial reasoning, planning skills, and patience in children aged 8 and above.",
    ageRange: "8+ Years",
    material: "Laser-cut birch plywood",
    includes: [
      "Laser-cut city pieces (120+)",
      "Step-by-step guide",
      "Glue",
      "Display stand",
    ],
  },
  {
    id: 4,
    name: "DIY Wooden Airplane Assembly Kit",
    category: "STEM Toys",
    price: 2200,
    rating: 4,
    reviews: 19,
    image:
      "https://images.unsplash.com/photo-1632516643720-287d0b2d4a9b?w=400&h=350&fit=crop&auto=format",
    description:
      "Assemble your own vintage wooden biplane. A wonderful STEM activity combining engineering concepts with artistic decoration.",
    ageRange: "6+ Years",
    material: "Premium basswood, non-toxic acrylic paints",
    includes: [
      "Pre-cut plane parts",
      "Paint set",
      "Brushes",
      "Assembly manual",
    ],
  },
  {
    id: 5,
    name: "Wooden Gears & Cogs STEM Set",
    category: "STEM Toys",
    price: 3150,
    oldPrice: 3800,
    rating: 5,
    reviews: 33,
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=350&fit=crop&auto=format",
    badge: "sale",
    description:
      "An interactive STEM set that teaches children about gears, mechanics, and cause-and-effect. Hours of exploratory learning and play.",
    ageRange: "5+ Years",
    material: "Durable hardwood, child-safe coating",
    includes: [
      "12 interlocking gears",
      "Base board",
      "Activity cards",
      "Storage bag",
    ],
  },
  {
    id: 6,
    name: "Rainbow Wooden Stacking Arches",
    category: "Wooden Toys",
    price: 2990,
    rating: 5,
    reviews: 47,
    image:
      "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=400&h=350&fit=crop&auto=format",
    badge: "hot",
    description:
      "Beautifully crafted rainbow arches in vibrant non-toxic colours. Encourages open-ended creative play, colour recognition, and stacking skills.",
    ageRange: "1+ Years",
    material: "Rubber wood, water-based paints",
    includes: ["10 rainbow arches", "Stacking base", "Activity booklet"],
  },
  {
    id: 7,
    name: "DIY Wooden Sailboat Kit",
    category: "DIY Puzzles",
    price: 1750,
    rating: 4,
    reviews: 15,
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=350&fit=crop&auto=format",
    badge: "new",
    description:
      "Build and decorate your own wooden sailboat. A calming, creative STEM project that floats in water! Great for summer activities.",
    ageRange: "5+ Years",
    material: "Waterproof-treated basswood",
    includes: [
      "Pre-cut hull pieces",
      "Sail materials",
      "Waterproof paint",
      "Assembly guide",
    ],
  },
];

export const categories = [
  {
    name: "STEM Toys",
    count: 45,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&auto=format",
    alt: "STEM wooden assembly toys",
  },
  {
    name: "DIY Puzzles",
    count: 60,
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=300&h=300&fit=crop&auto=format",
    alt: "3D wooden puzzles",
  },
  {
    name: "Wooden Toys",
    count: 85,
    image:
      "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=300&h=300&fit=crop&auto=format",
    alt: "Wooden educational toys",
  },
  {
    name: "Art & Craft",
    count: 50,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=300&fit=crop&auto=format",
    alt: "Art and craft supplies for kids",
  },
];
