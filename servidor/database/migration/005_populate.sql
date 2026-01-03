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
INSERT INTO attribute (number, group_name, description) VALUES
(1, 'luminosity', 'Baixa'),
(2, 'luminosity', 'Média-Baixa'),
(3, 'luminosity', 'Média-Alta'),
(4, 'luminosity', 'Alta');

-- Popular tabela attribute - Temperature
INSERT INTO attribute (number, group_name, description) VALUES
(1, 'temperature', 'Frio'),
(2, 'temperature', 'Intermédio'),
(3, 'temperature', 'Quente'),
(4, 'temperature', 'Muito Quente');

-- Popular tabela attribute - Humidity
INSERT INTO attribute (number, group_name, description) VALUES
(1, 'humidity', 'Baixa'),
(2, 'humidity', 'Média'),
(3, 'humidity', 'Alta'),
(4, 'humidity', 'Muito Alta');

-- Popular tabela attribute - Size
INSERT INTO attribute (number, group_name, description) VALUES
(1, 'size', 'Miniatura'),
(2, 'size', 'Pequena'),
(3, 'size', 'Média'),
(4, 'size', 'Grande');

-- Popular tabela orchid
INSERT INTO orchid (orchid_type, description, genus, type, luminosity, temperature, humidity, size) VALUES
-- Bulbophyllum
('Bulbophyllum', 'Bulbophyllum eberhardtii', 1, 1, 3, 4, 3, 4),
('Bulbophyllum', 'Bulbophyllum echinolabium', 1, 1, 3, 3, 4, 4),
('Bulbophyllum', 'Bulbophyllum frostii', 1, 1, 2, 3, 3, 1),
('Bulbophyllum', 'Bulbophyllum Louis Sander', 1, 2, 2, 2, 4, 2),
('Bulbophyllum', 'Bulbophyllum mastersianum', 1, 1, 1, 2, 3, 2),

-- Cattleya
('Cattleya', 'Cattleya Crystelle Smith', 2, 2, 3, 3, 2, 2),
('Cattleya', 'Cattleya Husky Boy', 2, 2, 4, 3, 2, 3),
('Cattleya', 'Cattleya labiata', 2, 1, 4, 3, 2, 3),
('Cattleya', 'Cattleya Ports of Paradise', 2, 2, 4, 3, 2, 4),
('Cattleya', 'Cattleya tigrina', 2, 1, 3, 3, 2, 4),

-- Cymbidium
('Cymbidium', 'Cymbidium Aiko Sama', 3, 2, 4, 2, 1, 4),
('Cymbidium', 'Cymbidium Gold Cadillac', 3, 2, 4, 2, 1, 4),
('Cymbidium', 'Cymbidium Peter Pan', 3, 2, 4, 2, 1, 4),
('Cymbidium', 'Cymbidium Red Beauty', 3, 2, 4, 2, 1, 4),
('Cymbidium', 'Cymbidium Vogel Magic', 3, 2, 4, 2, 1, 4),

-- Paphiopedilum
('Paphiopedilum', 'Paphiopedilum Americano', 4, 2, 3, 3, 2, 3),
('Paphiopedilum', 'Paphiopedilum leucochilum', 4, 1, 2, 2, 4, 2),
('Paphiopedilum', 'Paphiopedilum Maudiae Femma', 4, 2, 2, 2, 4, 3),
('Paphiopedilum', 'Paphiopedilum Montagnard', 4, 2, 2, 2, 4, 3),
('Paphiopedilum', 'Paphiopedilum spicerianum', 4, 1, 1, 2, 4, 2),

-- Phalaenopsis
('Phalaenopsis', 'Phalaenopsis Black Pearl', 5, 2, 2, 2, 3, 2),
('Phalaenopsis', 'Phalaenopsis Liodoro', 5, 2, 2, 2, 3, 3),
('Phalaenopsis', 'Phalaenopsis Manhattan Rose', 5, 2, 2, 2, 3, 4),
('Phalaenopsis', 'Phalaenopsis Spoted Harlequin', 5, 2, 2, 2, 3, 3),
('Phalaenopsis', 'Phalaenopsis Talin Gold', 5, 2, 2, 2, 3, 3);


select * from orchid