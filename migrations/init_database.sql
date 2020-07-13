CREATE TYPE foot AS ENUM ('Left', 'Right');
CREATE TABLE "athletes" (
  "id" uuid PRIMARY KEY,
  "full_name" text,
  "position" text,
  "height" float,
  "weight" float,
  "birthday" date,
  "nationality" text,
  "salary" int,
  "dominant_foot" foot,
  "team_id" uuid,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "teams" (
  "id" uuid PRIMARY KEY,
  "name" text,
  "coach_id" uuid,
  "manager_id" uuid,
  "home_shirt" text,
  "away_shirt" text,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "coaches" (
  "id" uuid PRIMARY KEY,
  "full_name" text,
  "birthday" date,
  "salary" int,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "matches" (
  "id" uuid PRIMARY KEY,
  "host_team" uuid,
  "guest_team" uuid,
  "time" timestamp,
  "stadium_id" uuid,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "matches_scores" (
  "match_id" uuid,
  "time" int,
  "athlete_id" uuid,
  "created_at" date,
  "updated_at" date
);

CREATE TYPE card_color AS ENUM ('Yellow', 'Red');
CREATE TABLE "matches_cards" (
  "match_id" uuid,
  "card_type" card_color,
  "athlete_id" uuid,
  "time" int,
  "created_at" date,
  "updated_at" date
);

CREATE TYPE gender AS ENUM ('Male', 'Female');
CREATE TABLE "arbitrations" (
  "id" uuid PRIMARY KEY,
  "full_name" text,
  "birthday" date,
  "nationality" text,
  "avatar" text,
  "gender" gender,
  "created_at" date,
  "updated_at" date
);


CREATE TYPE arbitration_position AS ENUM ('Core', 'Left Side', 'Right Side');
CREATE TABLE "matches_arbitrations" (
  "match_id" uuid,
  "arbitration_id" uuid,
  "position" arbitration_position
);



CREATE TYPE athlete_position AS ENUM ('ST', 'CM', 'CB', 'GK');
CREATE TABLE "matches_athletes" (
  "match_id" uuid,
  "athlete_id" uuid,
  "position" athlete_position
);

CREATE TABLE "stadiums" (
  "id" uuid PRIMARY KEY,
  "name" text,
  "host_team" uuid,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "stadiums_pictures" (
  "id" uuid PRIMARY KEY,
  "stadium_id" uuid,
  "picture" text,
  "created_at" date,
  "updated_at" date
);

ALTER TABLE "athletes" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "matches_athletes" ADD FOREIGN KEY ("athlete_id") REFERENCES "athletes" ("id");

ALTER TABLE "matches_athletes" ADD FOREIGN KEY ("match_id") REFERENCES "matches" ("id");

ALTER TABLE "teams" ADD FOREIGN KEY ("coach_id") REFERENCES "coaches" ("id");

ALTER TABLE "stadiums_pictures" ADD FOREIGN KEY ("stadium_id") REFERENCES "stadiums" ("id");

ALTER TABLE "matches" ADD FOREIGN KEY ("stadium_id") REFERENCES "stadiums" ("id");

ALTER TABLE "matches_cards" ADD FOREIGN KEY ("match_id") REFERENCES "matches" ("id");

ALTER TABLE "matches_cards" ADD FOREIGN KEY ("athlete_id") REFERENCES "athletes" ("id");

ALTER TABLE "matches_scores" ADD FOREIGN KEY ("match_id") REFERENCES "matches" ("id");

ALTER TABLE "matches_scores" ADD FOREIGN KEY ("athlete_id") REFERENCES "athletes" ("id");

ALTER TABLE "matches_arbitrations" ADD FOREIGN KEY ("match_id") REFERENCES "matches" ("id");

ALTER TABLE "matches_arbitrations" ADD FOREIGN KEY ("arbitration_id") REFERENCES "arbitrations" ("id");