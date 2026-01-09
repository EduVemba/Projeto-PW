use orchids;

DROP PROCEDURE IF EXISTS update_orchid;
DROP PROCEDURE IF EXISTS add_orchid;

DELIMITER $$
	CREATE PROCEDURE update_orchid(
       IN _id BIGINT,
	   IN _orchid_type VARCHAR(50),
       IN _description Varchar(50),
       IN _genus BIGINT,
		IN _type BIGINT,
		IN _luminosity BIGINT,
		IN _temperature BIGINT,
		IN _humidity BIGINT,
		IN _size BIGINT
    )
    BEGIN
    
      UPDATE orchid
      SET 
			orchid_type = _orchid_type,
            description = _description,
            genus = _genus,
            type = _type,
            luminosity = _luminosity,
            temperature = _temperature,
            humidity = _humidity,
            size = _size
            
      WHERE id = _id;
    
    END $$
DELIMITER ;


DELIMITER $$
	CREATE PROCEDURE add_orchid(
    IN _orchid_type VARCHAR(50),
    IN _description VARCHAR(255),
    IN _genus BIGINT,
    IN _type BIGINT,
    IN _luminosity BIGINT,
    IN _temperature BIGINT,
    IN _humidity BIGINT,
    IN _size BIGINT
    )
    BEGIN
    
		DECLARE enum_values TEXT DEFAULT
				'Bulbophyllum, Cattleya, Cymbidium, Paphiopedilum, Phalaenopsis';
		IF FIND_IN_SET(_orchid_type , enum_values) = 0 THEN
			SIGNAL SQLSTATE '45000' 
            -- O user pode mudar o valor da option de um select podendo meter valores indesejados
		    SET MESSAGE_TEXT = 'Espécie de orquídea inválida.';
		END IF;
        
    INSERT INTO orchid (
        orchid_type,
        description,
        genus,
        type,
        luminosity,
        temperature,
        humidity,
        size
    ) VALUES (
        _orchid_type,
        _description,
        _genus,
        _type,
        _luminosity,
        _temperature,
        _humidity,
        _size
    );
    
    SELECT LAST_INSERT_ID() AS insertedID;
    
    END $$ 
DELIMITER ;
