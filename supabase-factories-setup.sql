-- Run this once in your Supabase SQL editor

-- 1. Create the factories table
CREATE TABLE IF NOT EXISTS factories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  country text NOT NULL,
  location text NOT NULL,
  flag text,
  category text NOT NULL, -- 'manufacturer' or 'supplier'
  tags text[],
  category_tags text[],
  founded text,
  employees text,
  moq text,
  website text,
  phone text,
  certifications text[],
  about text,
  is_active boolean DEFAULT true
);

-- 2. Enable Row Level Security (read-only for public)
ALTER TABLE factories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read factories" ON factories FOR SELECT USING (is_active = true);

-- 3. Seed all current factories
INSERT INTO factories (slug, name, country, location, flag, category, tags, category_tags, founded, employees, moq, website, certifications, about) VALUES

-- BELGIUM
('scabal', 'Scabal', 'Belgium', 'Brussels, Belgium', '🇧🇪', 'supplier',
 ARRAY['Suiting Fabrics','Wool','Luxury'],
 ARRAY['Suiting Fabrics','Wool Fabrics','Luxury Cloths'],
 '1938', 'Medium — 101–200 employees', '25 metres',
 'scabal.com', ARRAY['OEKO-TEX','ISO 9001'],
 'Founded in 1938 in Brussels, Scabal is one of the world''s most prestigious luxury suiting fabric houses. With over 5,000 fabrics and a mill in Huddersfield, UK, Scabal''s cloths are carried by master tailors in 75 countries.'),

-- CHINA
('sinosilk', 'Sinosilk', 'China', 'Hangzhou, Zhejiang, China', '🇨🇳', 'supplier',
 ARRAY['Silk Fabrics','Custom Printing','Scarves'],
 ARRAY['Silk Fabrics','Silk Scarves','Silk Sleepwear'],
 '2016', 'Small — up to 50 employees', 'From 1 piece; bulk from 45m',
 'sino-silk.com', ARRAY['OEKO-TEX Standard 100','SGS','Intertek'],
 'Hangzhou-based silk manufacturer producing 6A grade mulberry silk fabrics and finished silk products. Exports to 108 countries, 7,000+ clients. Custom printing, dyeing, scarves, sleepwear and accessories.'),

-- FRANCE
('crepinpetit', 'Crépin Petit', 'France', 'Bernaville, Somme, France', '🇫🇷', 'supplier',
 ARRAY['Buttons','Trims','Heritage'],
 ARRAY['Buttons','Trims','Accessories'],
 '1873', 'Small — up to 50 employees', '1,000 units',
 'crepinpetit.com', ARRAY['OEKO-TEX','Origine France Garantie','Entreprise du Patrimoine Vivant'],
 'Founded 1873. Last French button manufacturer. ~40M buttons/year. Supplies Lacoste, Petit Bateau, Armor Lux.'),

-- GERMANY
('amanngroup', 'Amann Group', 'Germany', 'Bönnigheim, Germany', '🇩🇪', 'supplier',
 ARRAY['Sewing Thread','Embroidery','Technical'],
 ARRAY['Sewing Thread','Embroidery Thread','Smart Yarns'],
 '1854', 'Large — 2,800 employees globally', 'Contact for MOQ',
 'amann.com', ARRAY['ISO 9001','ISO 14001','OEKO-TEX','GRS'],
 'Founded 1854. World-leading sewing and embroidery thread manufacturer. 2,800 employees, 100+ countries, ~1M km of thread per day.'),

('prymgroup', 'Prym Group', 'Germany', 'Stolberg, Germany', '🇩🇪', 'supplier',
 ARRAY['Fasteners','Buttons','Hardware'],
 ARRAY['Press Fasteners','Jeans Buttons','Rivets','Eyelets'],
 '1530', 'Large — 3,600 employees globally', '1,000 units',
 'prym-fashion.com', ARRAY['OEKO-TEX','ISO 9001'],
 'Founded 1530. Oldest industrial company in Germany. 15M press fasteners/day. Global supplier to apparel, denim and technical brands.'),

-- ITALY
('albinigroup', 'Albini Group', 'Italy', 'Albino, Bergamo, Italy', '🇮🇹', 'supplier',
 ARRAY['Shirting Fabrics','Cotton','Luxury'],
 ARRAY['Shirting Fabrics','Cotton Fabrics','Linen Fabrics'],
 '1876', 'Large — 1,000+ employees', '200 metres',
 'albini1876.com', ARRAY['GOTS','OEKO-TEX','Better Cotton'],
 'Founded 1876. World''s largest shirting fabric manufacturer. Fifth generation family business. Owns Thomas Mason and David & John Anderson.'),

