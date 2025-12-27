use orchids;


INSERT INTO genus (id, description) VALUES
(1, 'Bulbophyllum'),
(2, 'Cattleya'),
(3, 'Cymbidium'),
(4, 'Paphiopedilum'),
(5, 'Phalaenopsis');

-- Popular tabela types
INSERT INTO types (id, description) VALUES
(1, 'Espécie'),
(2, 'Híbrido');

-- Popular tabela attribute - Luminosity
INSERT INTO attribute (id, group_name, description) VALUES
(1, 'luminosity', 'Baixa'),
(2, 'luminosity', 'Média-Baixa'),
(3, 'luminosity', 'Média-Alta'),
(4, 'luminosity', 'Alta');

-- Popular tabela attribute - Temperature
INSERT INTO attribute (id, group_name, description) VALUES
(5, 'temperature', 'Frio'),
(6, 'temperature', 'Intermédio'),
(7, 'temperature', 'Quente'),
(8, 'temperature', 'Muito Quente');

-- Popular tabela attribute - Humidity
INSERT INTO attribute (id, group_name, description) VALUES
(9, 'humidity', 'Baixa'),
(10, 'humidity', 'Média'),
(11, 'humidity', 'Alta'),
(12, 'humidity', 'Muito Alta');

-- Popular tabela attribute - Size
INSERT INTO attribute (id, group_name, description) VALUES
(13, 'size', 'Miniatura'),
(14, 'size', 'Pequena'),
(15, 'size', 'Média'),
(16, 'size', 'Grande');

-- Popular tabela orchid
INSERT INTO orchid (orchid_type, description, genus, type, luminosity, temperature, humidity, size) VALUES
-- Bulbophyllum
('Bulbophyllum', 'Bulbophyllum eberhardtii', 1, 1, 3, 8, 11, 16),
('Bulbophyllum', 'Bulbophyllum echinolabium', 1, 1, 3, 7, 12, 16),
('Bulbophyllum', 'Bulbophyllum frostii', 1, 1, 2, 7, 11, 13),
('Bulbophyllum', 'Bulbophyllum Louis Sander', 1, 2, 2, 6, 12, 14),
('Bulbophyllum', 'Bulbophyllum mastersianum', 1, 1, 1, 6, 11, 14),

-- Cattleya
('Cattleya', 'Cattleya Crystelle Smith', 2, 2, 3, 7, 10, 14),
('Cattleya', 'Cattleya Husky Boy', 2, 2, 4, 7, 10, 15),
('Cattleya', 'Cattleya labiata', 2, 1, 4, 7, 10, 15),
('Cattleya', 'Cattleya Ports of Paradise', 2, 2, 4, 7, 10, 16),
('Cattleya', 'Cattleya tigrina', 2, 1, 3, 7, 10, 16),

-- Cymbidium
('Cymbidium', 'Cymbidium Aiko Sama', 3, 2, 4, 6, 9, 16),
('Cymbidium', 'Cymbidium Gold Cadillac', 3, 2, 4, 6, 9, 16),
('Cymbidium', 'Cymbidium Peter Pan', 3, 2, 4, 6, 9, 16),
('Cymbidium', 'Cymbidium Red Beauty', 3, 2, 4, 6, 9, 16),
('Cymbidium', 'Cymbidium Vogel Magic', 3, 2, 4, 6, 9, 16),

-- Paphiopedilum
('Paphiopedilum', 'Paphiopedilum Americano', 4, 2, 3, 7, 10, 15),
('Paphiopedilum', 'Paphiopedilum leucochilum', 4, 1, 2, 6, 12, 14),
('Paphiopedilum', 'Paphiopedilum Maudiae Femma', 4, 2, 2, 6, 12, 15),
('Paphiopedilum', 'Paphiopedilum Montagnard', 4, 2, 2, 6, 12, 15),
('Paphiopedilum', 'Paphiopedilum spicerianum', 4, 1, 1, 6, 12, 14),

-- Phalaenopsis
('Phalaenopsis', 'Phalaenopsis Black Pearl', 5, 2, 2, 6, 11, 14),
('Phalaenopsis', 'Phalaenopsis Liodoro', 5, 2, 2, 6, 11, 15),
('Phalaenopsis', 'Phalaenopsis Manhattan Rose', 5, 2, 2, 6, 11, 16),
('Phalaenopsis', 'Phalaenopsis Spoted Harlequin', 5, 2, 2, 6, 11, 15),
('Phalaenopsis', 'Phalaenopsis Talin Gold', 5, 2, 2, 6, 11, 15);


select * from orchid