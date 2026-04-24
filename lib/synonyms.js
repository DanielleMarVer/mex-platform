// Comprehensive synonym map for fashion/textile searches
// Maps what users type -> keywords to search for in factory data

export const SYNONYMS = {
  // Garments
  'dress': ['womenswear', 'apparel', 'cut and sew', 'clothing', 'garment', 'fashion'],
  'dresses': ['womenswear', 'apparel', 'cut and sew', 'clothing', 'garment', 'fashion'],
  't-shirt': ['knitwear', 'jersey', 'cut and sew', 'tshirt', 'tops', 'apparel'],
  'tshirt': ['knitwear', 'jersey', 'cut and sew', 'tops', 'apparel'],
  't shirt': ['knitwear', 'jersey', 'cut and sew', 'tops', 'apparel'],
  'shirt': ['shirting', 'woven', 'apparel', 'cut and sew', 'tops'],
  'blouse': ['womenswear', 'shirting', 'woven', 'apparel'],
  'trousers': ['bottoms', 'apparel', 'cut and sew', 'woven', 'clothing'],
  'pants': ['bottoms', 'apparel', 'cut and sew', 'woven', 'clothing'],
  'jeans': ['denim', 'bottoms', 'apparel', 'cut and sew'],
  'denim': ['denim', 'bottoms', 'jeans', 'apparel'],
  'jacket': ['outerwear', 'apparel', 'cut and sew', 'coats'],
  'coat': ['outerwear', 'apparel', 'coats', 'cut and sew'],
  'outerwear': ['outerwear', 'jackets', 'coats', 'apparel'],
  'knitwear': ['knitwear', 'knit', 'jersey', 'sweater', 'pullover'],
  'sweater': ['knitwear', 'knit', 'jersey', 'pullover'],
  'jumper': ['knitwear', 'knit', 'jersey', 'pullover'],
  'hoodie': ['knitwear', 'jersey', 'cut and sew', 'sportswear'],
  'sweatshirt': ['knitwear', 'jersey', 'cut and sew', 'sportswear'],
  'skirt': ['womenswear', 'apparel', 'cut and sew', 'bottoms'],
  'swimwear': ['swimwear', 'swim', 'beachwear', 'lycra', 'stretch'],
  'bikini': ['swimwear', 'swim', 'beachwear', 'lycra'],
  'lingerie': ['lingerie', 'underwear', 'intimate', 'lace'],
  'underwear': ['lingerie', 'underwear', 'intimate', 'jersey'],
  'activewear': ['activewear', 'sportswear', 'performance', 'stretch', 'athletic'],
  'sportswear': ['sportswear', 'activewear', 'performance', 'athletic'],
  'athleisure': ['activewear', 'sportswear', 'performance', 'stretch'],
  'leggings': ['activewear', 'stretch', 'jersey', 'sportswear'],
  'suit': ['tailoring', 'suiting', 'woven', 'formal'],
  'tailoring': ['tailoring', 'suiting', 'woven', 'formal'],
  'uniform': ['workwear', 'uniform', 'corporate', 'hospitality'],
  'workwear': ['workwear', 'uniform', 'corporate'],

  // Fabrics
  'fabric': ['fabric', 'textile', 'material', 'cloth'],
  'cotton': ['cotton', 'natural fibres', 'woven', 'jersey'],
  'wool': ['wool', 'knitwear', 'suiting', 'natural fibres'],
  'silk': ['silk', 'luxury', 'woven', 'natural fibres'],
  'linen': ['linen', 'natural fibres', 'woven', 'summer'],
  'polyester': ['polyester', 'synthetic', 'performance'],
  'nylon': ['nylon', 'synthetic', 'performance', 'swimwear'],
  'lycra': ['lycra', 'stretch', 'swimwear', 'activewear', 'elastane', 'spandex'],
  'elastane': ['elastane', 'stretch', 'lycra', 'spandex'],
  'spandex': ['spandex', 'stretch', 'lycra', 'elastane'],
  'velvet': ['velvet', 'luxury', 'woven'],
  'lace': ['lace', 'lingerie', 'luxury'],
  'denim fabric': ['denim', 'woven'],
  'jersey': ['jersey', 'knitwear', 'stretch'],
  'tweed': ['wool', 'suiting', 'woven', 'luxury'],
  'cashmere': ['cashmere', 'wool', 'luxury', 'knitwear'],

  // Components & accessories
  'button': ['buttons', 'trims', 'accessories', 'hardware'],
  'buttons': ['buttons', 'trims', 'accessories', 'hardware'],
  'zipper': ['zippers', 'fasteners', 'trims', 'hardware'],
  'zip': ['zippers', 'fasteners', 'trims', 'ykk'],
  'thread': ['thread', 'sewing thread', 'embroidery'],
  'elastic': ['elastic', 'trims', 'stretch'],
  'label': ['labels', 'trims', 'branding'],
  'patch': ['patches', 'embroidery', 'trims'],
  'embroidery': ['embroidery', 'thread', 'trims'],
  'trim': ['trims', 'accessories', 'hardware'],
  'trims': ['trims', 'accessories', 'hardware'],
  'hardware': ['hardware', 'fasteners', 'trims'],
  'buckle': ['hardware', 'fasteners', 'trims'],
  'snap': ['fasteners', 'press fasteners', 'hardware'],
  'rivet': ['rivets', 'hardware', 'denim'],
  'eyelet': ['eyelets', 'hardware', 'trims'],

  // Bags & leather
  'bag': ['bags', 'leather goods', 'handbags', 'accessories'],
  'handbag': ['handbags', 'leather goods', 'bags', 'luxury'],
  'leather': ['leather', 'leather goods', 'bags', 'accessories'],
  'leather goods': ['leather goods', 'bags', 'handbags'],

  // Sustainability
  'sustainable': ['sustainable', 'organic', 'gots', 'recycled', 'eco', 'oeko-tex'],
  'organic': ['organic', 'gots', 'natural fibres', 'sustainable'],
  'recycled': ['recycled', 'grs', 'sustainable', 'eco'],
  'eco': ['eco', 'sustainable', 'organic', 'recycled'],
  'ethical': ['ethical', 'sustainable', 'fair trade', 'gots'],

  // Countries (common variations)
  'portugal': ['portugal', 'portuguese'],
  'italy': ['italy', 'italian'],
  'uk': ['united kingdom', 'uk', 'british'],
  'germany': ['germany', 'german'],
  'france': ['france', 'french'],

  // Certifications
  'gots': ['gots', 'organic', 'sustainable'],
  'oeko-tex': ['oeko-tex', 'certified', 'sustainable'],
  'iso': ['iso 9001', 'certified', 'quality'],
  'wrap': ['wrap', 'certified', 'ethical'],

  // General
  'manufacturer': ['manufacturer', 'cut and sew', 'production'],
  'supplier': ['supplier', 'fabric', 'components', 'materials'],
  'luxury': ['luxury', 'premium', 'high-end'],
  'private label': ['private label', 'manufacturer', 'cut and sew'],
  'small batch': ['small moq', 'small minimum', 'small order'],
  'large order': ['large moq', 'mass production', 'large scale'],
  'fast fashion': ['apparel', 'cut and sew', 'manufacturer'],
  'production': ['manufacturer', 'cut and sew', 'apparel'],
}

export function expandQuery(query) {
  const q = query.toLowerCase().trim()
  const expanded = new Set([q])

  // Direct match
  if (SYNONYMS[q]) {
    SYNONYMS[q].forEach(s => expanded.add(s.toLowerCase()))
  }

  // Partial match — check if query contains a synonym key
  Object.keys(SYNONYMS).forEach(key => {
    if (q.includes(key) || key.includes(q)) {
      SYNONYMS[key].forEach(s => expanded.add(s.toLowerCase()))
    }
  })

  return Array.from(expanded)
}