('arbomoda', 'Arbo Moda', 'Italy', 'Lecco, Lombardy, Italy', '🇮🇹', 'manufacturer',
 ARRAY['Outerwear','Jackets','Down'],
 ARRAY['Outerwear','Jackets','Coats','Down Jackets'],
 '1970s', 'Medium — 51–200 employees', '200 units',
 'arbomoda.com', ARRAY['ISO 9001'],
 '50+ years contract manufacturing jackets, coats and down jackets near Milan. Full-service production for third-party brands.'),

('carvico', 'Carvico', 'Italy', 'Bergamo, Lombardy, Italy', '🇮🇹', 'supplier',
 ARRAY['Swimwear Fabrics','Performance','Sustainable'],
 ARRAY['Swimwear Fabrics','Performance Fabrics','Stretch Fabrics'],
 '1962', 'Medium — 201–300 employees', '300 metres',
 'carvico.com', ARRAY['OEKO-TEX','GRS','bluesign'],
 'Founded 1962. World market leader in stretch warp-knitted fabrics for swimwear and sportswear. ECONYL recycled nylon range.'),

('loipell', 'Loipell', 'Italy', 'Scandicci, Florence, Italy', '🇮🇹', 'manufacturer',
 ARRAY['Leather Bags','Handbags','Luxury'],
 ARRAY['Leather Bags','Handbags','Small Leather Goods'],
 '1993', 'Small — up to 50 employees', '50 units',
 'loipell.com', ARRAY['LWG','OEKO-TEX'],
 'Florentine leather goods manufacturer since 1993. Full in-house production for luxury brands. 40-person team in Scandicci.'),

('manteco', 'Manteco', 'Italy', 'Prato, Tuscany, Italy', '🇮🇹', 'supplier',
 ARRAY['Recycled Wool','Sustainable','Fabrics'],
 ARRAY['Recycled Wool Fabrics','Sustainable Fabrics','Woven Fabrics'],
 '1943', 'Medium — 51–100 employees', '100 metres',
 'manteco.com', ARRAY['GRS','OEKO-TEX','ISO 14001'],
 'Prato-based premium recycled wool fabrics. MWool® and ReviWool® brands. Trusted by COS, Woolrich, Samsøe Samsøe.'),

-- JAPAN
('ykk', 'YKK', 'Japan', 'Tokyo, Japan', '🇯🇵', 'supplier',
 ARRAY['Zippers','Fastenings','Luxury'],
 ARRAY['Zippers','Fastenings','Buttons','Snaps'],
 '1934', 'Very large — 36,000+ employees globally', '1,000 units',
 'ykkfastening.com', ARRAY['ISO 9001','ISO 14001','bluesign'],
 'Founded 1934. World''s largest zipper manufacturer. 40% global market share. 70 countries. Excella luxury line and Aquaguard waterproof range.'),

-- PORTUGAL
('albanopereira', 'Albano Pereira', 'Portugal', 'Vizela, Portugal', '🇵🇹', 'manufacturer',
 ARRAY['Footwear','Dress Shoes','Boots'],
 ARRAY['Footwear','Dress Shoes','Boots','Sandals'],
 '2005', 'Small — up to 50 employees', '200 pairs',
 'albanopereira.com', ARRAY['ISO 9001'],
 'Family-owned footwear manufacturer since 2005. Dress shoes, boots and sandals for international brands. Based in Vizela, Portugal''s footwear cluster.'),

('davion', 'Davion', 'Portugal', 'Oliveira do Hospital, Portugal', '🇵🇹', 'manufacturer',
 ARRAY['Suits','Tailoring','Luxury'],
 ARRAY['Suits','Tailoring','Made-to-Measure','Luxury Menswear'],
 '1953', 'Large — 301–500 employees', '50 units',
 'davion.pt', ARRAY['ISO 9001','OEKO-TEX'],
 'Founded 1953. 330 employees. Luxury tailoring exporting to 50+ countries. Full Canvas, Half Canvas, Soft Tailored. David Beckham, Pierce Brosnan, Robbie Williams.'),

('diastextil', 'Diastextil', 'Portugal', 'Barroselas, Portugal', '🇵🇹', 'manufacturer',
 ARRAY['Knitwear','Outerwear','Cut & Sew'],
 ARRAY['Knitwear','Outerwear','Cut & Sew'],
 NULL, 'Small — up to 50 employees', '100 units',
 'diastextil.pt', ARRAY['OEKO-TEX'],
 'Established knitwear and cut & sew manufacturer serving international fashion brands with flexible production runs.'),

('dielmar', 'Dielmar', 'Portugal', 'Alcains, Castelo Branco, Portugal', '🇵🇹', 'manufacturer',
 ARRAY['Tailoring','Suits','Outerwear'],
 ARRAY['Tailoring','Suits','Outerwear'],
 NULL, 'Large — 300+ employees', '50 units',
 'dielmar.pt', ARRAY['OEKO-TEX','ISO 9001'],
 'One of Portugal''s largest suit and tailoring manufacturers. Heritage brand producing formal and smart-casual outerwear.'),

