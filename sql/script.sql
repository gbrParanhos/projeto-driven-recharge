CREATE TABLE "carriers"(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) UNIQUE NOT NULL,
  "code" INTEGER NOT NULL
);

INSERT INTO carriers (name, code) VALUES ('Vivo', 15);
INSERT INTO carriers (name, code) VALUES ('Tim', 41);
INSERT INTO carriers (name, code) VALUES ('Oi', 31);
INSERT INTO carriers (name, code) VALUES ('Claro', 21);

CREATE TABLE "documents"(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "cpf" TEXT UNIQUE NOT NULL
);

CREATE TABLE "phones"(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "number" INTEGER UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "id_carrier" INTEGER REFERENCES "carriers"("id") NOT NULL,
  "id_document" INTEGER REFERENCES "documents"("id") NOT NULL
);

CREATE TABLE "recharges"(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "id_phone" INTEGER REFERENCES "phones"("id") NOT NULL
);