CREATE TYPE "foot" AS ENUM (
  'Trái',
  'Phải'
);


CREATE TABLE "points" (
  "id" uuid PRIMARY KEY,
  "code" text,
  "point" int,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "typescores" (
  "id" uuid PRIMARY KEY,
  "code" text UNIQUE,
  "name" text,
  "point" int,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "rules" (
  "id" uuid PRIMARY KEY,
  "min_age" int,
  "max_age" int,
  "min_athletes" int,
  "max_athletes" int,
  "max_time_score" int,
  "max_foreign_athletes" int,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "positions" (
  "id" uuid PRIMARY KEY,
  "code" text UNIQUE,
  "name" text,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "athletes" (
  "id" uuid PRIMARY KEY,
  "avatar" text,
  "full_name" text,
  "position_code" text,
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
  "logo" text,
  "home_shirt" text,
  "away_shirt" text,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "coaches" (
  "id" uuid PRIMARY KEY,
  "avatar" text,
  "full_name" text,
  "birthday" date,
  "salary" int,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "managers" (
  "id" uuid PRIMARY KEY,
  "avatar" text,
  "account_id" uuid,
  "full_name" text,
  "birthday" date,
  "salary" int,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "accounts" (
  "id" uuid PRIMARY KEY,
  "username" text UNIQUE,
  "password" text,
  "role_code" text,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "roles" (
  "id" uuid PRIMARY KEY,
  "code" text UNIQUE,
  "name" text,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "actions" (
  "id" uuid PRIMARY KEY,
  "code" text UNIQUE,
  "name" text,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "roles_actions" (
  "role_code" text,
  "action_code" text,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "matches" (
  "id" uuid PRIMARY KEY,
  "host_team" uuid,
  "guest_team" uuid,
  "time" timestamp,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "matches_athletes" (
  "match_id" uuid,
  "athlete_id" uuid,
  "position" text,
  "created_at" date,
  "updated_at" date,
  PRIMARY KEY ("match_id", "athlete_id")
);

CREATE TABLE "matches_scores" (
  "id" uuid PRIMARY KEY,
  "match_id" uuid,
  "athlete_id" uuid,
  "time" float,
  "type_score" text,
  "created_at" date,
  "updated_at" date
);



CREATE TABLE "stadiums" (
  "id" uuid PRIMARY KEY,
  "name" text,
  "host_team" uuid UNIQUE,
  "created_at" date,
  "updated_at" date
);

CREATE TABLE "pictures" (
  "id" uuid PRIMARY KEY,
  "stadium_id" uuid,
  "picture" text,
  "created_at" date,
  "updated_at" date
);

ALTER TABLE "teams" ADD FOREIGN KEY ("manager_id") REFERENCES "managers" ("id");

ALTER TABLE "accounts" ADD FOREIGN KEY ("role_code") REFERENCES "roles" ("code");

ALTER TABLE "roles_actions" ADD FOREIGN KEY ("role_code") REFERENCES "roles" ("code");

ALTER TABLE "roles_actions" ADD FOREIGN KEY ("action_code") REFERENCES "actions" ("code");

ALTER TABLE "athletes" ADD FOREIGN KEY ("position_code") REFERENCES "positions" ("code");

ALTER TABLE "matches" ADD FOREIGN KEY ("host_team") REFERENCES "teams" ("id");

ALTER TABLE "matches" ADD FOREIGN KEY ("guest_team") REFERENCES "teams" ("id");

ALTER TABLE "matches_scores" ADD FOREIGN KEY ("type_score") REFERENCES "typescores" ("code");

ALTER TABLE "athletes" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "matches_athletes" ADD FOREIGN KEY ("athlete_id") REFERENCES "athletes" ("id");

ALTER TABLE "matches_athletes" ADD FOREIGN KEY ("match_id") REFERENCES "matches" ("id");


ALTER TABLE "teams" ADD FOREIGN KEY ("coach_id") REFERENCES "coaches" ("id");

ALTER TABLE "pictures" ADD FOREIGN KEY ("stadium_id") REFERENCES "stadiums" ("id");

ALTER TABLE "matches" ADD FOREIGN KEY ("host_team") REFERENCES "stadiums" ("host_team");

ALTER TABLE "matches_scores" ADD FOREIGN KEY ("match_id") REFERENCES "matches" ("id");

ALTER TABLE "matches_scores" ADD FOREIGN KEY ("athlete_id", "match_id") REFERENCES "matches_athletes" ("athlete_id", "match_id");

ALTER TABLE "managers" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id");

ALTER TABLE "stadiums" ADD FOREIGN KEY ("host_team") REFERENCES "teams" ("id");