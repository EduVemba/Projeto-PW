use orchids;

-- Mesmo sendo uma procedure funciona como uma view

DELIMITER $$

CREATE PROCEDURE filter_content(
		IN p_category_type ENUM(
        'genus',
        'type',
        'luminosity',
        'temperature',
        'humidity',
        'size'
    ),
    IN p_category_id BIGINT
)
BEGIN
IF p_category_type = 'genus' THEN
        SELECT * FROM orchid WHERE genus = p_category_id;

    ELSEIF p_category_type = 'type' THEN
        SELECT * FROM orchid WHERE type = p_category_id;

    ELSEIF p_category_type = 'luminosity' THEN
        SELECT * FROM orchid WHERE luminosity = p_category_id;

    ELSEIF p_category_type = 'temperature' THEN
        SELECT * FROM orchid WHERE temperature = p_category_id;

    ELSEIF p_category_type = 'humidity' THEN
        SELECT * FROM orchid WHERE humidity = p_category_id;

    ELSEIF p_category_type = 'size' THEN
        SELECT * FROM orchid WHERE size = p_category_id;
    END IF;
END $$

DELIMITER ;


DELIMITER $$ 

CREATE PROCEDURE findID(
	IN p_orchid_type VARCHAR(50),
    IN p_description VARCHAR(255),
    IN p_genus BIGINT,
    IN p_type BIGINT,
    IN p_luminosity BIGINT,
    IN p_temperature BIGINT,
    IN p_humidity BIGINT,
    IN p_size BIGINT
)
	BEGIN
		SELECT id from orchid 
		WHERE orchid_type = p_orchid_type
		AND description = p_description
		AND genus = p_genus
		AND type = p_type
		AND luminosity = p_luminosity
		AND temperature = p_temperature
		AND humidity = p_humidity
		AND size = p_size;
	END $$
DELIMITER ;  