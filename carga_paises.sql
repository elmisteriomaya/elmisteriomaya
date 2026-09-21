/* ========================================================
   EL MISTERIO MAYA
   CARGA INICIAL - TABLA PAISES
   ========================================================

   Ejecutar DESPUÉS de actualizacion_registro.sql
   (la tabla Paises ya debe existir).

   Cuando conectemos el API, el <select> de país en
   registro.html dejará de tener las opciones escritas
   a mano en el HTML, y en su lugar se llenará pidiendo
   estos registros al backend (GET /api/paises).
   ======================================================== */

INSERT INTO Paises (NombrePais) VALUES
    ('Afganistán'), ('Albania'), ('Alemania'), ('Andorra'), ('Angola'),
    ('Antigua y Barbuda'), ('Arabia Saudita'), ('Argelia'), ('Argentina'), ('Armenia'),
    ('Australia'), ('Austria'), ('Azerbaiyán'), ('Bahamas'), ('Baréin'),
    ('Bangladés'), ('Barbados'), ('Bélgica'), ('Belice'), ('Benín'),
    ('Bielorrusia'), ('Bolivia'), ('Bosnia y Herzegovina'), ('Botsuana'), ('Brasil'),
    ('Brunéi'), ('Bulgaria'), ('Burkina Faso'), ('Burundi'), ('Bután'),
    ('Cabo Verde'), ('Camboya'), ('Camerún'), ('Canadá'), ('Catar'),
    ('Chad'), ('Chile'), ('China'), ('Chipre'), ('Colombia'),
    ('Comoras'), ('Corea del Norte'), ('Corea del Sur'), ('Costa de Marfil'), ('Costa Rica'),
    ('Croacia'), ('Cuba'), ('Dinamarca'), ('Dominica'), ('Ecuador'),
    ('Egipto'), ('El Salvador'), ('Emiratos Árabes Unidos'), ('Eritrea'), ('Eslovaquia'),
    ('Eslovenia'), ('España'), ('Estados Unidos'), ('Estonia'), ('Esuatini'),
    ('Etiopía'), ('Fiyi'), ('Filipinas'), ('Finlandia'), ('Francia'),
    ('Gabón'), ('Gambia'), ('Georgia'), ('Ghana'), ('Granada'),
    ('Grecia'), ('Guatemala'), ('Guyana'), ('Guinea'), ('Guinea-Bisáu'),
    ('Guinea Ecuatorial'), ('Haití'), ('Honduras'), ('Hungría'), ('India'),
    ('Indonesia'), ('Irak'), ('Irán'), ('Irlanda'), ('Islandia'),
    ('Islas Marshall'), ('Islas Salomón'), ('Israel'), ('Italia'), ('Jamaica'),
    ('Japón'), ('Jordania'), ('Kazajistán'), ('Kenia'), ('Kirguistán'),
    ('Kiribati'), ('Kosovo'), ('Kuwait'), ('Laos'), ('Lesoto'),
    ('Letonia'), ('Líbano'), ('Liberia'), ('Libia'), ('Liechtenstein'),
    ('Lituania'), ('Luxemburgo'), ('Macedonia del Norte'), ('Madagascar'), ('Malasia'),
    ('Malaui'), ('Maldivas'), ('Malí'), ('Malta'), ('Marruecos'),
    ('Mauricio'), ('Mauritania'), ('México'), ('Micronesia'), ('Moldavia'),
    ('Mónaco'), ('Mongolia'), ('Montenegro'), ('Mozambique'), ('Myanmar'),
    ('Namibia'), ('Nauru'), ('Nepal'), ('Nicaragua'), ('Níger'),
    ('Nigeria'), ('Noruega'), ('Nueva Zelanda'), ('Omán'), ('Países Bajos'),
    ('Pakistán'), ('Palaos'), ('Palestina'), ('Panamá'), ('Papúa Nueva Guinea'),
    ('Paraguay'), ('Perú'), ('Polonia'), ('Portugal'), ('Reino Unido'),
    ('República Centroafricana'), ('República Checa'), ('República del Congo'), ('República Democrática del Congo'), ('República Dominicana'),
    ('Ruanda'), ('Rumania'), ('Rusia'), ('Samoa'), ('San Cristóbal y Nieves'),
    ('San Marino'), ('San Vicente y las Granadinas'), ('Santa Lucía'), ('Santo Tomé y Príncipe'), ('Senegal'),
    ('Serbia'), ('Seychelles'), ('Sierra Leona'), ('Singapur'), ('Siria'),
    ('Somalia'), ('Sri Lanka'), ('Sudáfrica'), ('Sudán'), ('Sudán del Sur'),
    ('Suecia'), ('Suiza'), ('Surinam'), ('Tailandia'), ('Tanzania'),
    ('Tayikistán'), ('Timor Oriental'), ('Togo'), ('Tonga'), ('Trinidad y Tobago'),
    ('Túnez'), ('Turkmenistán'), ('Turquía'), ('Tuvalu'), ('Ucrania'),
    ('Uganda'), ('Uruguay'), ('Uzbekistán'), ('Vanuatu'), ('Vaticano'),
    ('Venezuela'), ('Vietnam'), ('Yemen'), ('Yibuti'), ('Zambia'),
    ('Zimbabue');


/* ========================================================
   VERIFICACIÓN RÁPIDA
   ======================================================== */

SELECT COUNT(*) AS TotalPaises FROM Paises;