('impetus', 'Impetus Portugal', 'Portugal', 'Apúlia, Barcelos, Portugal', '🇵🇹', 'manufacturer',
 ARRAY['Underwear','Swimwear','Seamless'],
 ARRAY['Underwear','Swimwear','Seamless','Lingerie'],
 NULL, 'Large — 300+ employees', '200 units',
 'impetus.pt', ARRAY['OEKO-TEX','GOTS'],
 'Leading Portuguese manufacturer of underwear, swimwear and seamless garments. Serving major European retail brands.'),

('luisbrito', 'Luís Brito Têxteis', 'Portugal', 'Neiva, Viana do Castelo, Portugal', '🇵🇹', 'manufacturer',
 ARRAY['Knitwear','Outerwear','Underwear'],
 ARRAY['Knitwear','Outerwear','Underwear'],
 NULL, 'Small — up to 50 employees', '50 units',
 'luisbritotexteis.pt', ARRAY['OEKO-TEX'],
 'Small family manufacturer producing knitwear, outerwear and underwear in northern Portugal.'),

('orfama', 'Orfama', 'Portugal', 'Braga, Portugal', '🇵🇹', 'manufacturer',
 ARRAY['Knitwear','Home Textiles','Outerwear'],
 ARRAY['Knitwear','Home Textiles','Outerwear'],
 NULL, 'Medium — 101–200 employees', '150 units',
 'orfama.pt', ARRAY['OEKO-TEX','GOTS'],
 'Braga-based knitwear and home textiles manufacturer. Flexible production for international fashion and home brands.'),

('petratex', 'Petratex', 'Portugal', 'Paços de Ferreira, Portugal', '🇵🇹', 'manufacturer',
 ARRAY['Sportswear','Activewear','Cut & Sew'],
 ARRAY['Sportswear','Activewear','Cut & Sew'],
 NULL, 'Medium — 101–200 employees', '100 units',
 'petratex.pt', ARRAY['OEKO-TEX','bluesign'],
 'Specialist sportswear and activewear manufacturer with strong sustainability credentials and fast turnaround times.'),

('prtexteis', 'P&R Têxteis', 'Portugal', 'Barcelos, Portugal', '🇵🇹', 'manufacturer',
 ARRAY['Sportswear','Cycling','Olympic supplier'],
 ARRAY['Sportswear','Cycling','Triathlon','Performance Wear'],
 '1982', 'Medium — 201–300 employees', '300 units',
 'prtexteis.com', ARRAY['SA8000','ISO 9001'],
 'Founded 1982. Olympic Games supplier since Atlanta 1996. Tour de France and Giro d''Italia. 200+ employees in Barcelos.'),

('riopele', 'Riopele Têxteis', 'Portugal', 'Pousada de Saramagos, Portugal', '🇵🇹', 'supplier',
 ARRAY['Woven Fabrics','Private Label','Outerwear'],
 ARRAY['Woven Fabrics','Private Label','Outerwear'],
 NULL, 'Large — 300+ employees', '500 metres',
 'riopele.com', ARRAY['OEKO-TEX','GOTS','ISO 9001'],
 'One of Portugal''s leading woven fabric mills. Produces technical and fashion fabrics for major European brands.'),

('somelos', 'Somelos Tecidos', 'Portugal', 'Ronfe, Guimarães, Portugal', '🇵🇹', 'supplier',
 ARRAY['Woven','Sportswear','Technical'],
 ARRAY['Woven Fabrics','Sportswear Fabrics','Technical Fabrics'],
 NULL, 'Large — 300+ employees', '300 metres',
 'somelos.com', ARRAY['OEKO-TEX','bluesign'],
 'Guimarães-based woven fabric producer specialising in sportswear and technical textiles.'),

('tac', 'TAC Creative Manufacturing', 'Portugal', 'Santo Tirso, Portugal', '🇵🇹', 'manufacturer',
 ARRAY['Cut & Sew','Knitwear','Outerwear'],
 ARRAY['Cut & Sew','Knitwear','Outerwear'],
 NULL, 'Medium — 101–200 employees', '100 units',
 'tac.pt', ARRAY['OEKO-TEX'],
 'Santo Tirso-based cut & sew manufacturer producing knitwear and outerwear for fashion brands.'),

('tintex', 'Tintex Textiles', 'Portugal', 'Vila Nova de Cerveira, Portugal', '🇵🇹', 'supplier',
 ARRAY['Dyeing','Finishing','Sustainable'],
 ARRAY['Dyeing','Finishing','Sustainable Fabrics'],
 NULL, 'Medium — 101–200 employees', '200 metres',
 'tintex.pt', ARRAY['GOTS','OEKO-TEX','bluesign'],
 'Sustainable dyeing and finishing specialist. Known for organic and responsible colour treatments.'),

