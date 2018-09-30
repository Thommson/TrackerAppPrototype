Use Group9

drop table diet
drop table sleep
drop table trackables
drop table weight
drop table workout
drop table dataEntry
drop table profile

create table profile(
profileID int IDENTITY(1,1),
profileName nvarchar(30),
profilePassword nvarchar(30),
birthDate date,
height int,
weight int,
gender nvarchar(1),
primary key (profileID)
);

create table trackables(
FK_profileID int,
sleepHours decimal(5,2),
workoutDays int,
targetWeight decimal(5,2),
trackDiet bit,

foreign key (FK_profileID) references profile(profileID)
);

create table dataEntry(
dataEntryID int IDENTITY(1,1),
FK_profileID int,
entryYear int,
entryMonth int,
entryDay int,

primary key (dataEntryID),
foreign key (FK_profileID) references profile(profileID)
);

create table weight(
FK_dataEntryID int,
currentWeight int,
foreign key (FK_dataEntryID) references dataEntry(dataEntryID)
);

create table workout(
FK_dataEntryID int,
hadInjury bit,
hadWorkout bit,
foreign key (FK_dataEntryID) references dataEntry(dataEntryID)
);

create table sleep(
FK_dataEntryID int,
sleepHours decimal(5,2),
sleepQuality int,
foreign key (FK_dataEntryID) references dataEntry(dataEntryID)
);

create table diet(
FK_dataEntryID int,
waterGlasses int,
hadAlcohol bit,
hadSoda bit,
hadCaffeine bit,
hadCigarettes bit,
hadJunkFood bit,

foreign key (FK_dataEntryID) references dataEntry(dataEntryID)
);

insert into profile (profileName, profilePassword, birthDate, height, weight, gender)
values
('Amanda', 'YasYumYum', '1990-06-09', 164, 59, 'f'),
('Bryson', 'NotPassword', '1995-02-19', 174, 70, 'm'),
('Anjelica', 'Password', '1994-02-19', 170, 65, 'f'),
('Synthia', '12345678', '1984-03-19', 160, 56, 'f'),
('Noel', 'fabreez', '1984-08-22', 185, 98, 'm');

insert into trackables (FK_profileID, sleepHours, workoutDays, targetWeight, trackDiet)
values
(1,0,0,0,0),
(2,0,0,0,0),
(3,0,0,0,0),
(4,0,0,0,0),
(5,8,20,85,1);
