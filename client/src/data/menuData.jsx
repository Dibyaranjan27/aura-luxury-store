// menuData.js
export const dropdownItems = [
  {
    title: 'Women',
  },
  {
    title: 'Men',
  },
  {
    title: 'Unisex',
  },
];

export const dropdownWomenItems = [
  {
    title: 'Tops',
    links: [
      { label: 'Casual Tops', path: '/women/tops/casual' },
      { label: 'Formal Tops', path: '/women/tops/formal' },
      { label: 'Blouses', path: '/women/tops/blouses' },
      { label: 'Tank Tops', path: '/women/tops/tank-tops' },
      { label: 'New Collection', path: '/women/tops/new-collection' }, // Always last
    ],
  },
  {
    title: 'Dresses',
    links: [
      { label: 'Casual Dresses', path: '/women/dresses/casual' },
          { label: 'Evening Dresses', path: '/women/dresses/evening' },
          { label: 'Maxi Dresses', path: '/women/dresses/maxi' },
          { label: 'Cocktail Dresses', path: '/women/dresses/cocktail' },
          { label: 'New Collection', path: '/women/dresses/new-collection' }, // Always last
        ],
  },
  {
    title: 'Skirts',
    links: [
      { label: 'Mini Skirts', path: '/women/skirts/mini' },
          { label: 'Pencil Skirts', path: '/women/skirts/pencil' },
          { label: 'New Collection', path: '/women/skirts/new-collection' }, // Always last
        ],
  },
  {
    title: 'Outerwear',
    links: [
      { label: 'Jackets', path: '/women/outerwear/jackets' },
          { label: 'Coats', path: '/women/outerwear/coats' },
          { label: 'Blazers', path: '/women/outerwear/blazers' },
          { label: 'Cardigans', path: '/women/outerwear/cardigans' },
          { label: 'New Collection', path: '/women/outerwear/new-collection' }, // Always last
        ],
  },
  {
    title: 'Activewear',
    links: [
      { label: 'Leggings', path: '/women/activewear/leggings' },
          { label: 'Sports Bras', path: '/women/activewear/sports-bras' },
          { label: 'Tank Tops', path: '/women/activewear/tank-tops' },
          { label: 'Shorts', path: '/women/activewear/shorts' },
          { label: 'New Collection', path: '/women/activewear/new-collection' }, // Always last
        ],
  },
];

export const dropdownMenItems = [
  {
    title: 'Shirts',
    links: [
      { label: 'Casual Shirts', path: '/men/shirts/casual' },
          { label: 'Formal Shirts', path: '/men/shirts/formal' },
          { label: 'T-Shirts', path: '/men/shirts/t-shirts' },
          { label: 'New Collection', path: '/men/shirts/new-collection' }, // Always last
        ],
  },
  {
    title: 'Pants',
    links: [
      { label: 'Chinos', path: '/men/pants/chinos' },
          { label: 'Jeans', path: '/men/pants/jeans' },
          { label: 'Shorts', path: '/men/pants/shorts' },
          { label: 'New Collection', path: '/men/pants/new-collection' }, // Always last
        ],
  },
  {
    title: 'Outerwear',
    links: [
      { label: 'Jackets', path: '/men/outerwear/jackets' },
      { label: 'Coats', path: '/men/outerwear/coats' },
      { label: 'Hoodies', path: '/men/outerwear/hoodies' },
      { label: 'New Collection', path: '/men/outerwear/new-collection' }, // Always last
    ],
  },
];

export const dropdownUnisexItems = [

  {
    title: 'Clothing',
    links: [
      { label: 'T-Shirts', path: '/unisex/clothing/t-shirts' },
          { label: 'Hoodies', path: '/unisex/clothing/hoodies' },
          { label: 'Jackets', path: '/unisex/clothing/jackets' },
          { label: 'New Collection', path: '/unisex/clothing/new-collection' }, // Always last
        ],
  },
  {
    title: 'Accessories',
    links: [
      { label: 'Backpacks', path: '/unisex/accessories/backpacks' },
      { label: 'Caps', path: '/unisex/accessories/caps' },
      { label: 'Socks', path: '/unisex/accessories/socks' },
      { label: 'New Collection', path: '/unisex/accessories/new-collection' }, // Always last
    ],
  },
  {
    title: 'New Collection',
    links: [
      { label: 'Featured', path: '/new/featured' },
      { label: 'Trending', path: '/new/trending' },
      { label: 'Best Sellers', path: '/new/best-sellers' },
      { label: 'Just In', path: '/new/just-in' },
    ],
  },
  // Add more items if needed
];
