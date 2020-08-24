CREATE DATABASE biblioteca;

CREATE TABLE libros(
    id SERIAL PRIMARY KEY,
    nombre varchar(40),
    autor varchar(40)
);

INSERT INTO libros(nombre, autor) VALUES
    ('Un mundo feliz', 'Aldous Huxley'),
    ('1984', 'George Orwell');