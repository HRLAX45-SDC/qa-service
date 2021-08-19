drop database if exists qa;

create database qa;
\connect qa;

drop schema if exists schema1 cascade;
create schema schema1;

/*********************
Create questions table
**********************/

drop table if exists schema1.questions;
create table schema1.questions (
  id serial,
  product_id integer,
  body varchar(200),
  date_written bigint,
  asker_name varchar(100),
  asker_email varchar(150),
  reported integer,
  helpful integer
);

copy schema1.questions from '/Users/michelleguan/HackReactor/SrPhase/qa-service/Data/questions.csv' delimiter ',' csv header;

drop table if exists schema1.questions_1;
create table schema1.questions_1 as select
  product_id,
  body as question_body,
  to_char(to_timestamp(date_written / 1000), 'MM/DD/YYYY HH24:MI:SS') as question_date,
  asker_name,
  asker_email,
  reported,
  helpful as question_helpfulness
  from schema1.questions;

alter table schema1.questions_1
  add column question_id serial primary key;

create index idx_product_id on schema1.questions_1(product_id);

/********************
Create answers table
*********************/

drop table if exists schema1.answers;
create table schema1.answers(
  id serial,
  question_id integer,
  body varchar(200),
  date_written bigint,
  answerer_name varchar(100),
  answer_email varchar(100),
  reported integer,
  helpful integer
);

copy schema1.answers from '/Users/michelleguan/HackReactor/SrPhase/qa-service/Data/answers.csv' delimiter ',' csv header;

drop table if exists schema1.answers_1;
create table schema1.answers_1 as select
  question_id,
  body,
  to_char(to_timestamp(date_written / 1000), 'MM/DD/YYYY HH24:MI:SS') as date,
  answerer_name,
  answer_email,
  reported,
  helpful as helpfulness
  from schema1.answers;

alter table schema1.answers_1
  add column answer_id serial primary key;

/****************************
Create answer photos data set
*****************************/
drop table if exists schema1.answer_photos;
create table schema1.answer_photos(
  id serial,
  answer_id integer,
  url varchar(200)
);


copy schema1.answer_photos from '/Users/michelleguan/HackReactor/SrPhase/qa-service/Data/answers_photos.csv' delimiter ',' csv header;

alter table schema1.answer_photos
  add constraint answer_photos_pk primary key (id),
  add constraint answer_photos_fk foreign key (answer_id) references schema1.answers_1 (answer_id);

/****************************
Create aggregate photos table
*****************************/
drop table if exists schema1.answer_photos_agg;
create table schema1.answer_photos_agg as select
answer_id
,json_agg(json_build_object('id', id, 'url', url)) as photos
from schema1.answer_photos
group by answer_id;

/*****************************
Create answer photos combined
******************************/
drop table if exists schema1.answer_photos_combined;
create table schema1.answer_photos_combined as select
a.answer_id,
a.question_id,
a.body,
a.date,
a.answerer_name,
a.answer_email,
a.reported,
a.helpfulness,
coalesce(b.photos, '[]'::json) as photos
from schema1.answers_1 as a left join schema1.answer_photos_agg as b
on a.answer_id = b.answer_id;

alter table schema1.answer_photos_combined
  add column id serial primary key;

alter table schema1.answer_photos_combined
  drop column answer_id;

alter table schema1.answer_photos_combined
  rename column id to answer_id;

create index idx_answer_id on schema1.answer_photos_combined(answer_id);
create index idx_question_id on schema1.answer_photos_combined(question_id);