-- SOUTH AFRICA
('dagama', 'Da Gama Textiles', 'South Africa', 'Zwelitsha, Eastern Cape, South Africa', '🇿🇦', 'supplier',
 ARRAY['Printed Fabrics','Cotton','Technical Textiles'],
 ARRAY['Printed Fabrics','Cotton Fabrics','Technical Textiles','Workwear Fabrics'],
 '1946', 'Large — 501–1,000 employees', 'Contact for MOQ',
 'dagama.co.za', ARRAY['OEKO-TEX','ISO 9001'],
 'Founded 1946. South Africa''s oldest and largest vertically integrated textile mill. Home of Three Cats Original Shweshwe. 15M machine metres/month. Printed, workwear, medical and technical fabrics.'),

('itlgroup', 'ITL Group', 'South Africa', 'Johannesburg, South Africa (Global HQ)', '🇿🇦', 'supplier',
 ARRAY['Woven Labels','RFID','Care Labels'],
 ARRAY['Woven Labels','Printed Labels','Care Labels','RFID Labels'],
 'Late 1980s', 'Large — 1,000+ employees globally', '500 units',
 'itl-group.com', ARRAY['GOTS','GRS','OEKO-TEX'],
 '35+ years. 20 global locations. Woven, printed, care labels, heat transfers and RFID. Supplies Marks & Spencer. LabelVantage™ cloud platform.'),

-- SWITZERLAND
('cilander', 'AG Cilander', 'Switzerland', 'Herisau, Appenzell, Switzerland', '🇨🇭', 'supplier',
 ARRAY['Dyeing','Finishing','Coating'],
 ARRAY['Fabric Finishing','Dyeing','Coating','Technical Textiles'],
 '1673', 'Medium — 201–300 employees', '300 metres',
 'cilander.com', ARRAY['OEKO-TEX 100','bluesign','ISO 14001'],
 'Founded 1673. World''s oldest textile finisher. First to receive OEKO-TEX 100 certification (1993). Full finishing: dyeing, coating, heat-setting, functional treatments.'),

('ririgroup', 'Riri Group', 'Switzerland', 'Mendrisio, Switzerland', '🇨🇭', 'supplier',
 ARRAY['Luxury Zippers','Buttons','Hardware'],
 ARRAY['Zippers','Buttons','Fastenings','Luxury Hardware'],
 '1936', 'Large — 1,100+ employees', '500 units',
 'riri.com', ARRAY['ISO 9001','OEKO-TEX'],
 'Founded 1936. Luxury zippers and hardware used by Hermès, Prada, Chanel. 8 plants in Switzerland and Italy.'),

-- TURKEY
('esenteks', 'Esenteks', 'Turkey', 'Esenyurt, Istanbul, Turkey', '🇹🇷', 'supplier',
 ARRAY['Linen Fabrics','Sustainable','Natural Fibres'],
 ARRAY['Linen Fabrics','Natural Fibres','Sustainable Textiles'],
 '1986', 'Medium — 101–200 employees', '500 metres',
 'esenteks.com', ARRAY['GOTS','OCS','European Flax'],
 'Founded 1986. Turkey''s only linen fabric specialist. One of five linen specialists in Europe. Exports to 41+ countries. GOTS, OCS and European Flax certified.'),

-- UNITED KINGDOM
('coatsgroup', 'Coats Group', 'United Kingdom', 'London, United Kingdom', '🇬🇧', 'supplier',
 ARRAY['Sewing Thread','Yarn','Industrial'],
 ARRAY['Sewing Thread','Embroidery Thread','Yarn','Industrial Thread'],
 '1750s', 'Very large — 17,000+ employees globally', 'Contact for MOQ',
 'coats.com', ARRAY['ISO 9001','ISO 14001','bluesign','OEKO-TEX'],
 'World''s largest industrial thread manufacturer. 50+ countries, 17,000 employees. Founded 1750s.'),

('simonjersey', 'Simon Jersey', 'United Kingdom', 'Accrington, Lancashire, United Kingdom', '🇬🇧', 'manufacturer',
 ARRAY['Uniforms','Workwear','Hospitality'],
 ARRAY['Corporate Uniforms','Healthcare Workwear','Hospitality Uniforms'],
 '1971', 'Medium — 201–300 employees', '10 units',
 'simonjersey.com', ARRAY['ISO 9001','OEKO-TEX'],
 'Founded 1971. UK''s leading uniform supplier for hospitality, healthcare, corporate and beauty sectors. Serves NHS and multinational hotel groups.');
