CREATE PROCEDURE [dbo].[GetServices]
AS
BEGIN
    SELECT * FROM [dbo].[Service];
END;
GO;


CREATE PROCEDURE [dbo].[AddService]
    @name varchar(45),
    @category varchar(20),
    @description varchar(64),
    @rackPrice float,
    @netPrice float,
    @tax int
AS
BEGIN
    DECLARE @msg VARCHAR(100);

    IF LEN(@name) = 0
    BEGIN
        SET @msg = 'El nombre del servicio no puede estar en blanco.';
		SELECT @msg AS Msg;
        RETURN;
    END;

    IF @rackPrice <= 0
    BEGIN
        SET @msg = 'El precio rack debe ser mayor que cero.';
        SELECT @msg AS Msg;
        RETURN;
    END;

    IF @netPrice <= 0
    BEGIN
        SET @msg = 'El precio neto debe ser mayor que cero.';
        SELECT @msg AS Msg;
        RETURN;
    END;

    IF @tax < 1 OR @tax > 100
    BEGIN
        SET @msg = 'El impuesto debe estar en el rango de 1 a 100.';
        SELECT @msg AS Msg;
        RETURN;
    END;

    INSERT INTO dbo.Service (name, category, description, rackPrice, netPrice, tax)
    VALUES (@name, @category, @description, @rackPrice, @netPrice, @tax);

    SET @msg = 'Servicio agregado correctamente.';
	SELECT @msg AS Msg;
    RETURN;
END;
GO;


CREATE PROCEDURE [dbo].[DeleteService]
    @serviceId int
AS
BEGIN
   
	DECLARE @msg VARCHAR(100);

    IF NOT EXISTS (SELECT 1 FROM dbo.Service WHERE id = @serviceId)
    BEGIN
        SET @msg = 'El servicio con el ID especificado no existe.';
		SELECT @msg AS Msg;
        RETURN;
    END;

    IF EXISTS (SELECT 1 FROM dbo.ServicesDetails WHERE service = @serviceId)
    BEGIN
		SET @msg = 'No se puede eliminar el servicio porque hay registros en ServicesDetails relacionados con él.';
        SELECT @msg AS Msg;
		RETURN;
    END;

    
    DELETE FROM Service WHERE id = @serviceId;
   
    SET @msg = 'Servicio eliminado correctamente.';
	SELECT @msg AS Msg;
END;
GO;


CREATE PROCEDURE [dbo].[UpdateService]
    @id int,
    @name varchar(45),
    @category varchar(20),
    @description varchar(64),
    @rackPrice float,
    @netPrice float,
    @tax int
AS
BEGIN
    
	DECLARE @msg VARCHAR(100);

    IF NOT EXISTS (SELECT 1 FROM dbo.Service WHERE id = @id)
    BEGIN
        SET @msg = 'El servicio con el ID especificado no existe.';
		SELECT @msg AS Msg;
        RETURN;
    END;

   
    IF LEN(@name) = 0
    BEGIN
        SET @msg = 'El nombre del servicio no puede estar en blanco.';
        SELECT @msg AS Msg;
        RETURN;
    END;

   
    IF @rackPrice <= 0
    BEGIN
         SET @msg = 'El precio de estante debe ser mayor que cero.';
		 SELECT @msg AS Msg;
		 RETURN; 
    END;

    IF @netPrice <= 0
    BEGIN
         SET @msg = 'El precio neto debe ser mayor que cero.';
		 SELECT @msg AS Msg;
         RETURN;
    END;

  
    IF @tax < 0 OR @tax > 100
    BEGIN
        SET @msg = 'El impuesto debe estar en el rango de 0 a 100.';
        SELECT @msg AS Msg;
        RETURN; 
    END;

  
    UPDATE Service
    SET
        name = @name,
        category  = @category,
        description = @description,
        rackPrice = @rackPrice,
        netPrice = @netPrice,
        tax = @tax
    WHERE
        id = @id;
    
    SET @msg =  'Servicio actualizado correctamente.';
	SELECT @msg AS Msg;
    RETURN;
END;
GO