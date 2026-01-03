drop database if exists orchids;

create database orchids;

use orchids;

DROP TABLE IF EXISTS orchid;
DROP TABLE IF EXISTS genus;
DROP TABLE IF EXISTS types;
DROP TABLE IF EXISTS attribute;

CREATE TABLE genus (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE types (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE attribute (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    number BIGINT NOT NULL,
    group_name ENUM('luminosity', 'temperature', 'humidity', 'size') NOT NULL,
    description VARCHAR(255) NOT NULL
);



CREATE TABLE orchid (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    -- não vou precisar do orchid_Type so do genus mas ainda tem o tratamento de erro.
    orchid_type ENUM(
        'Bulbophyllum',
        'Cattleya',
        'Cymbidium',
        'Paphiopedilum',
        'Phalaenopsis'
    ) NOT NULL,
    description VARCHAR(255) NOT NULL,

    genus BIGINT NOT NULL,
    type BIGINT NOT NULL,

    luminosity BIGINT NOT NULL,
    temperature BIGINT NOT NULL,
    humidity BIGINT NOT NULL,
    size BIGINT NOT NULL
);


ALTER TABLE orchid
ADD CONSTRAINT fk_orchid_genus
FOREIGN KEY (genus) REFERENCES genus(id);

ALTER TABLE orchid
ADD CONSTRAINT fk_orchid_type
FOREIGN KEY (type) REFERENCES types(id);

ALTER TABLE orchid
ADD CONSTRAINT fk_orchid_luminosity
FOREIGN KEY (luminosity) REFERENCES attribute(id);

ALTER TABLE orchid
ADD CONSTRAINT fk_orchid_temperature
FOREIGN KEY (temperature) REFERENCES attribute(id);

ALTER TABLE orchid
ADD CONSTRAINT fk_orchid_humidity
FOREIGN KEY (humidity) REFERENCES attribute(id);

ALTER TABLE orchid
ADD CONSTRAINT fk_orchid_size
FOREIGN KEY (size) REFERENCES attribute(id);

